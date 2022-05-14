import { PostModel } from '*/models/post.model'

const createNew = async (data) => {
    try {
        let { user, title, description, url, status } = data

        if (url) {
            url = url.startsWith('https://') ? url : `https://${url}`
        }

        const createdPost = await PostModel.createNew({
            user,
            title,
            description,
            url,
            status
        })
        const newPost = await PostModel.findOneById(createdPost.insertedId)

        return newPost
    } catch (error) {
        throw new Error(error)
    }
}

const getPosts = async (userId) => {
    try {
        const posts = await PostModel.getPosts(userId)
        return posts
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (data) => {
    try {
        let { title, description, url, status, user, _id } = data

        if (url) {
            url = url.startsWith('https://') ? url : `https://${url}`
        }

        let updateData = {
            title,
            description: description || '',
            url,
            status: status || 'TO LEARN',
            updatedAt: Date.now()
        }
        const result = await PostModel.update(user, _id, updateData)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const deletePost = async (deleteConditions) => {
    try {
        const { _id, user } = deleteConditions
        const result = await PostModel.deletePost(_id, user)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

export const PostService = { createNew, getPosts, update, deletePost }