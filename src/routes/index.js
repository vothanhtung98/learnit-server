import express from 'express'
import { authRoutes } from './auth.route'
import { postRoutes } from './post.route'

const router = express.Router()

// Auth APIs
router.use('/auth', authRoutes)

// Post APIs
router.use('/posts', postRoutes)

export const apis = router