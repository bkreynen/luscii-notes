import { Note, NotesRepository } from './types'

let notes: Note[] = []

export const inMemoryNotesRepository: NotesRepository = {
  async saveNote(note: Note) {
    notes.push(note)
  },

  async clear() {
    notes = []
  },
}
