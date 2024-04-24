import { Express, Request } from 'express';
import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors'
import cardsRouter from './controllers/cards'
import { PORT, MONGODB_URI } from './config'

const app: Express = express()

app.use(cors<Request>())
app.use(express.json())

app.use('/cards', cardsRouter)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})