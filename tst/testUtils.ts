import { createApp } from '../src/index'
import { inMemoryNotesRepository } from '../src/notesRepository'
import { Express } from 'express'
import request from 'supertest'
import { NotesRepository } from '../src/types'

export type TestApp = {
  app: Express
  postNote: (payload: any) => request.Test
}

export function createTestApp(repo = inMemoryNotesRepository): TestApp {
  const app = createApp(repo)
  const postNote = (payload: any) => request(app).post('/notes').send(payload)
  return { app, postNote }
}

export function createErrorTestApp(): TestApp {
  // A repository that always throws an error when saving a note
  const errorRepo: NotesRepository = {
    saveNote() {
      throw new Error('Simulated repository error')
    },
  }
  return createTestApp(errorRepo)
}
