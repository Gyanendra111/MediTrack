# MediTrack Full Potential Testing Checklist

## 1) Setup

1. Frontend env:
   - Copy `.env.example` to `.env`.
   - Optional updates:
     - `VITE_API_BASE_URL=http://localhost:5000/api`
     - `VITE_APP_LOGO_SRC=/logo-placeholder.svg` (replace later with your PNG path).
2. Backend env:
   - In `backend`, copy `.env.example` to `.env` if needed.
   - Optional Mongo mode:
     - Set `MONGO_URI=your_mongodb_connection_string` in `backend/.env`.
3. Install dependencies:
   - Root: `npm install`
   - Backend: `cd backend && npm install`

## 2) Run

Open two terminals:

1. Backend:
   - `cd backend`
   - `npm run dev`
2. Frontend:
   - `npm run dev`

## 3) Core Journey Tests

### Authentication

1. Register user account.
2. Login with new account.
3. Logout and login again.
4. Guest mode login.
5. Forgot password trigger.

Expected:
- Navigation works.
- No blank pages.
- Protected routes redirect correctly.

### Branding + Theme

1. Confirm sidebar app name is `MediTrack`.
2. Confirm logo placeholder is visible.
3. Toggle Dark/Light mode from sidebar and Settings.

Expected:
- Theme persists after refresh.
- Major panels, text, borders adapt correctly.

### Inventory (Functional)

1. Search products by name and category keyword.
2. Filter by category and status.
3. Edit quantity.
4. Delete a product.

Expected:
- Table updates immediately.
- Changes persist after refresh and re-login.

### Scan + Manual Entry

1. In Scan Product, choose Manual Entry.
2. Enter name, expiry date, quantity.
3. Save and verify item appears in Inventory.
4. Camera/upload OCR path:
   - Capture/upload image.
   - Extract expiry.
   - Save to inventory.

Expected:
- Manual and OCR saves both write inventory records.

### Doctor Consulting + Booking

1. Book appointment from Find Doctors.
2. Open My Appointments tab.
3. Cancel appointment.

Expected:
- Booked items appear instantly.
- Status updates to Cancelled.
- Data persists on refresh.

### Doctor Verification Flow

1. Open Register as Doctor (login page or sidebar).
2. Fill all required verification fields.
3. Submit.

Expected:
- Backend validates required fields.
- Success message appears and redirects.

### Nearby + Map

1. Open Nearby Stores.
2. Check map renders.
3. Click Navigate on stores.

Expected:
- Map iframe loads.
- Navigate opens map query in new tab.

### Settings + Profile

1. Settings:
   - Toggle alerts.
   - Change reminder days.
   - Run backend connectivity test.
2. Profile:
   - Edit all fields.
   - Save.

Expected:
- Settings/profile persist across refresh.
- Backend test reports connected when backend is running.

## 4) API Smoke Tests (Optional)

Run in terminal while backend is running:

1. Health:
   - `Invoke-RestMethod -Method GET -Uri "http://localhost:5000/health"`
2. State read:
   - `Invoke-RestMethod -Method GET -Uri "http://localhost:5000/api/app-state/guest"`
3. Doctor verify:
   - `Invoke-RestMethod -Method POST -Uri "http://localhost:5000/api/doctor/verify" -ContentType "application/json" -Body '{"fullName":"Dr Test","licenseNumber":"ABC123","specialization":"General Physician","idProofUrl":"https://example.com/id","degreeProofUrl":"https://example.com/degree","livePhotoUrl":"https://example.com/photo"}'`

## 5) Edge Cases to Test

1. Stop backend and continue using app.
2. Refresh repeatedly after edits.
3. Switch between guest and authenticated sessions.
4. Use invalid doctor form payload (missing field).

Expected:
- App remains usable with local fallback.
- Validation errors are shown where needed.

## 6) Performance/Quality Checks

1. Build check:
   - `npm run build`
2. Frontend E2E smoke tests:
   - `npm run test:e2e`
3. Backend API tests:
   - `cd backend && npm test`
4. Backend logs should show requests while interacting with app.
5. No runtime red-screen or blank page.

## 7) Replace Logo Later

When you add your PNG, set in `.env`:
- `VITE_APP_LOGO_SRC=/your-logo.png`

Then restart frontend dev server.
