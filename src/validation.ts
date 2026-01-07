import { Request, Response, NextFunction } from 'express'
export function validateNoteContent(content: any): string | null {
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
