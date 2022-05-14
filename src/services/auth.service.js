import { UserModel } from '*/models/user.model'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

const createNew = async (data) => {
    try {
        const { username, password } = data

        // Hashed password
        const hashedPassword = await argon2.hash(password)

        const createdUser = await UserModel.createNew({ username, password: hashedPassword })
        const newUser = await UserModel.findOneById(createdUser.insertedId)

        // Return access token
        const accessToken = jwt.sign(
            { userId: newUser._id },
            process.env.ACCESS_TOKEN_SECRET
        )
        return accessToken
    } catch (error) {
        throw new Error(error)
    }
}

const login = async (data) => {
    try {
        const { username, password } = data
        const user = await UserModel.findUser(username)

        // Password check
        const passwordValid = await argon2.verify(user.password, password)
        if (!passwordValid) return

        // Right password, Return access token
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET
        )
        return accessToken
    } catch (error) {
        throw new Error(error)
    }
}

const verifyUser = async (userId) => {
    try {
        const user = await UserModel.findOneById(userId)
        // delete user.password
        return user
    } catch (error) {
        throw new Error(error)
    }
}

export const AuthService = { createNew, login, verifyUser }