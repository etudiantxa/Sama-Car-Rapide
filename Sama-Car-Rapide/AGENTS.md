# AGENTS.md - Sama Car Rapide Project

This document provides guidance for AI agents working on the Sama Car Rapide project.

## Project Overview

Sama Car Rapide is a carpooling application with features for passengers, drivers, vehicle owners, and administrators.

## Technology Stack

*   **Backend:**
    *   Language: Node.js
    *   Framework: Express.js
    *   Database: MongoDB
    *   ODM/Driver: Native MongoDB Driver (initially)
    *   Authentication: JWT (JSON Web Tokens)
*   **Frontend:**
    *   Library: React
    *   State Management: Redux Toolkit
    *   Routing: React Router DOM
    *   Styling: Styled Components (or as decided)
    *   API Communication: Axios

## Key Architectural Points

*   **Backend Structure:**
    *   `config/`: Database connection, environment variables.
    *   `src/models/`: Collections schema definitions (conceptual, as MongoDB is schema-less, but used for application-level validation).
    *   `src/controllers/`: Business logic for request handling.
    *   `src/routes/`: API endpoint definitions.
    *   `src/middlewares/`: Authentication, error handling, etc.
    *   `src/services/`: External service integrations (e.g., payment gateways, notifications).
    *   `src/utils/`: Helper functions.
*   **Frontend Structure (`src/`):**
    *   `app/`: Redux store setup.
    *   `components/`: Reusable presentational components.
    *   `features/`: Redux slices and feature-specific logic/components.
    *   `pages/`: Top-level route components.
    *   `services/`: API call functions.
    *   `hooks/`: Custom React hooks.
    *   `utils/`: Utility functions.
    *   `routes/`: Main application routing setup.

## Development Guidelines

*   **Commit Messages:** Follow conventional commit message standards if possible.
*   **Error Handling:** Implement robust error handling on both backend and frontend.
*   **Code Comments:** Add comments for complex logic or non-obvious decisions.
*   **MongoDB Schema:** Refer to `backend/config/mongodb_schema.md` for collection structures and indexing strategy.
*   **Security:**
    *   Ensure passwords are hashed (bcrypt) before storing.
    *   Validate and sanitize all user inputs.
    *   Protect routes appropriately based on user roles and authentication status.

## Notes for AI Agents

*   The project was initially described with SQL entities. This has been translated to a MongoDB structure. Ensure new backend logic aligns with MongoDB best practices (embedding vs. referencing, etc.).
*   The frontend was initialized using `create-react-app` which is now deprecated. Some dependency warnings during setup are expected due to this and the use of `--legacy-peer-deps`. This should not block development but might be a point for future refactoring/migration to a newer toolkit like Vite.
*   Ensure that any sensitive information (API keys, database URIs) is loaded from environment variables (`.env` file, which is gitignored) and not hardcoded.
*   The `mongodb_schema.md` is a conceptual guide. Actual index creation should be handled by the application on startup or via scripts.
*   When adding new backend dependencies, ensure `.gitignore` in the `backend` directory is respected to avoid committing `node_modules`. A similar `.gitignore` exists in the `frontend` directory.
```
