import express from 'express'
import {config} from 'dotenv'
import userRouter from './routes/user.js'
import taskRouter from './routes/task.js'
import cookieParser from 'cookie-parser'
import { errorMiddleware } from './middleweares/error.js'
import cors from 'cors'

config({
  path: './data/config.env'
})

// Initialize the app
export const app = express()

// Use middlewares
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
)

//Using routes
app.use('/api/v1/users', userRouter)
app.use('/api/v1/task', taskRouter)

// Routes
app.get('/', (req, res) => {
  res.send('hello')
})

//using error middleware
app.use(errorMiddleware)
