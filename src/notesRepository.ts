import { Note, NotesRepository } from './types'

export class InMemoryNotesRepository implements NotesRepository {
  private notes: Note[] = []

  async saveNote(note: Note): Promise<void> {
    this.notes.push(note)
  }
}
