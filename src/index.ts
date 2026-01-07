import express from 'express'
import { createNote } from './notesService'
import { validateNoteMiddleware } from './validation'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// Simple in-memory notes storage
const notes: Array<{ id: string; content: string }> = []

// POST /notes - Create a new note
app.post('/notes', validateNoteMiddleware, (req, res, next) => {
  try {
    const note = createNote(req.body.content)
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
