# MediTrack2 - Expiry Intelligence Platform

## Live Modules
- Professional dashboard with workflow-first layout
- OCR scanner with multi-format expiry parsing
- Credits and rewards exchange journey
- Same-salt recommendation section
- Nearby pharmacies and emergency hospitals
- Application review section
- Email and notification center
- Future roadmap section (doctor consult and verification)

## Quick Start
1. Install dependencies: npm install
2. Copy environment template: cp .env.example .env
3. Fill Firebase values in `.env` (`VITE_FIREBASE_*`)
4. (Optional local backend) set `VITE_API_BASE_URL=http://localhost:5000/api`
5. Start development server: npm run dev -- --host
6. Open: http://localhost:3000

## Backend (local)
1. cd backend
2. npm install
3. Copy backend env template: cp .env.example .env
4. Run backend: npm run dev

## Backend Deployment (Render - Recommended)
1. Create a new **Web Service** from this repository.
2. Set **Root Directory** to `backend`.
3. Set **Build Command** to `npm install`.
4. Set **Start Command** to `npm start`.
5. Add backend environment variables:
   - `NODE_ENV=production`
   - `FIREBASE_SERVICE_ACCOUNT=<valid JSON service account string>`
   - `PORT` (optional on hosts that inject port automatically)
6. Deploy and verify health endpoint:
   - `https://<render-service-url>/health`
7. Verify API endpoints:
   - `GET /api/app-state/:userKey`
   - `PUT /api/app-state/:userKey`
   - `POST /api/doctor/verify`
   - `POST /api/partner/verify`
   - `GET /api/inventory` (works after Firebase credentials are valid)

## Backend Deployment (Railway - Alternative)
1. Create a new Railway project from this repository.
2. Set service root to `backend`.
3. Set start command to `npm start`.
4. Add environment variables:
   - `NODE_ENV=production`
   - `FIREBASE_SERVICE_ACCOUNT=<valid JSON service account string>`
5. Deploy and verify:
   - `GET /health` returns `{"ok":true,"service":"meditrack2-backend",...}`

## Vercel Deployment
1. Import this repository into Vercel.
2. Framework preset: **Vite**.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variables in Vercel Project Settings:
   - `VITE_API_BASE_URL` (your deployed backend URL + `/api`, or leave unset to use `/api`)
   - `VITE_APP_LOGO_SRC` (optional)
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_FIREBASE_MEASUREMENT_ID` (optional)
   - Use exact Firebase Web SDK values (no placeholder text, no wrapping quotes).
6. Redeploy after setting variables.

## Connect Frontend to Deployed Backend
1. In Vercel Project Settings, set:
   - `VITE_API_BASE_URL=https://<your-backend-domain>/api`
2. Redeploy frontend.
3. Validate app flows using backend APIs:
   - Settings health check
   - Doctor/partner verification submissions
   - Inventory load/create/delete

## Build and Validate
- Lint: npm run lint
- Production build: npm run build
- Preview build: npm run preview
- Backend tests: cd backend && npm test

## Go-live Safety Checks
- Ensure no `.env` files are committed.
- Check backend logs for Firebase parse/init errors.
- Confirm inventory endpoint no longer returns `503 pending_setup` after setting `FIREBASE_SERVICE_ACCOUNT`.
- Run a smoke test against `/health` and required `/api/*` endpoints.

## Important Manual Setup
- Fill Firebase environment variables in `.env` / Vercel settings
- Follow the complete checklist in MANUAL_FILL_REPORT.md

## OCR Workflow
1. Select category and optional product name.
2. Capture with camera or upload image.
3. Parse expiry from formats such as Up to, Valid till, Best before, Expiry, and Exp.

## Notes
- The UI is production-style and integration-ready.
- API integration placeholders are intentionally left blank for manual setup.
