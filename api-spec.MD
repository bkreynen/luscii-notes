# API Specification

## POST /notes

Create a new note.

### Request Body

```
{
	"content": "string"
}
```

### Success Response

**Status:** 201 Created

```
{
	"id": "string",         // Unique note identifier (UUID)
	"content": "string"    // The note content, max 1000 chars
}
```

### Error Responses

| Status | Condition             | Response                                         |
| ------ | --------------------- | ------------------------------------------------ |
| 400    | Content missing       | `{ "error": "Content is required." }`            |
| 400    | Content empty         | `{ "error": "Content cannot be empty." }`        |
| 400    | Content not a string  | `{ "error": "Content must be a string." }`       |
| 400    | Content too long      | `{ "error": "Content exceeds maximum length." }` |
| 500    | Internal server error | `{ "error": "Internal server error" }`           |
