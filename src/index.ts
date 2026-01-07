import express from 'express'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Notes API is running at http://localhost:${port}`)
})

// Only start the server if this file is run directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Notes API is running at http://localhost:${port}`)
  })
}

export default app
