<div align="center">

  <!-- Glowing Header Banner -->
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:00E5FF,50:2563EB,100:FF2A54&height=220&section=header&text=NEIGHBORHOOD%20HERO&fontSize=55&fontColor=ffffff&fontAlignY=35&desc=POST%20%E2%80%A2%20HELP%20%E2%80%A2%20EARN%20%E2%80%A2%20LEVEL%20UP&descAlignY=62&descSize=20" width="100%" alt="Neighborhood Hero Banner" />

  <br/>

  <!-- Badges Grid -->
  <p align="center">
    <a href="https://github.com/Shalokexe/Neighbourhood-Hero-App">
      <img src="https://img.shields.io/github/stars/Shalokexe/Neighbourhood-Hero-App?style=for-the-badge&color=00E5FF&logo=github" alt="Stars" />
    </a>
    <a href="https://github.com/Shalokexe/Neighbourhood-Hero-App/stargazers">
      <img src="https://img.shields.io/github/forks/Shalokexe/Neighbourhood-Hero-App?style=for-the-badge&color=FF2A54&logo=github" alt="Forks" />
    </a>
    <a href="https://reactjs.org/">
      <img src="https://img.shields.io/badge/Frontend-React%2018%20%2B%20TypeScript-00E5FF?style=for-the-badge&logo=react" alt="React" />
    </a>
    <a href="https://fastapi.tiangolo.com/">
      <img src="https://img.shields.io/badge/Backend-Python%20FastAPI-10B981?style=for-the-badge&logo=fastapi" alt="FastAPI" />
    </a>
    <a href="https://www.postgresql.org/">
      <img src="https://img.shields.io/badge/Database-PostgreSQL%20%2B%20PostGIS-336791?style=for-the-badge&logo=postgresql" alt="PostgreSQL" />
    </a>
  </p>

  <h3>Every neighborhood has heroes.</h3>

  <p align="center">
    <b>A hyperlocal task marketplace, community network & gamified hero progression engine built for the Tricity region.</b><br/>
    <i>Kharar • Mohali • Chandigarh • Panchkula</i>
  </p>

</div>

---

## ⚡ The Hero Experience Loop

```text
  ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
  │  POST A MISSION │ ───►  │ DISCOVER NEARBY │ ───►  │ TAKE ACTION &   │
  │  (30-sec form)  │       │ (Interactive Map)│      │ COORDINATE CHAT │
  └─────────────────┘       └─────────────────┘       └────────┬────────┘
                                                               │
  ┌─────────────────┐       ┌─────────────────┐                │
  │ REDEEM REWARDS  │ ◄───  │ LEVEL UP HERO   │ ◄──────────────┘
  │ (Café Vouchers) │       │ (Earn Credits)  │
  └─────────────────┘       └─────────────────┘
```

---

## 🔥 Key Features & Capabilities

### 📍 1. Hyperlocal Geospatial Engine
- **Initial Launch Focus:** Seeded database mapping for **Kharar**, **Mohali**, **Chandigarh**, and **Panchkula**.
- **Interactive Dark Map:** Leaflet dark map with category color-coded pins and dynamic radius selector (`1 km`, `3 km`, `5 km`, `10 km`).
- **Location Privacy Standard:** Before mission acceptance, exact GPS coordinates are masked (`"Near Sector 125, Kharar ~0.8 km"`). Exact street addresses unlock only upon mission acceptance.

### 🛡️ 2. State Machine Mission Lifecycle
- Enforces valid state transitions: `OPEN` ➔ `ACCEPTED` ➔ `IN_PROGRESS` ➔ `COMPLETED` ➔ `REVIEWED`.
- **Anti-Abuse Protections:** Self-gig prevention (users cannot accept their own missions) & single active helper constraints.

### 💬 3. Mission Coordination Messaging
- Real-time chat channel per accepted mission with timestamped messaging and quick action reply chips.

