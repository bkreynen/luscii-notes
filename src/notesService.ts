import { Note, NotesRepository, NotesService } from './types'
import { v4 as uuidv4 } from 'uuid'

export function createNotesService(repo: NotesRepository): NotesService {
  return {
    async createNote(content: string): Promise<Note> {
      const note: Note = {
        id: uuidv4(),
        content,
      }
      await repo.saveNote(note)
      return note
    },
  }
}
