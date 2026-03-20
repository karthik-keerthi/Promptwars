# Missing Persons Identity Finder - Prompt Wars Hackathon

## Overview
This repository contains the solution for the **Missing Persons** problem statement of the Prompt Wars Hackathon (Early 2026 reports). The solution is a smart, dynamic web application designed to help identify missing persons in real-time, specifically targeted towards regions like Delhi which face high missing person report rates.

## Vertical
**Social Impact & Public Safety**

## The Approach and Logic
We implemented an **Agentic AI Architecture** to handle complex decision-making seamlessly. The application operates using three core AI agents:

1.  **Identification Agent**: Processes uploaded images or live camera snapshots against a centralized Vector Database (simulated locally via FAISS/Cosine Similarity concepts for the hackathon).
2.  **Web Search Agent**: Acts as a fallback. If the person is not found in the local secure database, it searches real-time live web sources (simulating Google Custom Search API).
3.  **Registration Agent**: If no match is found anywhere, this agent prompts the user to securely register the individual's details into the system.

### How the Solution Works
1.  **User Access**: Anyone from any device can access the modern, accessible web interface.
2.  **Multi-lingual Support**: Users can select English, Hindi, or Telugu to sync the entire GUI, making it accessible to diverse demographics in India.
3.  **Image Capture**: Users can drag and drop an existing photo or use their device's camera for a live snapshot.
4.  **AI Orchestration**: 
    *   The `AutonomousAgent` takes the image and queries the `MemoryStore`.
    *   If a high-confidence match ($>=80\\%$) exists, details are displayed.
    *   If not, it triggers the Web Search Agent.
    *   If still no match, the Registration Form is displayed to capture missing details (Name, Last Seen, District, etc.).

## Assumptions Made
*   **Google Services Simulation**: For this hackathon implementation, since live GCP billing/credentials were not provided in the environment, we have locally mocked the architectural equivalents of **Google Cloud Storage** (local disk), **Vertex AI Vector Search** (local JSON dataset evaluation), and **Google Custom Search API** (randomized web discovery logic).
*   **Dataset Setup**: We synthesized a dataset of 100 missing persons structured exactly as requested to demonstrate system capability.

## Evaluation Focus Areas
*   **Code Quality**: The codebase strictly follows the **Agentic AI Project Structure** image uploaded in the prompt (`src/agents`, `src/core`, `config/`, etc.), ensuring maximum modularity and enterprise-level maintainability.
*   **Security**: The backend separates identity config, enforces confidence threshold validations, and simulates secure registration bounds.
*   **Efficiency**: Utilizing async FastAPI routes and modular agent orchestration to prevent main thread blocking during intensive Vector Searches.
*   **Testing**: The repository includes a `tests/` directory pre-structured for robust unit and integration testing of agent reasoning and environments.
*   **Accessibility**: The UI is built with high-contrast Glassmorphism CSS, large touch targets for mobile usability, semantic HTML, and dynamic real-time i18n translation (English, Hindi, Telugu).
*   **Google Services integration architecture**: The architecture is fully prepped to accept `google-cloud-aiplatform` (Vertex AI) and `google-cloud-storage` SDKs directly into the core agents.

## Project Structure
\`\`\`text
agentic_ai_project/
├── config/                  # Logging, agent, model configurations
├── src/
│   ├── agents/              # Identification, WebSearch, Registration Agents
│   ├── core/                # Memory stores, vector processing logic
│   ├── environment/         # Environment variables and simulators
│   ├── utils/               # Logging, metrics, validation
│   └── main.py              # FastAPI Backend Entrypoint
├── data/
│   ├── knowledge_base/      # 100 missing persons generated dataset (JSON & CSV)
├── frontend/                # HTML, CSS, JS Web UI
├── requirements.txt         # Python dependencies
└── README.md
\`\`\`

## Running the Application
### Backend
\`\`\`bash
pip install -r requirements.txt
python -m uvicorn src.main:app --reload
\`\`\`
### Frontend
Simply open \`frontend/index.html\` in any modern web browser or use a live server extension.
