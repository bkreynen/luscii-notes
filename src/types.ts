export interface NotesService {
  createNote(content: string): Promise<Note>
}

export interface NotesRepository {
  saveNote(note: Note): Promise<void>
  deleteNote(id: string): Promise<void>
  getNote(id: string): Promise<Note | null>
  getNotes(): Promise<Note[]>
}

export interface Note {
  id: string
  content: string
}
