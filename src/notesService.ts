import { v4 as uuidv4 } from 'uuid'

export interface Note {
  id: string
  content: string
}

const notes: Note[] = []

export function createNote(content: string): Note {
  const note = {
    id: uuidv4(),
    content,
  }
  notes.push(note)
  return note
}
