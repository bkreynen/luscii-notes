import { Note, NotesRepository } from './types'

let notes: Note[] = []

export const inMemoryNotesRepository: NotesRepository = {
  saveNote(note: Note) {
    notes.push(note)
  },
}
