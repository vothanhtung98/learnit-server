import Joi from 'joi'
import { getDB } from '*/config/mongodb'
import { UserModel } from '*/models/user.model'

const createNew = async (req, res, next) => {
    const usernameInDB = await getDB().collection(UserModel.userCollectionName).findOne({ username: req.body.username })
    const conditions = Joi.object({
        username: Joi.string().alphanum().required().min(3).max(20).trim(),
        password: Joi.string().required().min(8).trim()
    })

    // Check if user already existed
    if (!usernameInDB) {
        try {
            await conditions.validateAsync(
                req.body,
                {
                    abortEarly: false,
                    allowUnknown: true
                }
            )

            next()
        } catch (error) {
            res.status(400).json({ success: false, message: error.message })
        }
    } else {
        res.status(400).json({ success: false, message: 'username is already taken.' })
    }
}

const login = async (req, res, next) => {
    const usernameInDB = await getDB().collection(UserModel.userCollectionName).findOne({ username: req.body.username })
    const conditions = Joi.object({
        username: Joi.string().alphanum().required().min(3).max(20).trim(),
        password: Joi.string().required().min(8).trim()
    })
    if (usernameInDB) {
        try {
            await conditions.validateAsync(
                req.body,
                {
                    abortEarly: false,
                    allowUnknown: true
                }
            )

            next()
        } catch (error) {
            return res.status(400).json({ success: false, message: error.message })
        }
    } else {
        return res.status(400).json({ success: false, message: 'Incorrect username or password' })
    }
}

export const AuthValidation = { createNew, login }