import Joi from 'joi'
import { getDB } from '*/config/mongodb'
import { ObjectId } from 'mongodb'

// Define Users collection
export const userCollectionName = 'users'
const userCollectionSchema = Joi.object({
    username: Joi.string().alphanum().required().min(3).max(20).trim(),
    password: Joi.string().required(),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null)
})

const validateSchema = async (data) => {
    return await userCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
    try {
        const value = await validateSchema(data)
        const result = await getDB().collection(userCollectionName).insertOne(value)
        return result
    } catch (error) {
        console.log(error)
    }
}

const findOneById = async (id) => {
    try {
        const result = await getDB().collection(userCollectionName).findOne({ _id: ObjectId(id) }, { projection: { password: 0 } })
        return result
    } catch (err) {
        throw new Error(err)
    }
}

const findUser = async (username) => {
    try {
        const result = await getDB().collection(userCollectionName).findOne({ username })
        return result
    } catch (err) {
        throw new Error(err)
    }
}

export const UserModel = {
    createNew,
    findOneById,
    findUser,
    userCollectionName
}