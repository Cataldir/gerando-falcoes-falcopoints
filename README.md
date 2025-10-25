# code-evaluator

Full-stack platform for orchestrating code-quality evaluations across GitHub repositories.

## Project layout

- `src/backend/`: FastAPI backend integrated with Azure Cosmos DB and Azure AI Foundry agents.
- `src/frontend/`: Next.js 14 UI (App Router) with Tailwind CSS and an atomic component structure.

## Backend (FastAPI + uv)

1. Install [uv](https://github.com/astral-sh/uv) and Python 3.13.
1. Copy `src/backend/.env` and adjust the values for your environment:

```env
COSMOS_ENDPOINT=... # Cosmos DB SQL endpoint
COSMOS_DATABASE=code-evaluator
COSMOS_CHALLENGES_CONTAINER=challenges
COSMOS_CRITERIA_CONTAINER=criteria
COSMOS_REPOSITORIES_CONTAINER=repositories
COSMOS_EVALUATIONS_CONTAINER=evaluations
AZURE_AI_ENDPOINT=...
AZURE_AI_PROJECT_NAME=code-evaluator-project
AZURE_AI_AGENT_NAME=code-quality-agent
GITHUB_TOKEN=... # optional, improves GitHub rate limits
```

1. Install dependencies and run the API:

```powershell
cd src/backend
uv sync --all-extras --dev
uv run uvicorn app.main:app --reload
```

## Frontend (Next.js + Tailwind)

1. Install Node.js 20+.
1. Install dependencies and start the dev server:

```powershell
cd src/frontend
npm install
npm run dev
```

1. Ensure `NEXT_PUBLIC_API_BASE_URL` points to the backend (create `.env.local` in `src/frontend` if needed).

## Key features

- Challenge management with dynamic evaluation criteria and repository mapping.
- Live ranking dashboard polling the backend for evaluation progress.
- Azure AI agent integration using repository snapshots (download + unzip) during evaluations.
