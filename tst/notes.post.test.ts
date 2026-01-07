import request from 'supertest'
import express from 'express'

import { validate as uuidValidate, version as uuidVersion } from 'uuid'

const postNote = (payload: any) => request(app).post('/notes').send(payload)

const app = express()
app.use(express.json())

describe('POST /notes', () => {

  it('should create a new note and return a valid UUID v4 id', async () => {
    // Arrange
    const noteContent = 'My first note'

    // Act
    const response = await postNote({ content: noteContent })

    // Assert
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body.content).toBe(noteContent)
    expect(uuidValidate(response.body.id)).toBe(true)
    expect(uuidVersion(response.body.id)).toBe(4)
  })

  it('should generate unique UUID v4 ids for multiple notes', async () => {
    // Arrange
    const contents = ['Note 1', 'Note 2', 'Note 3']
    const ids: string[] = []

    // Act & Assert (per note). Every note should have valid UUID v4 id.
    for (const content of contents) {
      const response = await postNote({ content })
      ids.push(response.body.id)
      expect(response.status).toBe(201)
      expect(uuidValidate(response.body.id)).toBe(true)
      expect(uuidVersion(response.body.id)).toBe(4)
    }

    // Assert (all notes). All ids should be unique.
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
})

// Add tests when implementing GET /notes
// describe('GET /notes', () => {
//   it('should return all notes', async () => {
//     const response = await request(app).get('/notes')
//     expect(response.status).toBe(200)
//     expect(Array.isArray(response.body)).toBe(true)
//   })
// })
