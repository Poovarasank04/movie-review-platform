const https = require("https");

const options = {
  hostname: "api.themoviedb.org",
  port: 443,
  path: "/3/search/movie?query=interstellar",
  method: "GET",

  family: 4,

  headers: {
    Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`
  }
};

const request = https.request(options, (response) => {
  console.log("STATUS:", response.statusCode);

  let data = "";

  response.on("data", (chunk) => {
    data += chunk;
  });

  response.on("end", () => {
    console.log(data);
  });
});

request.on("error", (error) => {
  console.error("NODE HTTPS ERROR:", error);
});

request.end();