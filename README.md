# MythVerse

### An interactive universe built around mythology, exploration, combat, and storytelling.

MythVerse is a mythology-driven RPG experience that brings ancient stories, gods, heroes, creatures, artifacts, and worlds into an interactive environment.

The project combines a cinematic web experience with RPG mechanics, an evolving mythology codex, exploration, quests, combat, character progression, artifact forging, and an intelligent lore companion.

The goal is simple:

Turn mythology from something you read into something you can explore.

## Features

### Mythological Worlds

Explore different mythological traditions and their worlds.

Current foundations include:

* Greek mythology
* Norse mythology
* Egyptian mythology

The underlying data architecture is designed so additional traditions can be introduced without rebuilding the core systems.

### Characters and Deities

Discover gods, heroes, creatures, and other legendary figures.

Each character can contain information about:

* Names and aliases
* Titles
* Pantheon
* Domains
* Relationships
* Lore
* Artifacts
* Locations
* Abilities
* Affinity
* Progression

Characters are connected rather than existing as isolated entries, allowing players to discover relationships between different figures and stories.

### Interactive Codex

The Codex acts as MythVerse's evolving mythology archive.

Players can discover:

* Gods
* Heroes
* Creatures
* Weapons
* Armor
* Relics
* Locations
* Stories
* Symbols
* Artifacts

Entries can remain hidden until discovered through exploration, quests, battles, or other progression systems.

### Combat

Fight creatures and enemies inspired by mythology.

The combat system is built to be data-driven and supports:

* Attacks
* Abilities
* Critical hits
* Status effects
* Buffs and debuffs
* Affinity interactions
* Enemy behaviors
* Experience
* Loot
* Rewards

The system is designed so new encounters can be introduced through game data rather than hardcoding individual battles.

### Quests

MythVerse includes a progression-based quest system.

Quest types include:

* Main quests
* Side quests
* Exploration quests
* Combat quests
* Collection quests
* Lore quests
* Hidden quests
* Challenges

Objectives can involve discovering locations, defeating creatures, collecting artifacts, interacting with characters, unlocking lore, or progressing through the campaign.

### Forge

The Forge allows players to turn discovered materials into equipment and artifacts.

Systems include:

* Weapons
* Armor
* Relics
* Crafting
* Upgrades
* Materials
* Rarity
* Enchantments
* Equipment progression

### Affinity

Players can build relationships with mythological characters and entities.

Affinity can affect:

* Dialogue
* Quests
* Rewards
* Lore
* Abilities
* Character interactions
* Unlocks

This allows relationships to become part of the gameplay rather than simply being background information.

### AI Lore Companion

MythVerse includes an AI-powered mythology companion designed to answer questions about the worlds, characters, stories, and artifacts within the game.

The companion can provide contextual explanations based on the player's discoveries and progression.

AI is treated as a companion and knowledge interface rather than an authority over gameplay. Core systems such as progression, rewards, inventory, and player statistics remain deterministic.

### Procedural Audio

MythVerse uses browser-based Web Audio synthesis for interactive sound effects.

The audio system can generate effects for:

* Combat
* Weapons
* Forging
* UI interactions
* World transitions
* Discoveries
* Ambient environments

This reduces the dependency on large collections of static audio assets while allowing the game to react dynamically to player actions.

### Character Rendering

Characters use a dynamic rendering system capable of combining origins, equipment, weapons, armor, and visual effects.

The system is designed so character appearance can change as the player progresses and acquires new equipment.

## Design

MythVerse follows a dark cinematic mythology aesthetic inspired by the intersection of:

* Ancient mythology
* Fantasy RPGs
* Interactive archives
* Museum experiences
* Cinematic game interfaces

The interface focuses on atmosphere, typography, motion, visual hierarchy, and environmental storytelling rather than traditional dashboard design.

Animations are used to communicate interaction, progression, discovery, and state changes.

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Framer Motion
* GSAP
* Zustand
* TanStack Query
* Zod

### Backend

* Python
* FastAPI
* Pydantic
* SQLAlchemy
* Alembic

