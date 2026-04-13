# MediTrack2 Backend

Express backend used by MediTrack frontend APIs.

## Install
1. cd backend
2. npm install
3. cp .env.example .env

## Run
- Development: npm run dev
- Production: npm start
- Tests: npm test

## Environment
- `PORT` (default 5000)
- `NODE_ENV`
- `FIREBASE_SERVICE_ACCOUNT` as JSON string for firebase-admin initialization

## Current API
- `GET /health`
- `GET /api/app-state/:userKey`
- `PUT /api/app-state/:userKey`
- `POST /api/doctor/verify`
- `POST /api/partner/verify`
- `GET /api/inventory`
- `POST /api/inventory`
- `DELETE /api/inventory/:id`

## Notes
- Replace scaffold/in-memory behavior with persistent database integrations for production.