### 🎮 4. Gamified Credits & Hero Level Engine
- **10 Hero Level Ranks:** Level 1: *New Hero* to Level 10: *Neighborhood Guardian*.
- **Auditable Transaction Ledger:** Complete audit trail logging every `EARN`, `BONUS`, `REDEMPTION`, and `ADMIN_ADJUSTMENT`.
- **Badge Unlocking System:** Includes *First Mission*, *Helping Hand*, *Super Helper*, *Tech Fixer*, *Errand Runner*, *Night Watcher*, *Five-Star Hero*, and *Local Legend*.
- **Particle Celebrations:** Canvas-confetti celebrations trigger on mission completion and level ups!

### 🎨 5. Hero Theme & Profile Banner Customization
- **5 Hero Color Schemes:** Urban Cyan (`#00E5FF`), Crimson Guardian (`#FF2A54`), Solar Champion (`#FFC72C`), Cyber Legend (`#A855F7`), Eco Guardian (`#10B981`).
- **Custom Profile Banners:** Neighborhood Grid, Cyber Circuit Pulse, Solar Crest, and Flame Hero Streak.
- **Earn or Buy with Credits:** Unlocked by reaching Hero Levels or purchasing with earned Gig Credits as achievement tokens!

### 🎁 6. In-App Rewards Store & Voucher Pass Wallet
- Exchange Gig Credits for real local partner vouchers (₹100 Café Vouchers, Sticker Packs, Hero Tech T-Shirts, Restaurant Passes).
- Unique 8-digit redemption pass generation (`HERO-CAFE-XXXX`).

### 🛡️ 7. Admin Moderation & Operations Panel
- Real-time metrics dashboard, User Block/Unblock toggle, Gig removal, Safety report queue, and Manual Credit Audit adjustments.

---

## 🛠️ Multi-Language Architecture

```
NEIGHBORHOOD HERO REPOSITORY
├── frontend/ (Mobile & Web App)
│   ├── React 18 + TypeScript + Vite
│   ├── Tailwind CSS + Custom Urban Hero Design Tokens
│   ├── Leaflet & React-Leaflet (Interactive Dark Maps)
│   └── Canvas-Confetti (Hero Level Celebrations)
│
├── backend/ (Python Microservice API)
│   ├── FastAPI + Uvicorn + Pydantic
│   ├── services/credit_engine.py  (Deterministic Python Credit Engine)
│   ├── services/ai_matcher.py     (AI Task Categorization & Reward Estimator)
│   └── main.py                    (REST Endpoints & Haversine Distance API)
│
└── supabase/ (Database & Spatial Infrastructure)
    └── schema.sql                 (PostgreSQL + PostGIS spatial indexing & RLS)
```

---

## 🚀 Quick Start Guide

### 1. Frontend (React 18 + Vite)

```bash
# Clone the repository
git clone https://github.com/Shalokexe/Neighbourhood-Hero-App.git
cd Neighbourhood-Hero-App

# Install dependencies
npm install

# Run Vite dev server
npm run dev
```
*Open `http://localhost:5173` in your browser.*

---

### 2. Backend (Python FastAPI Microservice)

```bash
# Navigate to backend directory
cd backend

# Install Python requirements
pip install -r requirements.txt

# Start FastAPI server
python main.py
```
*API documentation available at `http://localhost:8000/docs`*

---

## 🗄️ Database Setup (PostgreSQL + PostGIS)

1. Open your PostgreSQL / Supabase SQL Editor.
2. Execute the script in [`supabase/schema.sql`](./supabase/schema.sql).
3. Initializes PostGIS spatial extensions, tables, index GISTs, and radius search functions (`get_nearby_gigs`).

---

<div align="center">

  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:FF2A54,50:2563EB,100:00E5FF&height=120&section=footer" width="100%" alt="Footer Banner" />

  <br/>
  <sub>Built with ❤️ for every hero in Kharar, Mohali, Chandigarh & Panchkula.</sub>

</div>
