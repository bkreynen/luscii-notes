import { NotesApi } from '../src/index'
import { InMemoryNotesRepository } from '../src/notesRepository'
import { Express } from 'express'
import request from 'supertest'
import { NotesRepository } from '../src/types'

export type TestApp = {
  app: Express
  postNote: (payload: any) => request.Test
  deleteNote: (id: string) => request.Test
  getNotes: () => request.Test
}

// Create a test app with optional custom repository
export function createTestApp(repo: NotesRepository = new InMemoryNotesRepository()): TestApp {
  const notesApi = new NotesApi(repo)
  const app = notesApi.app
  const postNote = (payload: any) => request(app).post('/notes').send(payload)
  const deleteNote = (id: string) => request(app).delete(`/notes/${id}`)
  const getNotes = () => request(app).get('/notes')
  return { app, postNote, deleteNote, getNotes }
}

// Create a test app with a repository that simulates errors
export function createErrorTestApp(): TestApp {
  // A repository that always throws an error
  const errorRepo: NotesRepository = {
    async saveNote() {
      return Promise.reject(new Error('Simulated repository error'))
    },
    async deleteNote(id: string) {
      return Promise.reject(new Error('Simulated repository error'))
    },
    async getNote(id: string) {
      return Promise.reject(new Error('Simulated repository error'))
    },
    async getNotes() {
      return Promise.reject(new Error('Simulated repository error'))
    },
  }

  return createTestApp(errorRepo)
}
