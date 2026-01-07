import request from 'supertest'
import express from 'express'

const app = express()
app.use(express.json())

describe('POST /notes', () => {
  it('should create a new note', async () => {
    const response = await request(app).post('/notes').send({ content: 'My first note' })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body.content).toBe('My first note')
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
