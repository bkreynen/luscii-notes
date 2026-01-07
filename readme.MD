# Luscii – Technical Assignment

## 📚 Description

This is a simple API for managing notes. It supports adding, listing, and deleting notes.  
It was built using Node.js with in-memory storage for demonstration purposes.

---

## Requirements

The application should meet the following requirements:

- Use Node.js
- Use in-memory storage (no database required)
- Handle errors securely
- Include unit tests
- Clear and maintainable code

Implicit from the context:

- Secure
- Scalable
- Serverless environment

## Endpoints

The app will have the following endpoints:

- `POST /notes` - Create a new note
- `GET /notes` - Get all notes
- `DELETE /notes/:id` - Delete a note by ID

## 🛠️ How to run

```bash
# Install dependencies
npm install

# Run the API
npm start

# Run tests
npm test

# Format code with Prettier
npm run format
```

## Contributing

### Getting Started

If you want to quickly get started, use vs code and have docker installed you can use the devcontainer to get an environment ready to go. Just run the "Reopen in Container" command from the command palette.

### Pull Requests

Use pull requests to propose and submit changes to the codebase. Ensure your changes are well-documented and tested. Pull requests will be required to be squashed and merged to keep the commit history clean.

Each commit will be prefixed to denote the type of change:

- `[FEAT]:` for new features
- `[FIX]:` for bug fixes
- `[DOCS]:` for documentation changes
- `[STYLE]:` for code style changes
- `[REFAC]:` for code refactoring
- `[TEST]:` for adding or updating tests
- `[DEV]:` for development environment changes

### Code style

Usually I would use a linter like ESLint to maintain code style consistency in line with how the organization handles code style (since it is fairly configurable to the organization's preferences). For demonstration purposes we use prettier with default settings. This gives consistent formatting, without a lot of configuration.

### Pipeline
A simple CI pipeline is set up using GitHub Actions to run tests and format checks on each pull request.
