import { PostService } from '*/services/post.service'

const createNew = async (req, res) => {
    try {
        const data = { ...req.body, user: req.userId }
        const newPost = await PostService.createNew(data)
        return res.status(200).json({
            success: true,
            message: 'Happy learning',
            newPost
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

const getPosts = async (req, res) => {
    try {
        const posts = await PostService.getPosts(req.userId)
        return res.status(200).json({
            success: true,
            message: 'Get posts successfully',
            posts
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

const update = async (req, res) => {
    try {
        const data = { ...req.body, user: req.userId, _id: req.params.id }
        const updatedPost = await PostService.update(data)

        if (!updatedPost) return res.status(401).json({ success: false, message: 'Post not found or user not authorised' })
        return res.status(200).json({
            success: true,
            message: 'Keep going!',
            updatedPost
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

const deletePost = async (req, res) => {
    try {
        const deletedPost = await PostService.deletePost({ _id: req.params.id, user: req.userId })

        if (!deletedPost) return res.status(401).json({ success: false, message: 'Post not found or user not authorised' })

        return res.status(200).json({
            success: true,
            message: 'Post deleted successfully',
            deletedPost
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export const PostController = { createNew, getPosts, update, deletePost }