# Lie_detector

AI-powered platform for detecting potentially AI-generated images and videos. Features confidence-based analysis, fake media awareness, trending misinformation insights, protected dashboards, Razorpay plan upgrades, and contact feedback delivery.

## Local Frontend

From the project root:

```bash
npm install
copy .env.example .env
npm run dev
```

If PowerShell blocks `npm.ps1`, use:

```bash
npm.cmd install
npm.cmd run dev
```

Frontend environment:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Local Backend

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Backend default port is `5000` unless `PORT` is set.

## Environment Variables

Frontend:

```env
VITE_API_BASE_URL=
```

Backend:

```env
MONGO_URI=
JWT_SECRET=
JWT_EXPIRES_IN=7d
PORT=5000
FRONTEND_URL=
SIGHTENGINE_API_USER=
SIGHTENGINE_API_SECRET=
GNEWS_API_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
EMAIL_USER=
EMAIL_PASS=
```

Secrets must stay on the backend only. Do not add backend secrets to Vite variables because `VITE_*` values are exposed to the browser bundle.

## Deployment Checklist

Frontend on Vercel:

1. Push the repository to GitHub.
2. Import the project in Vercel from the repository root.
3. Set Framework Preset to `Vite`.
4. Use build command `npm run build`.
5. Use output directory `dist`.
6. Add `VITE_API_BASE_URL=https://your-render-backend.onrender.com/api`.
7. Keep `vercel.json` committed so React Router routes fall back to `index.html`.
8. Deploy and verify the browser title `Lie Detector | AI Media Scanner` and `/favicon.svg`.

Backend on Render:

1. Create a new Render Web Service from the same repository.
2. Set Root Directory to `backend`.
3. Use build command `npm install`.
4. Use start command `npm start`.
5. Add every backend environment variable listed above.
6. Set `FRONTEND_URL=https://your-vercel-app.vercel.app`.
7. Confirm `/health` returns `{ ok: true }`.

MongoDB Atlas:

1. Create an Atlas cluster and database user.
2. Add the Render outbound IPs or use an appropriate production network access rule.
3. Add the Atlas connection string as `MONGO_URI`.
4. Confirm the database user has read/write access to the app database.

Production verification:

1. Signup creates a user and stores only the JWT token in the browser.
2. Login restores the protected session.
3. Logout clears the session.
4. Upload image sends media through the backend detection endpoint.
5. Detection decrements attempts and writes history.
6. Dashboard loads only for authenticated users.
7. Trending loads from the backend through `VITE_API_BASE_URL`.
8. Contact form sends feedback through Nodemailer.
9. Razorpay creates orders and verifies signatures on the backend.
10. History, dashboard, payment, detection, and user routes reject unauthenticated requests.

## Security Notes

- `.env`, `.env.local`, and `backend/.env` are ignored by Git.
- Passwords are hashed with bcrypt before storage.
- JWT verification is handled by backend auth middleware.
- Razorpay payment signatures are validated on the backend.
- CORS allows localhost during development and production origins from `FRONTEND_URL`.
