import { createApp } from '../src/index'
import { InMemoryNotesRepository } from '../src/notesRepository'
import { Express } from 'express'
import request from 'supertest'
import { NotesRepository } from '../src/types'

export type TestApp = {
  app: Express
  postNote: (payload: any) => request.Test
  deleteNote: (id: string) => request.Test
}

export function createTestApp(repo: NotesRepository = new InMemoryNotesRepository()): TestApp {
  const app = createApp(repo)
  const postNote = (payload: any) => request(app).post('/notes').send(payload)
  const deleteNote = (id: string) => request(app).delete(`/notes/${id}`)
  return { app, postNote, deleteNote }
}

export function createErrorTestApp(): TestApp {
  // A repository that always throws an error when saving a note
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
  }
  return createTestApp(errorRepo)
}
