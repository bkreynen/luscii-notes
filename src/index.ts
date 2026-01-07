import express from 'express'
import { NotesServiceImpl } from './notesService'
import { InMemoryNotesRepository } from './notesRepository'
import { validateNoteMiddleware, cleanNoteMiddleware } from './middleware'
import { NotesRepository } from './types'
import { Express } from 'express'

export function createApp(repo: NotesRepository = new InMemoryNotesRepository()): Express {
  const app = express()
  app.use(express.json())
  const notesService = new NotesServiceImpl(repo)

  app.post('/notes', cleanNoteMiddleware, validateNoteMiddleware, async (req, res, next) => {
    try {
      const note = await notesService.createNote(req.body.content)
      return res.status(201).json(note)
    } catch (err) {
      next(err)
    }
  })

  // Error handler for secure error responses
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(500).json({ error: 'Internal server error' })
  })

  return app
}

// Only start the server if this file is run directly
const port = process.env.PORT || 3000
if (require.main === module) {
  const app = createApp()
  app.listen(port, () => {
    console.log(`Notes API is running at http://localhost:${port}`)
  })
}
