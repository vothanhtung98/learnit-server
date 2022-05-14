import { MongoClient } from 'mongodb'
import { env } from '*/config/enviroment'

let dbInstance = null

export const connectDB = async () => {
    try {
        const client = new MongoClient(
            `mongodb+srv://${env.DB_USERNAME}:${env.DB_PASSWORD}@mern-learnit.2oldq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true
            })

        await client.connect()

        // Assign clientDB to our DBInstance
        dbInstance = client.db(env.DB_NAME)

        console.log('Connected successfully to database server!')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

// Get Database Instance
export const getDB = () => {
    if (!dbInstance) throw new Error('Must connect to Database first!')
    return dbInstance
}
