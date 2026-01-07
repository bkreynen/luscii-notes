import express from 'express'
import { createNote } from './notesService'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// Simple in-memory notes storage
const notes: Array<{ id: string; content: string }> = []

// POST /notes - Create a new note
app.post('/notes', (req, res, next) => {
  try {
    const { content } = req.body

    if (content === undefined) {
      return res.status(400).json({ error: 'Content is required.' })
    }
    if (typeof content !== 'string') {
      return res.status(400).json({ error: 'Content must be a string.' })
    }
    if (content.trim() === '') {
      return res.status(400).json({ error: 'Content cannot be empty.' })
    }
    if (content.length > 1000) {
      return res.status(400).json({ error: 'Content exceeds maximum length.' })
    }

    const note = createNote(content)
    return res.status(201).json(note)
  } catch (err) {
    next(err)
  }
})

// Error handler for secure error responses
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).json({ error: 'Internal server error' })
})

// Only start the server if this file is run directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Notes API is running at http://localhost:${port}`)
  })
}

export default app
