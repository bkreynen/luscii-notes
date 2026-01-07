import { Note, NotesRepository, NotesService } from './types'
import { v4 as uuidv4 } from 'uuid'

export class NotesServiceImpl implements NotesService {
  constructor(private repo: NotesRepository) {}

  async createNote(content: string): Promise<Note> {
    const note: Note = {
      id: uuidv4(),
      content,
    }
    await this.repo.saveNote(note)
    return note
  }

  async deleteNote(id: string): Promise<void> {
    // Get the note to ensure it exists
    const note = await this.repo.getNote(id)
    if (!note) {
      throw new Error('Note not found')
    }
    await this.repo.deleteNote(id)
  }
}
