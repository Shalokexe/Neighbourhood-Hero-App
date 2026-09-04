# 🕷️ PROJECT DOSSIER: NEIGHBORHOOD HERO
> **"Guy in the Chair" Technical Blueprint & Product Architecture Report**
> *Inspired by Ned Leeds' Mission Control for Unmasked Superhero Operations.*

---

## 1. EXECUTIVE SUMMARY & MISSION MANIFESTO

### 1.1 Codename & Purpose
- **Project Codename:** `NEIGHBORHOOD HERO`
- **Tagline:** *Post. Help. Earn. Level Up.*
- **Mission Region:** Kharar ➔ Mohali ➔ Chandigarh ➔ Panchkula (Tricity, Punjab/Haryana).

### 1.2 The Gen-Z & New Bharat Vision
> *"We don't wait for corrupted political systems or slow bureaucracy to fix our streets. We are the **NEW BHARAT** — a generation of unmasked everyday superheroes taking charge of our neighborhoods. Whether someone needs emergency grocery runs, elderly support, tutoring, or raising local community issues, we show up, solve it, level up, and earn exclusive rewards!"*

---

## 2. SYSTEM ARCHITECTURE & TECH STACK

```text
                               ┌─────────────────────────────────────────┐
                               │       REACT 18 + TYPESCRIPT FRONTEND    │
                               │  - Co-Star Stark Luxury Aesthetic UI    │
                               │  - Web Audio API & Haptics Engine       │
                               │  - Leaflet Dark Maps & Spatial Radar    │
                               └────────────────────┬────────────────────┘
                                                    │
                                                    ▼
                               ┌─────────────────────────────────────────┐
                               │       PYTHON FASTAPI MICROSERVICE       │
                               │  - Deterministic Credit Calculation     │
                               │  - AI NLP Task Categorizer & Estimator  │
                               │  - Haversine Distance Calculation API   │
                               └────────────────────┬────────────────────┘
                                                    │
                                                    ▼
                               ┌─────────────────────────────────────────┐
                               │      POSTGRESQL + POSTGIS DATABASE      │
                               │  - Spatial Indexing (GIST Index)        │
                               │  - Audit Ledger for Credit Transactions │
                               └─────────────────────────────────────────┘
```

### 2.1 Core Technology Breakdown

| Component | Technology | Purpose & Capabilities |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18 + Vite | Lightning-fast PWA application with hot reload and component modularity. |
| **Type Safety** | TypeScript 5.5 | Full end-to-end type safety for domain models, state machine, and credit engines. |
| **Styling & Aesthetics** | Tailwind CSS + Co-Star Stark | Minimalist editorial dark luxury styling with high-contrast typography and celestial grid cards. |
| **Maps & Spatial Radar** | Leaflet & React-Leaflet | Dynamic dark maps with category color-coded pins, radius filtering, and radar sweeps. |
| **Audio & Haptics** | Web Audio API | Synthesizes sound effects (Mission Accept fanfare, Level Up chord, Coin collect chime) and mobile vibrations. |
| **Backend Microservice** | Python 3.11 + FastAPI | Server-side credit calculation, AI NLP task classification, and Haversine geospatial calculations. |
| **Database** | PostgreSQL + PostGIS | Spatial coordinates indexing, audit ledger transactions, and Row-Level Security (RLS). |

---

## 3. CORE OPERATIONAL MODULES

### 3.1 🎙️ Multilingual AI Voice Assistant (Uber / Rapido Style)
- **Speech-to-Text Dictation:** Supports **English (`en-IN`)**, **Hindi (`hi-IN`)**, and **Punjabi (`pa-IN`)**.
- **AI Task Parsing:** Speech is analyzed to automatically extract mission title, category, budget, and credit reward.
- **Text-to-Speech Voice Guide:** Spoken audio guide explaining how to navigate the app and earn rewards.

### 3.2 🎮 Deterministic Credit Engine & Gamification Ledger
- **10 Hero Level Ranks:**
  1. *Level 1: New Hero (0 XP)*
  2. *Level 2: Local Helper (100 XP)*
  3. *Level 3: Neighborhood Hero (250 XP)*
  4. *Level 4: Active Hero (500 XP)*
  5. *Level 5: Super Helper (1000 XP)*
  6. *Level 6: Community Star (2000 XP)*
  7. *Level 7: Area Champion (3500 XP)*
  8. *Level 8: City Hero (5000 XP)*
  9. *Level 9: Community Legend (7500 XP)*
  10. *Level 10: Neighborhood Guardian (10000 XP)*
- **Credit Reward Multipliers:**
  - Base Reward: `+10 to +50 Credits`
  - Urgency Bonus: `+5 Credits`
  - 5-Star Review Bonus: `+5 Credits`
  - First Mission Bonus: `+10 Credits`
  - 3-Mission Streak Bonus: `+5 Credits` 🔥

### 3.3 🎁 Rewards Store & Voucher Pass Wallet
- Exchange Gig Credits for real local partner vouchers (₹100 Café Vouchers, Sticker Packs, Hero Tech T-Shirts, Restaurant Passes).
- Generates unique 8-digit redemption codes (`HERO-CAFE-XXXX`).

### 3.4 📸 Proof-of-Work Verification System
- Helpers attach photo evidence (package handed over, desk assembled, plants watered) before claiming credit rewards.
- Provides visual proof cards on task completion.

### 3.5 🌱 Sustainability & CO2 Impact Dashboard
- Tracks real-time community statistics:
  - 🌿 **184.5 kg CO2 Saved** via walking & cycling errands.
  - ♻️ **92 Items Repaired & Reused**.
  - 🤝 **410 Hours** of neighborhood help given across Tricity.

---

## 4. FUTURE ROADMAP & UPCOMING FEATURES

```text
  ┌────────────────────────┐       ┌────────────────────────┐       ┌────────────────────────┐
  │ PHASE 1: MVP LAUNCH    │ ───►  │ PHASE 2: INSTA-REELS   │ ───►  │ PHASE 3: SQUAD WARS    │
  │ (Tricity Seed & API)   │       │ (Hero Video Feed Clips)│       │ (Guild Tournaments)    │
  └────────────────────────┘       └────────────────────────┘       └────────────────────────┘
```

1. **🎬 Hero Insta-Reels Short Video Feed:**  
   Allow heroes to record and post 15-second short video highlights of their completed missions (e.g. happy dog walks, assembled desks, tutored students) on a community feed!
2. **🏆 Neighborhood Guild Wars:**  
   Compete squad vs squad (*Sunny Enclave Squad* vs *Phase 3B2 Heroes*) for monthly city trophies and merchant sponsorship funds!
3. **📡 AI SOS Emergency Radar:**  
   Instant high-priority emergency notifications dispatched to nearby verified heroes within 300m.

---

<div align="center">

  <sub>Report compiled by **Ned Leeds (Guy in the Chair)** for **NEIGHBORHOOD HERO**.</sub>

</div>
