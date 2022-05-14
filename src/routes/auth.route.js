import express from 'express'
import { AuthValidation } from '*/validations/auth.validation'
import { AuthController } from '*/controllers/auth.controller'
import { verifyToken } from '*/middlewares/verifyToken'

const router = express.Router()

// @Route POST api/register
// @Desc Register user
// @Access Public
router.post('/register', AuthValidation.createNew, AuthController.createNew)

// @Route POST api/login
// @Desc Login user
// @Access Public
router.post('/login', AuthValidation.login, AuthController.login)

// @Route GET api/auth
// @Desc Check if user is logged in or not
// @Access Public
router.get('/', verifyToken, AuthController.verifyUser)

export const authRoutes = router