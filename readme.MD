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
```

## Contributing

### Pull Requests
Use pull requests to propose and submit changes to the codebase. Ensure your changes are well-documented and tested. Squash commits when merging to keep the history clean.

Each commit will be prefixed to denote the type of change:
- `[FEAT]:` for new features
- `[FIX]:` for bug fixes
- `[DOCS]:` for documentation changes
- `[STYLE]:` for code style changes
- `[REFAC]:` for code refactoring
- `[TEST]:` for adding or updating tests

### Code style
Usually I would use a linter like ESLint to maintain code style consistency in line with how the organization handles code style (since it is fairly configurable to the organization's preferences). For demonstration purposes we use prettier with default settings. This gives consistent formatting, without a lot of configuration.

