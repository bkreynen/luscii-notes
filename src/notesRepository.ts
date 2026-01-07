import { Note, NotesRepository } from './types'

export class InMemoryNotesRepository implements NotesRepository {
  private notes: Note[] = []

  async saveNote(note: Note): Promise<void> {
    this.notes.push(note)
  }

  async getNote(id: string): Promise<Note | null> {
    // not efficient, but not a concern for in-memory demo repository
    const note = this.notes.find((note) => note.id === id)
    return note || null
  }

  async getNotes(): Promise<Note[]> {
    return this.notes
  }

  async deleteNote(id: string): Promise<void> {
    // not efficient, but not a concern for in-memory demo repository
    this.notes = this.notes.filter((note) => note.id !== id)
  }
}
