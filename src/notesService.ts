import { Note, NotesRepository, NotesService } from './types'
import { v4 as uuidv4 } from 'uuid'

export function createNotesService(repo: NotesRepository): NotesService {
  return {
    createNote(content: string): Note {
      const note: Note = {
        id: uuidv4(),
        content,
      }
      repo.saveNote(note)
      return note
    },
  }
}
