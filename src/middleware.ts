import { Request, Response, NextFunction } from 'express'
import { validate as uuidValidate, version as uuidVersion } from 'uuid'

// --- Error Handling Middleware ---
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err.message === 'Note not found') {
    return res.status(404).json({ error: 'Note not found.' })
  }
  return res.status(500).json({ error: 'Internal server error' })
}

// --- Cleaning logic ---
function cleanNoteContent(content: string): string {
  return content.trim()
}

export function cleanNoteMiddleware(req: Request, res: Response, next: NextFunction) {
  if (typeof req.body.content === 'string') {
    req.body.content = cleanNoteContent(req.body.content)
  }
  next()
}

// --- Validation logic ---
function validateNoteContent(content: any): string | null {
  if (content === undefined) {
    return 'Content is required.'
  }
  if (typeof content !== 'string') {
    return 'Content must be a string.'
  }
  const trimmedContent = content.trim()
  if (trimmedContent === '') {
    return 'Content cannot be empty.'
  }
  if (trimmedContent.length > 1000) {
    return 'Content exceeds maximum length.'
  }
  return null
}

export function validateNoteMiddleware(req: Request, res: Response, next: NextFunction) {
  const error = validateNoteContent(req.body.content)
  if (error) {
    return res.status(400).json({ error })
  }
  next()
}

export function validateNoteIdMiddleware(req: Request, res: Response, next: NextFunction) {
  const noteId = req.params.id
  if (!uuidValidate(noteId) || uuidVersion(noteId) !== 4) {
    return res.status(400).json({ error: 'Invalid note ID.' })
  }
  next()
}
