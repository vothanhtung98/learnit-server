import express from 'express'
import cors from 'cors'
import { connectDB } from '*/config/mongodb'
import { apis } from '*/routes'

connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())

app.use(express.json())

app.use('/api', apis)

app.listen(PORT, () => {
    console.log(`Hello, i'm running at port: ${PORT}`)
})

