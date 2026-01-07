export interface NotesService {
  createNote(content: string): Note
}
export interface NotesRepository {
  saveNote(note: Note): void
  clear(): void
}

export interface Note {
  id: string
  content: string
}
