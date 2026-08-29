const https = require("https");
const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "1.1.1.1"
]);

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const resolveIPv4 = () => {
  return new Promise((resolve, reject) => {
    dns.resolve4(
      "api.themoviedb.org",
      (error, addresses) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(
          addresses.map((address) => ({
            address
          }))
        );
      }
    );
  });
};


const request = async (path) => {

  let lastError = null;

  for (let attempt = 1; attempt <= 3; attempt++) {

    try {

      const addresses = await resolveIPv4();

      console.log(
        "TMDB IPv4 addresses:",
        addresses.map((address) => address.address)
      );


      for (const addressInfo of addresses) {

        const ip = addressInfo.address;

        try {

          const result = await new Promise((resolve, reject) => {

            const options = {
              hostname: ip,
              port: 443,
              path,
              method: "GET",

              family: 4,

              // Important for HTTPS/SNI
              servername: "api.themoviedb.org",

              headers: {
                Host: "api.themoviedb.org",
                Authorization:
                  `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
                "User-Agent": "MovieHub/1.0",
                "Connection": "close"
              }
            };

            const req = https.request(options, (res) => {

              let data = "";

              res.on("data", (chunk) => {
                data += chunk;
              });

              res.on("end", () => {

                try {

                  const parsedData = JSON.parse(data);

                  if (res.statusCode >= 400) {
                    reject({
                      statusCode: res.statusCode,
                      data: parsedData
                    });

                    return;
                  }

                  resolve(parsedData);

                } catch (error) {
                  reject(error);
                }
              });
            });

            req.setTimeout(15000, () => {
              req.destroy(
                new Error(`Timeout connecting to ${ip}`)
              );
            });

            req.on("error", (error) => {
              reject(error);
            });

            req.end();
          });

          console.log("TMDB request succeeded using:", ip);

          return result;

        } catch (error) {

          lastError = error;

          console.log(
            `TMDB ${ip} failed:`,
            error.code || error.message
          );

        }
      }

    } catch (error) {

      lastError = error;

    }

    if (attempt < 3) {
      await sleep(1000 * attempt);
    }
  }
    
  throw lastError;
};


const searchMovies = async (query, page = 1) => {

  const params = new URLSearchParams({
    query,
    page: String(page),
    include_adult: "false"
  });

  return request(
    `/3/search/movie?${params.toString()}`
  );
};


const getMovieDetails = async (tmdbId) => {

  return request(
    `/3/movie/${tmdbId}?append_to_response=credits`
  );
};

const getPopularMovies = async (page = 1) => {
  return request(
    `/3/movie/popular?page=${page}`
  );
};

const getTopRatedMovies = async (page = 1) => {
  return request(
    `/3/movie/top_rated?page=${page}`
  );
};

const discoverMovies = async (
  genreId = "",
  page = 1,
  sortBy = "popularity.desc"
) => {

  const today =
    new Date().toISOString().split("T")[0];

  const params = new URLSearchParams({
    page: String(page),
    sort_by: sortBy,
    "primary_release_date.lte": today
  });

  if (genreId) {
    params.set(
      "with_genres",
      String(genreId)
    );
  }

  return request(
    `/3/discover/movie?${params.toString()}`
  );
};


const getMoviesByGenre = async (
  genreId,
  page = 1,
  sortBy = "popularity.desc"
) => {
  const params = new URLSearchParams({
    with_genres: String(genreId),
    page: String(page),
    sort_by: sortBy
  });

  return request(
    `/3/discover/movie?${params.toString()}`
  );
};


module.exports = {
  searchMovies,
  getMovieDetails,
  getPopularMovies,
  getTopRatedMovies,
  discoverMovies,
  getMoviesByGenre
};