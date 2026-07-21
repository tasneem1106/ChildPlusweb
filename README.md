# Child Plus: Anganwadi Nutritional & Educational Tracker

This monorepo contains the codebase for **Child Plus**, a digital tracking application designed to combat stunting, track Foundational Literacy & Numeracy (FLN) milestones, and automate administrative tasks for Anganwadi Workers (AWWs) in Anekal Taluk, Karnataka.

## Project Structure

* `shared/`: Shared TypeScript models and interfaces (Child, GrowthRecord, Milestone, AnganwadiCenter).
* `backend/`: Node.js + Express API server running typescript. Handles WHO child growth standard Z-score analysis and integrates with Supabase.
* `mobile-client/`: (Proposed) Web-mobile prototype for AWWs.
* `supervisor-dashboard/`: (Proposed) Supervisor data-visualizations and GIS map tracking.

---

## Database Configuration (Supabase)

The project is preconfigured to use Supabase for data storage.

1. Go to your **Supabase Dashboard**.
2. Open the **SQL Editor** tab.
3. Copy the SQL commands from the root file [db_schema.sql](file:///C:/Users/stasn/.gemini/antigravity/scratch/child-plus/db_schema.sql) and execute them to create the tables (`children`, `growth_records`, `milestones`) and indices.

---

## Local Development Setup

To run the project locally, ensure you have **Node.js** (v18+) and **npm** installed on your machine.

1. **Bootstrap dependencies:**
   From the root directory, run:
   ```bash
   npm run bootstrap
   ```
   This will install node modules for the shared package and the workspaces.

2. **Environment Variables:**
   A root `.env` file has been generated with your Supabase credentials. Ensure it contains:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://mkfdphjgvcbrxssibabr.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_EXn8Z9e4JAPVEoFwiMEnZA_KxG2KPo_
   ```

3. **Start the backend server:**
   ```bash
   npm run dev:backend
   ```
   The backend API will start running at `http://localhost:3001`.

---

## Backend API Documentation

### 1. Register a Child
* **Endpoint:** `POST /api/children`
* **Body:**
  ```json
  {
    "name": "Raju Gowda",
    "date_of_birth": "2023-04-12",
    "gender": "MALE",
    "anganwadi_center_id": "AW-ANEKAL-12",
    "village_name": "Sidhoshakote",
    "parent_name": "Ramesh Gowda",
    "parent_phone": "9876543210"
  }
  ```

### 2. Log Growth Metrics & Analyze (WHO Z-Scores)
* **Endpoint:** `POST /api/growth`
* **Body:**
  ```json
  {
    "child_id": "<CHILD_UUID>",
    "height_cm": 88.5,
    "weight_kg": 11.2,
    "muac_mm": 135,
    "measured_by_aww_id": "AWW-SHANTHAMMA-1",
    "notes": "Healthy active development",
    "measured_at": "2026-07-19T00:00:00.000Z"
  }
  ```
* **Response:** Analyzes Z-Scores and returns severity levels (NORMAL / MAM / SAM).

### 3. Log Milestone Progress
* **Endpoint:** `POST /api/milestones`
* **Body:**
  ```json
  {
    "child_id": "<CHILD_UUID>",
    "milestone_code": "COGNITIVE_3Y_1",
    "milestone_name": "Sorts blocks by color",
    "category": "COGNITIVE",
    "target_age_months": 36,
    "completed": true,
    "logged_by_aww_id": "AWW-SHANTHAMMA-1"
  }
  ```

### 4. Fetch Child Dashboard data ("Poshan Flower")
* **Endpoint:** `GET /api/children/:id/dashboard`
* **Response:** Returns child details, latest growth status, milestone completion list, and the visual "Poshan Flower" status indicators.
