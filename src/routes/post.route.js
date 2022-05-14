import express from 'express'
import { PostValidation } from '*/validations/post.validation'
import { PostController } from '*/controllers/post.controller'
import { verifyToken } from '*/middlewares/verifyToken'

const router = express.Router()


router.route('/')
    // @route GET api/posts
    // @desc Get posts of 1 user
    // @access Private
    .get(verifyToken, PostController.getPosts)
    // @route POST api/posts
    // @desc Create post
    // @access Private
    .post(verifyToken, PostValidation.createNew, PostController.createNew)

router.route('/:id')
    // @route PUT api/posts/:id
    // @desc update post
    // @access Private
    .put(verifyToken, PostValidation.update, PostController.update)
    // @route DELETE api/posts/:id
    // @desc Delete post
    // @access Private
    .delete(verifyToken, PostController.deletePost)

export const postRoutes = router