### Infrastructure

* PostgreSQL
* Redis
* Docker
* Docker Compose

### AI

* Google Gemini

### External Data

The project is designed to work with external cultural and knowledge sources where useful, including services such as:

* Wikidata
* Wikimedia
* Wikipedia
* The Metropolitan Museum of Art API
* Europeana

External services are treated as supplemental sources. MythVerse maintains local data and fallbacks so that the core experience does not depend on a single external API.

## Architecture

The project uses a Next.js frontend with a Python backend.

The frontend is responsible for the interactive experience, rendering, client-side state, animation, and user interaction.

The backend handles persistent data, authentication, game logic, APIs, progression, external integrations, and server-side validation.

PostgreSQL provides persistent storage while Redis is used for caching and other performance-sensitive operations.

## Project Structure

```text
mythverse/
├── src/
│   ├── app/
│   ├── components/
│   ├── data/
│   ├── store/
│   ├── types/
│   └── utils/
│
├── backend/
│   └── app/
│       ├── api/
│       ├── auth/
│       ├── combat/
│       ├── game/
│       ├── integrations/
│       ├── lore/
│       ├── models/
│       ├── repositories/
│       ├── schemas/
│       └── services/
│
├── migrations/
├── tests/
├── docker-compose.yml
├── package.json
└── README.md
```

## Getting Started

### Requirements

You will need:

* Node.js 20+
* Python 3.12+
* PostgreSQL
* Redis
* Git

### Clone the repository

```bash
git clone https://github.com/<your-username>/mythverse.git
cd mythverse
```

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd backend

python -m venv .venv
```

Windows:

```bash
.venv\Scripts\activate
```

macOS/Linux:

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the API:

```bash
uvicorn app.main:app --reload
```

## Environment Variables

Create a `.env.local` file for the frontend and an appropriate environment file for the backend.

Example:

```env
DATABASE_URL=
REDIS_URL=
GEMINI_API_KEY=
NEXT_PUBLIC_API_URL=
SESSION_SECRET=
```

Never commit real credentials or API keys.

## Database

Run migrations with:

```bash
alembic upgrade head
```

Seed the mythology data with:

```bash
python scripts/seed_database.py
```

## Docker

MythVerse can be developed with Docker Compose.

```bash
docker compose up -d
```

The development environment is intended to provide the frontend, backend, PostgreSQL database, and Redis services together.

## Development

Run the frontend linter:

```bash
npm run lint
```

Run TypeScript checking:

```bash
npx tsc --noEmit
```

Build the frontend:

```bash
npm run build
```

Run backend tests:

```bash
pytest
```

## Roadmap

### Foundation

* Core mythology systems
* Greek, Norse, and Egyptian content
* Character system
* Codex
* Inventory
* Forge
* Combat
* Quests
* Procedural audio
* AI lore companion

### Backend

* FastAPI backend
* PostgreSQL persistence
* Redis caching
* Authentication
* Server-authoritative progression
* Cloud saves
* Data-driven combat
* Data-driven quests

### World

* Interactive mythology map
* Mythology relationship graph
* Mythology timeline
* More pantheons
* Dynamic world events
* Expanded exploration

### Future Pantheons

The architecture is intended to support additional traditions such as:

* Roman
* Celtic
* Japanese
* Mesopotamian
* Chinese
* Slavic
* Aztec
* Maya

## Philosophy

MythVerse is built around a few simple ideas.

Mythology should feel alive.

Game systems should be data-driven.

AI should enhance the experience rather than control it.

External APIs should improve the world without becoming single points of failure.

The interface should feel like part of the world instead of a collection of disconnected screens.

And most importantly, the project should remain understandable and maintainable as it grows.

## Status

MythVerse is an actively evolving project.

The current version is transitioning from an early RPG prototype toward a complete full-stack mythology platform with a dedicated Python backend, persistent game state, expanded world systems, richer interactions, and a significantly more polished frontend.

## License

This project is licensed under the MIT License.

See `LICENSE` for more information.
