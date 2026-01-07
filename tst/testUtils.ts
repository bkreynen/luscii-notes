import { createApp } from '../src/index'
import { inMemoryNotesRepository } from '../src/notesRepository'
import { Express } from 'express'
import request from 'supertest'
import { NotesRepository } from '../src/types'

export type TestApp = {
  app: Express
  postNote: (payload: any) => request.Test
  clearNotes: () => Promise<void>
}

export function createTestApp(repo: NotesRepository = inMemoryNotesRepository): TestApp {
  const notesRepo = repo
  const app = createApp(notesRepo)
  const postNote = (payload: any) => request(app).post('/notes').send(payload)
  const clearNotes = async () => {
    await notesRepo.clear()
  }

  return { app, postNote, clearNotes }
}

export function createErrorTestApp(): TestApp {
  // A repository that always throws an error when saving a note
  const errorRepo: NotesRepository = {
    saveNote() {
      return Promise.reject(new Error('Simulated repository error'))
    },

    clear() {
      return Promise.resolve()
    },
  }
  return createTestApp(errorRepo)
}
