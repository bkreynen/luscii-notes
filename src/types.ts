export interface NotesService {
  createNote(content: string): Promise<Note>
}

export interface NotesRepository {
  saveNote(note: Note): Promise<void>
}

export interface Note {
  id: string
  content: string
}
