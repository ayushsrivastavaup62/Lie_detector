# Lie_detector

AI-powered platform for detecting potentially AI-generated images and videos. Features confidence-based analysis, fake media awareness, trending misinformation insights, and a premium modern UI focused on digital trust and verification.

## Run Frontend

From the project root:

```bash
npm install
npm run dev
```

If PowerShell blocks `npm.ps1`, use:

```bash
npm.cmd install
npm.cmd run dev
```

## Run Backend

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Backend runs on `http://localhost:5000`.

## API Keys

Add your Sightengine credentials to `backend/.env`:

```env
SIGHTENGINE_API_USER=your_api_user_here
SIGHTENGINE_API_SECRET=your_api_secret_here
GNEWS_API_KEY=your_gnews_api_key_here
PORT=5000
```

The frontend sends uploads to `http://localhost:5000/api/detect` and trending news requests to `http://localhost:5000/api/trending-news`. API keys stay only on the backend.
