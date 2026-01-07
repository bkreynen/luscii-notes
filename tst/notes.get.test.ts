import { createTestApp, createErrorTestApp, TestApp } from './testUtils'

let app: TestApp

describe('GET /notes, in memory storage', () => {
  beforeEach(() => {
    app = createTestApp()
  })

  it('should return an empty array if there are no notes', async () => {
    // Act
    const response = await app.getNotes()

    // Assert
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body).toHaveLength(0)
  })

  it('should return all notes', async () => {
    // Arrange
    const notes = [{ content: 'First note' }, { content: 'Second note' }, { content: 'Third note' }]
    const createdNotes = []
    for (const note of notes) {
      const res = await app.postNote(note)
      createdNotes.push(res.body)
    }

    // Act
    const response = await app.getNotes()

    // Assert
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body).toHaveLength(notes.length)
    // All created notes should be present
    for (const created of createdNotes) {
      expect(response.body).toContainEqual(created)
    }
  })

  it('should not return deleted notes', async () => {
    // Arrange
    const res1 = await app.postNote({ content: 'to be deleted' })
    const res2 = await app.postNote({ content: 'to keep' })
    await app.deleteNote(res1.body.id)

    // Act
    const response = await app.getNotes()

    // Assert
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
    expect(response.body[0]).toEqual(res2.body)
  })
})

describe('GET /notes, internal error', () => {
  beforeEach(() => {
    app = createErrorTestApp()
  })

  it('should handle unexpected errors securely', async () => {
    // Act
    const response = await app.getNotes()

    // Assert
    expect(response.status).toBe(500)
    expect(response.body).toEqual({ error: 'Internal server error' })
  })
})
