# NEIGHBORHOOD HERO (`spidey-gigs-app`)

> **Post micro-tasks, help your neighbors, earn Gig Credits, build your Hero Level, and redeem real local rewards.**

**Working Tagline:** *Post. Help. Earn. Level Up.*  
**Initial Launch Region:** Kharar → Mohali → Chandigarh → Panchkula (Tricity, Punjab/Haryana region).

---

## 🚀 Overview & Vision

`NEIGHBORHOOD HERO` is a hyperlocal community gig marketplace built on the interaction model of a fictional neighborhood-assistance application. Nearby community members discover tasks, accept missions, complete them, earn auditable **Gig Credits**, level up their Hero status, unlock badges, and redeem real local rewards (café vouchers, stickers, partner perks).

---

## ✨ Features Implemented

1. **Authentication & Profile Management:**
   - Phone OTP & Email fallback simulation.
   - Demo User Switcher (Switch between Shalok Dadhwal, Simran Kaur, Arjun Mehta, or Admin role).

2. **Hyperlocal City & Locality System:**
   - Seeded database mapping for **Kharar**, **Mohali**, **Chandigarh**, and **Panchkula**.
   - Database-driven locality selection (e.g. Sunny Enclave, Sector 125, Phase 3B2, Sector 17, Sector 8).

3. **Gig Creation & Discovery:**
   - Fast 30-sec task posting.
   - High-density Mission Cards featuring category icon, distance, locality name, credit yield, optional monetary budget (₹), urgency badge (`URGENT`, `TODAY`, `SOON`, `FLEXIBLE`), and poster rating.
   - Category filtering across 12+ micro-task categories.

4. **Map Discovery & Geofencing:**
   - Interactive Leaflet dark map integration.
   - Radius selector (1 km, 3 km, 5 km, 10 km).
   - Category-specific interactive map pins.
   - **Location Privacy Standard:** Before mission acceptance, exact GPS coordinates are masked; only approximate area ("Near Sector 125, Kharar ~0.8 km") is exposed. Exact address details unlock upon acceptance.

5. **Gig State Machine Lifecycle:**
   - `OPEN` -> `ACCEPTED` -> `IN_PROGRESS` -> `COMPLETED` -> `REVIEWED` (or `CANCELLED` / `DISPUTED`).
   - Anti-abuse validation: Self-gig prevention & single active helper constraint.

6. **Gig-Linked Messaging Chat:**
   - Real-time conversation thread for coordinating meeting details.
   - Timestamped message history & quick reply chips.

7. **Server-Side Credit Engine & Auditable Ledger:**
   - Deterministic server-side credit calculation (+Base, +Urgency Bonus, +5-Star Review Bonus, +First Mission Bonus, +Streak Bonus).
   - Auditable `credit_transactions` ledger (`EARN`, `BONUS`, `REDEMPTION`, `ADMIN_ADJUSTMENT`, `REFUND`).

8. **Hero Level & Badge Gamification:**
   - 10 Hero Level ranks (Level 1: New Hero to Level 10: Neighborhood Guardian).
   - Badge unlocking system (First Mission, Helping Hand, Super Helper, Tech Fixer, Errand Runner, Night Helper, Local Legend).
   - Celebratory confetti animations on mission completion & level up.

9. **In-App Rewards Store & Redemption Wallet:**
   - Catalog of local partner rewards (₹100 Café Voucher, Sticker Pack, Hero Tech T-Shirt, Restaurant Pass).
   - Atomic credit deduction & stock check.
   - Active voucher pass generation (`HERO-CAFE-XXXX`).

10. **Safety & Moderation Admin Dashboard:**
    - Safety report submission sheet.
    - Admin Operations panel for system KPIs, User Block/Unblock toggle, Gig removal, Safety Report resolution queue, and Manual Credit Audit Adjustments.

---

## 🛠 Tech Stack

- **Frontend / PWA:** React 18, TypeScript, Vite, Tailwind CSS / Custom Glassmorphism Theme tokens.
- **Iconography:** Lucide Icons.
- **Maps:** Leaflet & React-Leaflet.
- **Celebrations:** Canvas-Confetti.
- **Database Schema:** PostgreSQL + PostGIS (`supabase/schema.sql`).

---

## 📦 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build Production Bundle
```bash
npm run build
```

---

## 🗄 Database Setup (Supabase / PostgreSQL)

1. Open your Supabase or PostgreSQL SQL Editor.
2. Execute the migration script in [`supabase/schema.sql`](file:///c:/Users/Shalok%20Dadhwal/Videos/Spidey%20gigs%20app/supabase/schema.sql).
3. The script initializes PostGIS extensions, table structures, RLS policies, spatial indexes, and `get_nearby_gigs()` radius query functions.

---

## 🛡 Security & Privacy Rules

- **Self-Gig Prevention:** Poster cannot accept their own gig (`posterId !== currentUser.id`).
- **Single Active Helper:** Only 1 helper can accept an open gig.
- **Location Masking:** Exact street address details are withheld until gig state is `ACCEPTED`.
- **Review Constraint:** Exactly 1 review per participant per gig.

---

## 📄 License
Project NEIGHBORHOOD HERO. All rights reserved.
