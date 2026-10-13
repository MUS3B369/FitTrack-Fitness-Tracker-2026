# FitTrack - Full Stack Fitness Tracker

## Stack
- React + Vite frontend
- Node.js + Express backend
- MongoDB database
- JWT authentication
- Recharts dashboard

## 1. Backend
```bash
cd backend
copy .env.example .env
npm install
npm run dev
```
On macOS/Linux, use `cp .env.example .env`.

Edit `.env` and set `MONGO_URI` and `JWT_SECRET`.

## 2. Frontend
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```
Then open the URL shown by Vite (normally http://localhost:5173).

## MongoDB
You can use a local MongoDB instance or MongoDB Atlas. For local MongoDB, the example URI is:
`mongodb://127.0.0.1:27017/fitness_tracker`

## API
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/workouts/dashboard`
- `GET /api/workouts`
- `POST /api/workouts`
