# 🎬 MovieHub

A production-deployed full-stack movie review platform built with **React, Node.js, Express, MongoDB, and the TMDB API**.

MovieHub lets users discover movies, search the TMDB catalog, browse by genre, view detailed movie information, maintain a personal watchlist, and create/manage community reviews.

## 🌐 Live Application

- **Frontend:** https://movie-review-platform-1-xvpl.onrender.com
- **Backend API:** https://movie-review-platform-e0kd.onrender.com
- **Health Check:** https://movie-review-platform-e0kd.onrender.com/api/health

> Keep credentials, database URLs, JWT secrets, and TMDB tokens in environment variables. Never commit real secrets.

---

## ✨ Features

### 🎬 Movie Discovery
- Popular movies from TMDB
- TMDB movie search
- Pagination / Load More
- Browse movies by genre
- Movie details
- Movie posters and metadata
- Director information
- Cast information

### ⭐ Community Reviews
- Authenticated users can create reviews
- 1–5 star ratings
- Average community rating
- Review count
- Edit own reviews
- Delete own reviews
- Ownership protection
- "My Reviews" activity view

### ❤️ Watchlist
- Add TMDB movies to a personal watchlist
- Toggle add/remove behavior
- View saved movies
- Watchlist count in the profile

### 🔐 Authentication
- User registration
- User login
- JWT-based authentication
- Protected API operations
- Ownership-based authorization

### 👤 Profile
- User information
- Watchlist count
- Review count
- Personal activity

---

## 🏗️ Architecture

```text
                         ┌──────────────────────┐
                         │       Browser        │
                         │    React + Vite      │
                         └──────────┬───────────┘
                                    │
                              HTTPS / REST
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Express Backend    │
                         │       Node.js        │
                         └──────────┬───────────┘
                                    │
                    ┌───────────────┼────────────────┐
                    │               │                │
                    ▼               ▼                ▼
              ┌──────────┐   ┌────────────┐   ┌────────────┐
              │ MongoDB  │   │    TMDB    │   │    JWT     │
              │ Database │   │ Movie API  │   │    Auth    │
              └──────────┘   └────────────┘   └────────────┘
```

---

## 🧰 Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- CSS

### Backend
- Node.js
- Express 5
- Mongoose
- JWT
- bcryptjs
- Axios
- CORS
- dotenv

### Database
- MongoDB

### External API
- TMDB API

### Deployment
- Render

---

## 📁 Project Structure

```text
movie-review-platform/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

## 🔌 API Overview

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### TMDB

```text
GET /api/tmdb/search
GET /api/tmdb/popular
GET /api/tmdb/genre/:genreId
GET /api/tmdb/:tmdbId
```

### Reviews

```text
GET    /api/reviews/me
GET    /api/reviews/tmdb/:tmdbMovieId
POST   /api/reviews/tmdb/:tmdbMovieId
PUT    /api/reviews/:id
DELETE /api/reviews/:id
```

### Watchlist

```text
GET    /api/watchlist
POST   /api/watchlist
DELETE /api/watchlist/:tmdbMovieId
```

### Health

```text
GET /api/health
```

Example:

```json
{
  "status": "ok",
  "service": "MovieHub API"
}
```

---

## ⚙️ Local Development

### Prerequisites

- Node.js
- npm
- MongoDB
- TMDB API access token

### Clone

```bash
git clone https://github.com/Poovarasank04/movie-review-platform.git
cd movie-review-platform
```

### Backend

```bash
cd server
npm install
```

Run:

```bash
npm run dev
```

Production-style local run:

```bash
npm start
```

### Frontend

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run:

```bash
npm run dev
```

---

## 🔐 Environment Variables

### Server

```env
PORT=
MONGODB_URI=
JWT_SECRET=
TMDB_READ_ACCESS_TOKEN=
CLIENT_URL=
```

### Client

```env
VITE_API_URL=
```

Use placeholder values in `.env.example`. Never commit real credentials.

---

## 🛡️ Security Practices

- Secrets are stored in environment variables.
- `.env` files are excluded from Git.
- JWT protects authenticated operations.
- Protected routes require authentication.
- Users can update/delete only their own reviews.
- TMDB credentials remain on the backend.
- Production CORS uses the deployed frontend origin.
- Database credentials are never exposed to the browser.

---

## 🌐 Production Deployment

The application is deployed as two independent services:

```text
GitHub Repository
       │
       ├──────────────► Render Static Site
       │                  React/Vite frontend
       │
       └──────────────► Render Web Service
                          Node/Express backend
                                  │
                                  ├── MongoDB
                                  └── TMDB
```
## 📊 Engineering Results & Accomplishments

### Implemented engineering accomplishments

- Built and deployed a complete full-stack movie review platform.
- Designed a separated React frontend and Node/Express REST API.
- Integrated TMDB search, popular movies, genre discovery, movie details, posters, cast, and director data.
- Implemented JWT authentication and protected API operations.
- Implemented ownership-based authorization for review modifications.
- Added persistent MongoDB storage for users, reviews, and watchlists.
- Implemented review CRUD operations and community rating aggregation.
- Implemented watchlist toggle behavior and profile activity counts.
- Added pagination for TMDB-backed movie collections.
- Added a production health-check endpoint.
- Configured separate development and production API endpoints.
- Deployed frontend and backend as independent production services.
- Kept database credentials, JWT secrets, and TMDB credentials outside the source repository.
- Diagnosed and resolved a production CORS origin mismatch.
- Added backend-side TMDB networking resilience with IPv4 resolution, retries, HTTPS SNI, and request timeouts.

## 🧠 Engineering Challenges Solved

### TMDB connectivity resilience

Intermittent TMDB connection resets were handled with:

- IPv4 DNS resolution
- Multiple resolved IPv4 addresses
- HTTPS SNI using `api.themoviedb.org`
- Request timeouts
- Retry attempts
- Fallback across resolved addresses

### Review ownership

The application follows:

```text
One user + One TMDB movie = One review
```

Review modification and deletion are protected so users can manage their own reviews.

### Production frontend/backend communication

Development:

```text
React → http://localhost:5000/api
```

Production:

```text
React → Render backend /api
```

Environment-specific configuration prevents the deployed frontend from depending on localhost.

---

## 📄 License

This project is currently intended as a personal portfolio and learning project.

Movie data and images are provided by TMDB and are subject to TMDB's applicable terms and policies.
