export interface NotesService {
  createNote(content: string): Note
}

export interface NotesRepository {
  saveNote(note: Note): Promise<void>
  clear(): Promise<void>
}

export interface Note {
  id: string
  content: string
}
