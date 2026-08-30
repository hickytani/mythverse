# 🏛️ MythVerse — 2D Mythology RPG Platform

### An atmospheric, cinematic 2D mythology RPG platform exploring Greek, Norse, and Egyptian pantheons.

**MythVerse** is a production-grade full-stack 2D mythology RPG where players explore mythic realms (Mount Olympus, Asgard, and Egyptian Duat), interact with ancient deities and legendary heroes, accept quests, fight creatures in 2D combat, forge legendary relics, unlock an evolving codex, build character affinity, and consult an AI Lore Companion.

---

## 🌟 Key Features & Gameplay Systems

### 🌌 2D Layered Parallax World Exploration
* **Mount Olympus (Greek)**: Ascend divine white marble columns under golden spark particle skies. Explore Zeus Temple, Athena's Sanctuary, and the Olympian Arena.
* **Asgard & Midgard (Norse)**: Cross the Bifröst rainbow gate beneath aurora skies and snow mist. Explore Valhalla, Odin's Hall, and the Midgard Barrow Grounds.
* **The Duat & Nile Valley (Egyptian)**: Wander golden desert dunes and sandstone temples. Explore the Temple of Anubis, Hall of Judgment, and Nile River Delta.

### ⚔️ Authoritative Data-Driven 2D Combat Engine
* **Cinematic 2D Arena**: Animated vector battle postures for player and creatures.
* **Strike Effects & Floating Popups**: Real-time hit flashes, screen shake, floating damage numbers (`-45 HP`), critical strikes, and trivia weakness exploits.
* **FastAPI Server Resolution**: All combat damage, XP gains, gold coins, material drops, and codex unlocks are computed authoritatively by the FastAPI Python backend endpoint (`/api/v1/combat/action`).

### 📜 Character Encounters & Branching Dialogue
* **Interactive Encounters**: Meet Athena, Zeus, Thor, Odin, Anubis, and Osiris with entrance animations and vector visual posture renderers.
* **Quest Log Integration**: Receive data-driven main & side quests with real-time objective tracking.
* **Affinity Progression**: Develop relationships (`Encountered -> Ally -> Trusted -> Champion`) unlocking exclusive lore and rewards.

### 🔨 Sacred Armoury & Anvil Forge
* Upgrade signature weapons (Thunderbolt Spear, Mjölnir Shard, Khopesh of Horus) and armor sets using collected bronze fragments, rune stones, and spirit thread.
* Procedural Web Audio anvil strikes and sparkling particle effects upon item upgrades.

### 📖 Codex & Interactive Lineage Relationship Graph
* **Evolving Codex**: Unlock entries for gods, heroes, creatures, realms, and relics through gameplay discoveries.
* **Lineage Graph**: Interactive visual relationship network mapping family ties, allies, and rivals across pantheons.

### 🔊 Procedural Web Audio Synthesis
* Zero external MP3 downloads required! Pure browser `AudioContext` web synthesis generating metallic gear clashes, anvil strike pings, battle impact thuds, and ambient drones dynamically.

---

## 🛠️ Full-Stack Architecture

```
                 +---------------------------------------------------------+
                 |              Next.js 15 App Router Frontend             |
                 |  (TypeScript, Tailwind CSS, Framer Motion, Zustand,     |
                 |   Procedural Web Audio Engine, SVG Avatar System)       |
                 +----------------------------+----------------------------+
                                              |
                             REST API Calls / JWT Headers
                                              v
                 +---------------------------------------------------------+
                 |               Python FastAPI Backend (backend/)         |
                 |   - Auth / JWT Middleware (auth.py, auth_service.py)    |
                 |   - Data-Driven Combat Engine (combat.py)               |
                 |   - External Myth API Cache (external_ref_service.py)   |
                 |   - AI Lore Context Service (lore.py)                   |
                 +----------------------------+----------------------------+
                                              |
                                     SQLAlchemy ORM
                                              v
                 +---------------------------------------------------------+
                 |            Database (SQLite / PostgreSQL)               |
                 |  (Users, Profiles, Inventory, Quests, Battles, Codex)   |
                 +---------------------------------------------------------+
```

---

## 📁 Repository Structure

```text
mythverse/
├── backend/
│   ├── app/
│   │   ├── api/          # FastAPI REST endpoints (auth, combat, lore)
│   │   ├── models/       # SQLAlchemy database models
│   │   ├── schemas/      # Pydantic validation schemas
│   │   ├── services/     # Core game logic & Wikipedia reference service
│   │   ├── config.py     # Environment & security config
│   │   ├── database.py   # SQLAlchemy engine session maker
│   │   └── main.py       # FastAPI application entrypoint
│   ├── tests/            # Pytest automated test suite
│   ├── Dockerfile        # Backend API container definition
│   └── requirements.txt  # Python backend dependencies
│
├── src/
│   ├── app/              # Next.js 15 App Router routes & pages
│   ├── components/       # 2D WorldScene, CharacterEncounter, CinematicBattle, RelationshipGraph
│   ├── data/assets/      # Centralized 2D world & character definitions
│   ├── lib/api/          # Centralized ApiClient for frontend-backend communication
│   ├── store/            # Zustand game state store with localStorage persist
│   ├── types/            # TypeScript strict interface definitions
│   └── utils/            # Procedural Web Audio Engine
│
├── docker-compose.yml    # Full-stack Docker orchestration
├── Dockerfile.web        # Next.js production web container
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v20+
- **Python**: v3.13+
- **Docker Compose** *(optional for containerized setup)*

### 1. Frontend Setup
```bash
# Install dependencies
npm install

# Run Next.js development server
npm run dev
```
Open `http://localhost:3000` in your browser.

### 2. Backend Setup
```bash
# Navigate to backend folder
cd backend

# Install Python requirements
py -m pip install -r requirements.txt

# Run FastAPI backend API gateway
py -m uvicorn app.main:app --reload --port 8000
```
FastAPI Interactive OpenAPI Docs will be available at `http://localhost:8000/api/v1/docs`.

### 3. Running via Docker Compose
```bash
docker-compose up --build
```

---

## 🧪 Quality Gate Verification & Tests

```bash
# 1. Python Pytest Test Suite
py -m pytest backend/tests/
# RESULT: 100% PASSING (4/4 test cases)

# 2. TypeScript Compilation Check
npx tsc --noEmit
# RESULT: 0 ERRORS

# 3. Next.js Production Build
npm run build
# RESULT: SUCCESS (22/22 static & dynamic routes compiled)
```

---

## 🔐 Environment Variables

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `DATABASE_URL` | `sqlite:///./mythverse.db` | SQLAlchemy DB connection URI |
| `JWT_SECRET` | `mythverse-super-secret-jwt-key-2026` | Secret key for JWT session tokens |
| `GEMINI_API_KEY` | *(Optional)* | Google Generative AI key for lore companion |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000/api/v1` | Frontend API client base URL |

---

## 📜 License
This project is licensed under the MIT License.
