import { createApp } from '../src/index'
import { inMemoryNotesRepository } from '../src/notesRepository'
import request from 'supertest'
import { validate as uuidValidate, version as uuidVersion } from 'uuid'

let app = createApp(inMemoryNotesRepository)
const postNote = (payload: any) => request(app).post('/notes').send(payload)

describe('POST /notes', () => {
  it('should create a new note and return a valid response', async () => {
    // Arrange
    const noteContent = 'My first note'

    // Act
    const response = await postNote({ content: noteContent })

    // Assert: Valid response structure and content
    expect(response.status).toBe(201)
    expect(Object.keys(response.body).sort()).toEqual(['content', 'id'])
    expect(response.body).toHaveProperty('id')
    expect(uuidValidate(response.body.id)).toBe(true)
    expect(uuidVersion(response.body.id)).toBe(4)
    expect(response.body.content).toBe(noteContent)
  })

  it('should generate unique UUID v4 ids for multiple notes', async () => {
    // Arrange
    const contents = ['Note 1', 'Note 2', 'Note 3']
    const ids: string[] = []

    // Act & Assert: Every note should have valid UUID v4 id.
    for (const content of contents) {
      // Act
      const response = await postNote({ content })
      ids.push(response.body.id)

      // Assert
      expect(response.status).toBe(201)
      expect(uuidValidate(response.body.id)).toBe(true)
      expect(uuidVersion(response.body.id)).toBe(4)
    }

    // Assert: All ids should be unique.
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('should return 400 if content is missing', async () => {
    // Arrange
    const payload = {}

    // Act
    const response = await postNote(payload)

    // Assert
    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: 'Content is required.' })
  })

  it('should return 400 if content is empty', async () => {
    // Arrange
    const payload = { content: '' }

    // Act
    const response = await postNote(payload)

    // Assert
    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: 'Content cannot be empty.' })
  })

  it('should return 400 if content is not a string', async () => {
    // Arrange
    const payload = { content: 123 }

    // Act
    const response = await postNote(payload)

    // Assert
    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: 'Content must be a string.' })
  })

  it('should return 400 if content is too long', async () => {
    // Arrange
    const longContent = 'a'.repeat(1001)
    const payload = { content: longContent }

    // Act
    const response = await postNote(payload)

    // Assert
    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: 'Content exceeds maximum length.' })
  })

  it('should handle unexpected errors securely', async () => {
    // Arrange: Custom repo that throws error on saveNote
    const errorRepo = {
      saveNote: () => {
        throw new Error('Simulated error')
      },
    }
    app = createApp(errorRepo)

    // Act
    const response = await request(app).post('/notes').send({ content: 'test' })

    // Assert
    expect(response.status).toBe(500)
    expect(response.body).toEqual({ error: 'Internal server error' })
  })
})
