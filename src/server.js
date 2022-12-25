import express from 'express'
import cors from 'cors'
import { connectDB } from '*/config/mongodb'
import { apis } from '*/routes'

connectDB()

const app = express()
const PORT = process.env.PORT || 5000

var whitelist = ['https://localhost:3000', 'http://localhost:3000', 'https://learnit-vothanhtung.web.app']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions))

app.use(express.json())

app.use('/api', apis)

app.listen(PORT, () => {
    console.log(`Hello, i'm running at port: ${PORT}`)
})

