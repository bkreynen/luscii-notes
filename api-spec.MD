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

---

## DELETE /notes/:id

Delete a note by its ID.

### Path Parameter

| Name | Type   | Description              |
| ---- | ------ | ------------------------ |
| id   | string | Note ID (UUID, required) |

### Success Response

**Status:** 204 No Content

Body: `{}` (empty object)

### Error Responses

| Status | Condition                    | Response                               |
| ------ | ---------------------------- | -------------------------------------- |
| 400    | Invalid note ID (not a UUID) | `{ "error": "Invalid note ID." }`      |
| 404    | Note not found               | `{ "error": "Note not found." }`       |
| 500    | Internal server error        | `{ "error": "Internal server error" }` |
