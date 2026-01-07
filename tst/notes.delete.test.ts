import { createTestApp, createErrorTestApp, TestApp } from './testUtils'

let app: TestApp

beforeEach(() => {
  app = createTestApp()
})

describe('DELETE /notes/:id, in memory storage', () => {
  it('should return 400 for invalid UUID', async () => {
    // Arrange
    const invalidId = 'not-a-uuid'

    // Act
    const response = await app.deleteNote(invalidId)

    // Assert
    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: 'Invalid note ID.' })
  })

  it('should return 404 for non-existent note', async () => {
    // Arrange
    const validId = 'd290f1ee-6c54-4b01-90e6-d701748f0851'

    // Act
    const response = await app.deleteNote(validId)

    // Assert
    expect(response.status).toBe(404)
    expect(response.body).toEqual({ error: 'Note not found.' })
  })

  it('should delete an existing note and return 204', async () => {
    // Arrange
    const postResponse = await app.postNote({ content: 'to be deleted' })
    const noteId = postResponse.body.id

    // Act
    const deleteResponse = await app.deleteNote(noteId)

    // Assert
    expect(deleteResponse.status).toBe(204)
    expect(deleteResponse.body).toEqual({})
  })

  it('should return 404 when deleting a note that was already deleted', async () => {
    // Arrange
    const postResponse = await app.postNote({ content: 'to be deleted twice' })
    const noteId = postResponse.body.id

    // Act
    const firstDeleteResponse = await app.deleteNote(noteId)
    const secondDeleteResponse = await app.deleteNote(noteId)

    // Assert
    expect(firstDeleteResponse.status).toBe(204)
    expect(secondDeleteResponse.status).toBe(404)
    expect(secondDeleteResponse.body).toEqual({ error: 'Note not found.' })
  })
})

describe('DELETE /notes, internal error', () => {
  beforeEach(() => {
    app = createErrorTestApp()
  })

  it('should handle unexpected errors securely', async () => {
    // Arrange
    const validId = 'd290f1ee-6c54-4b01-90e6-d701748f0851'

    // Act
    const response = await app.deleteNote(validId)
    // Assert
    expect(response.status).toBe(500)
    expect(response.body).toEqual({ error: 'Internal server error' })
  })
})
