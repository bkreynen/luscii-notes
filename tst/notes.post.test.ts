import request from 'supertest'
import express from 'express'

const app = express()
app.use(express.json())
import { validate as uuidValidate, version as uuidVersion } from 'uuid'

describe('POST /notes', () => {

  it('should create a new note and return a valid UUID v4 id', async () => {
    const response = await request(app).post('/notes').send({ content: 'My first note' })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body.content).toBe('My first note')
    // Check that id is a valid UUID v4
    expect(uuidValidate(response.body.id)).toBe(true)
    expect(uuidVersion(response.body.id)).toBe(4)
  })

  it('should generate unique UUID v4 ids for multiple notes', async () => {
    const contents = ['Note 1', 'Note 2', 'Note 3']
    const ids: string[] = []

    for (const content of contents) {
      const response = await request(app).post('/notes').send({ content })
      expect(response.status).toBe(201)
      const id = response.body.id
      ids.push(id)
      // Validate UUID format and version
      expect(uuidValidate(id)).toBe(true)
      expect(uuidVersion(id)).toBe(4)
    }

    // Check uniqueness
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('should return 400 if content is missing', async () => {
    const response = await request(app).post('/notes').send({})
    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: 'Content is required.' })
  })

  it('should return 400 if content is empty', async () => {
    const response = await request(app).post('/notes').send({ content: '' })
    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: 'Content cannot be empty.' })
  })

  it('should return 400 if content is not a string', async () => {
    const response = await request(app).post('/notes').send({ content: 123 })
    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: 'Content must be a string.' })
  })

  it('should return 400 if content is too long', async () => {
    const longContent = 'a'.repeat(1001)
    const response = await request(app).post('/notes').send({ content: longContent })
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
