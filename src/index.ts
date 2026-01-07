import express from 'express'
import { NotesServiceImpl } from './notesService'
import { InMemoryNotesRepository } from './notesRepository'
import {
  validateNoteMiddleware,
  validateNoteIdMiddleware,
  cleanNoteMiddleware,
  errorHandler,
} from './middleware'
import { NotesRepository } from './types'

// Notes API Class
export class NotesApi {
  public app: express.Express
  private notesService: NotesServiceImpl

  constructor(repo: NotesRepository = new InMemoryNotesRepository()) {
    this.app = express()
    this.app.use(express.json())
    this.notesService = new NotesServiceImpl(repo)

    // POST /notes: Create a note
    this.app.post('/notes', cleanNoteMiddleware, validateNoteMiddleware, this.createNoteHandler)

    // DELETE /notes/:id: Delete a note by ID
    this.app.delete('/notes/:id', validateNoteIdMiddleware, this.deleteNoteHandler)

    // General error handling middleware, will run after all other middlewares
    this.app.use(errorHandler)
  }

  private createNoteHandler = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const note = await this.notesService.createNote(req.body.content)
      return res.status(201).json(note)
    } catch (err) {
      next(err)
    }
  }

  private deleteNoteHandler = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const noteId = req.params.id
      await this.notesService.deleteNote(noteId)
      return res.status(204).json({})
    } catch (err) {
      next(err)
    }
  }
}

// Server Startup (only if run directly)
const port = process.env.PORT || 3000
if (require.main === module) {
  const api = new NotesApi()
  api.app.listen(port, () => {
    console.log(`Notes API is running at http://localhost:${port}`)
  })
}
