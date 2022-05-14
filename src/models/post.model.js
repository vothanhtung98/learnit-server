import Joi from 'joi'
import { getDB } from '*/config/mongodb'
import { ObjectId } from 'mongodb'

// Define Posts collection
export const postCollectionName = 'posts'
const postCollectionSchema = Joi.object({
    user: Joi.string().required(),
    title: Joi.string().required().min(3).max(20).trim(),
    description: Joi.string().allow(''),
    url: Joi.string().allow(''),
    status: Joi.string().valid('TO LEARN', 'LEARNING', 'LEARNED').default('TO LEARN'),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null)
})

const validateSchema = async (data) => {
    return await postCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
    try {
        const validatedData = await validateSchema(data)
        const value = {
            ...validatedData,
            user: ObjectId(validatedData.user)
        }
        const result = await getDB().collection(postCollectionName).insertOne(value)
        return result
    } catch (error) {
        console.log(error)
    }
}

const getPosts = async (user) => {
    try {
        const result = await getDB().collection(postCollectionName).find({ user: ObjectId(user) }, { projection: { user: 0 } }).toArray()
        return result || []
    } catch (error) {
        throw new Error(error)
    }
}

const findOneById = async (id) => {
    try {
        const result = await getDB().collection(postCollectionName).findOne({ _id: ObjectId(id) })
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const findPost = async (title) => {
    try {
        const result = await getDB().collection(postCollectionName).findOne({ title })
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (userId, postId, data) => {
    try {
        const result = await getDB().collection(postCollectionName).findOneAndUpdate(
            { _id: ObjectId(postId), user: ObjectId(userId) },
            { $set: data },
            { returnDocument: 'after' }
        )
        return result.value
    } catch (error) {
        throw new Error(error)
    }
}

const deletePost = async (postId, userId) => {
    try {
        const result = await getDB().collection(postCollectionName).findOneAndDelete({
            _id: ObjectId(postId),
            user: ObjectId(userId)
        })
        return result.value
    } catch (error) {
        throw new Error(error)
    }
}

export const PostModel = {
    createNew,
    getPosts,
    findOneById,
    findPost,
    update,
    deletePost,
    postCollectionName
}