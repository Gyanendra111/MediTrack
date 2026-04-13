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

## Script Confirmation
- `dev`: `node --watch src/server.js`
- `start`: `node src/server.js`

## Environment
- `PORT` (default 5000)
- `NODE_ENV`
- `FIREBASE_SERVICE_ACCOUNT` as JSON string for firebase-admin initialization

### Production Environment Values
- `NODE_ENV=production`
- `PORT` (optional on most hosted platforms)
- `FIREBASE_SERVICE_ACCOUNT=<valid JSON service account string>`

## Deploy on Render (Recommended)
1. Create a new **Web Service** from this repository.
2. Set root directory to `backend`.
3. Build command: `npm install`
4. Start command: `npm start`
5. Add env vars:
   - `NODE_ENV=production`
   - `FIREBASE_SERVICE_ACCOUNT=<valid JSON service account string>`
6. After deploy, verify:
   - `GET /health`
   - `GET /api/app-state/:userKey`
   - `PUT /api/app-state/:userKey`
   - `POST /api/doctor/verify`
   - `POST /api/partner/verify`
   - `GET /api/inventory` (requires valid Firebase setup)

## Deploy on Railway (Alternative)
1. Create project from this repository.
2. Set service root to `backend`.
3. Start command: `npm start`
4. Add env vars:
   - `NODE_ENV=production`
   - `FIREBASE_SERVICE_ACCOUNT=<valid JSON service account string>`
5. Verify `GET /health` returns `ok: true`.

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
