import request from 'supertest'
import express from 'express'


const app = express()
app.use(express.json())

describe('Notes API', () => {
  it('should create a new note', async () => {
    const response = await request(app)
      .post('/notes')
      .send({ content: 'My first note' })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body.content).toBe('My first note')
  })

  it('should return all notes', async () => {
    const response = await request(app).get('/notes')
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })
})
