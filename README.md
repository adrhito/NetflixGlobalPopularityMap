# Netflix Global Popularity Map 🎬🌍

Discover the most popular Netflix movies and TV shows worldwide, broken down by region. Features an interactive world map, detailed rankings, and a sophisticated popularity scoring algorithm.

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app!

The app works immediately with **mock data** (no API key required).

## 📊 Getting Real Data (Free APIs)

This app uses **two APIs** for optimal accuracy:
- **TMDb API**: Netflix availability data (which titles are on Netflix in which regions)
- **OMDb API**: Real IMDb ratings (more accurate than TMDb ratings)

### Step 1: Get TMDb API Key (Required - Free)

1. **Sign up** at [https://www.themoviedb.org/](https://www.themoviedb.org/)
2. Go to **Settings** → **API** ([direct link](https://www.themoviedb.org/settings/api))
3. Click **"Create"** or **"Request an API Key"**
4. Choose **"Developer"** option
5. Fill out the form (for educational/personal use)
6. **Copy your API key** (v3 auth key)

### Step 2: Get OMDb API Key (Recommended - Free)

1. Go to [http://www.omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx)
2. Select **"FREE" tier** (1,000 requests/day)
3. Enter your email and activate your key
4. **Copy your API key** from the confirmation email

**Why OMDb?** It provides real IMDb ratings and vote counts, which are more accurate than TMDb's ratings.

### Step 3: Configure Environment

Create a `.env.local` file in the project root:

```bash
# Use real data
USE_MOCK_DATA=false

# TMDb API - For Netflix availability
TMDB_API_KEY=your_tmdb_api_key_here

# OMDb API - For accurate IMDb ratings (recommended)
OMDB_API_KEY=your_omdb_api_key_here
```

**Note:** If you don't provide `OMDB_API_KEY`, the app will fall back to TMDb ratings (still works, just less accurate).

Restart your development server and you'll now see real Netflix data with accurate IMDb ratings!

## 🌐 Deployment Instructions

### ❌ GitHub Pages Won't Work

**Important:** This is a Next.js app with API routes (server-side code). GitHub Pages only hosts static HTML/CSS/JS. You need a platform that supports Node.js.

### ✅ Deploy to Vercel (Recommended - Free)

Vercel is made by the creators of Next.js and is completely free for personal projects.

#### From a New Terminal:

```bash
# 1. Initialize git repository (if not already done)
git init
git add .
git commit -m "Initial commit - Netflix Global Popularity Map"

# 2. Create GitHub repository (if you want GitHub hosting)
# Go to https://github.com/new and create a new repository
# Then run:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main

# 3. Deploy to Vercel
npm install -g vercel
vercel login
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: netvpn (or your choice)
# - Directory: ./ (press Enter)
# - Want to override settings? No
```

#### Add Environment Variables on Vercel:

1. Go to your project dashboard on [https://vercel.com](https://vercel.com)
2. Click **Settings** → **Environment Variables**
3. Add:
   - Key: `USE_MOCK_DATA` → Value: `false`
   - Key: `TMDB_API_KEY` → Value: `your_actual_api_key`
4. Redeploy: `vercel --prod`

Your app will be live at `https://your-project.vercel.app`!

### Alternative: Deploy to Netlify (Also Free)

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login and deploy
netlify login
netlify init

# 3. Configure build settings:
# - Build command: npm run build
# - Publish directory: .next

# 4. Add environment variables in Netlify dashboard
# Go to Site settings → Environment variables
```

## 📁 Project Structure

```
netvpn/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── api/            # API routes (server-side)
│   │   │   ├── regions/    # Region endpoints
│   │   │   ├── worldwide/  # Global rankings endpoint
│   │   │   └── refresh/    # Cache refresh endpoint
│   │   ├── about/          # About page
│   │   ├── map/            # Interactive map page
│   │   ├── regions/        # Regions list and detail pages
│   │   ├── worldwide/      # Worldwide rankings page
│   │   └── page.tsx        # Home page
│   ├── components/         # Reusable UI components
│   └── lib/                # Core business logic
│       ├── data/           # Mock data
│       ├── providers/      # Data provider implementations
│       │   ├── streaming/  # Netflix availability providers
│       │   └── imdb/       # IMDb metrics providers
│       ├── scoring/        # Popularity scoring algorithms
│       ├── services/       # Business logic services
│       └── types/          # TypeScript definitions
├── .env.local             # Local environment variables (create this)
├── .env.example           # Environment template
└── README.md              # This file
```

## 🧮 Popularity Score Formula

### Regional Popularity Score (0-100)
```
Score = (Rating × 0.45) + (Log(Votes) × 0.40) + (Popularity Rank × 0.15)
```

- **Rating (45%)**: IMDb rating (0-10), normalized
- **Vote Count (40%)**: Logarithmic scale handles wide ranges (100 to 2M+ votes)
- **Popularity Rank (15%)**: TMDb/IMDb trending indicator

### Global Score (0-100)
```
Global Score = (Popularity Score × 0.75) + (Region Coverage × 0.25)
```

- **Popularity Score (75%)**: Quality and engagement
- **Region Coverage (25%)**: Number of regions where available

## 🛠️ Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Source**: TMDb API (free) or Mock Data
- **Architecture**: Provider Pattern for data abstraction
- **Caching**: In-memory cache with 15-minute TTL

## 🔧 Available Scripts

```bash
npm run dev        # Start development server (http://localhost:3000)
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

## 📡 API Endpoints

### `GET /api/regions`
Returns all regions with top title summaries

### `GET /api/regions/[regionCode]`
Returns ranked titles for a specific region (e.g., `/api/regions/US`)

### `GET /api/worldwide`
Returns worldwide ranked titles with global scores

### `POST /api/refresh`
Clears cache and refreshes data (requires admin token in production)

## 🔐 Environment Variables

```bash
# Data Source
USE_MOCK_DATA=false              # true = mock data, false = real API

# TMDb API (free from https://www.themoviedb.org/settings/api)
TMDB_API_KEY=your_key_here       # Required when USE_MOCK_DATA=false

# Admin (optional)
ADMIN_REFRESH_TOKEN=random_token # For /api/refresh endpoint in production
```

## ⚠️ Important Notes

### Netflix API Limitation
- **Netflix does NOT provide a public API** for catalog data
- This app uses TMDb API which tracks Netflix availability by region
- Data is sourced from TMDb's "watch providers" endpoint

### Legal Considerations
- Netflix is a registered trademark of Netflix, Inc.
- This project is **not affiliated with Netflix, Inc.**
- Educational/demonstration project only
- Always respect API terms of service and rate limits

### API Rate Limits
- TMDb free tier: **10,000 requests/day**
- App uses caching (15min TTL) to minimize API calls
- Typical usage: ~50-100 requests per cache refresh

## ⚡ Quick Deployment Commands

```bash
# Deploy to Vercel (recommended)
npm install -g vercel
vercel login
vercel

# Or push to GitHub and import in Vercel dashboard
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## 🆘 Troubleshooting

### App shows "Failed to load data"
- Check your TMDb API key is correct in `.env.local`
- Verify `USE_MOCK_DATA=false` if using real API
- Check browser console for detailed error messages

### API key exposed in browser
- ✅ API keys are **only** used in server-side API routes
- ✅ Never imported in client components
- ✅ Check: View browser source, search for your API key - you won't find it!

### Deployment errors
- Make sure to add environment variables in your deployment platform
- Vercel: Dashboard → Settings → Environment Variables
- Netlify: Site settings → Environment variables

---

**TMDb API URL**: https://www.themoviedb.org/settings/api

**Need help?** Check the `/about` page in the app for detailed setup instructions.
