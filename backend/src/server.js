import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import placeholdersRouter from './routes/placeholders.js'
import inventoryRouter from './routes/inventory.js'
import './firebase.js'

dotenv.config()

const app = express()
const port = Number(process.env.PORT || 5000)

app.use(cors())
app.use(express.json({ limit: '1mb' }))

app.get('/health', (req, res) => {
  res.json({
    ok: true,
    service: 'meditrack2-backend',
    timestamp: new Date().toISOString(),
  })
})

app.use('/api', placeholdersRouter)
app.use('/api/inventory', inventoryRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    // Keep startup logs simple for local debug.
    console.log(`MediTrack backend listening on http://localhost:${port}`)
  })
}

export default app