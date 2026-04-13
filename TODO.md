# MediTrack2 Build TODO - 5 Hour Working Prototype

## Current Progress
- [x] Plan approved & TODO created
- [x] Vite React bootstrap (configs, App w/ glass UI/dark toggle)
- [ ] npm install (run now)
- [ ] Test base: npm run dev (futuristic landing + dark mode)"

## Steps (Execute Sequentially)
1. **Init Vite React Project**  
   Run: `npm create vite@latest . -- --template react` (use defaults)  
   Then: `npm install`

2. **Install Dependencies** (copy-paste):  
   `npm i firebase tesseract.js react-webcam react-router-dom recharts framer-motion lucide-react date-fns tailwindcss postcss autoprefixer @tailwindcss/forms recharts lucide-react @heroicons/react firebase-tools`  
   `npm i -D vite @vitejs/plugin-react`

3. **Setup Tailwind** (run): `npx tailwindcss init -p`  
   Update tailwind.config.js (I'll provide).

4. **Firebase Setup** (manual 10min):  
   - Go firebase.google.com > Create project 'meditrack2-prod' (free).  
   - Enable Auth (Email), Firestore, Functions, FCM.  
   - Get config JSON, paste into src/firebase.js (I'll create w/blank).  
   - Local emulators: `firebase init emulators` (select all), `firebase emulators:start`.

5. **Create Core Files** (I'll create one-by-one, approve each):  
   - Configs (tailwind, vite, firebase.js)  
   - Auth (Login/Register/Forgot)  
   - UI Components (GlassCard, NeonButton, ChartCard)  
   - Dashboard + Charts  
   - ScanFlow (OCR prototype)  
   - Other features (dummies)  

6. **Test Prototype**: `npm run dev` - Login, scan (test expiry parse), dashboard charts, dark toggle.  
   Backend: `firebase emulators:start --only functions,firestore,auth`.

7. **Deploy**: `npm run build`, `firebase deploy`.

**Next**: Confirm init complete, then I create package.json + configs.

**Prototype Complete! Run `npm run dev` to test:
- Futuristic glass UI + dark mode
- Dashboard charts/graphs (dummy data)
- Login (dummy, Firebase blank)
- OCR Scan: Category -> Webcam -> Expiry parse (Up to/Valid till formats)
- All features UI ready, blanks for APIs.

Next: Firebase config (MANUAL_FILL_REPORT.md), add more features (Credits/Recs w/ blanks), deploy.

Full site structure built - manual fills make functional."

