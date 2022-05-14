import { AuthService } from '*/services/auth.service'

const createNew = async (req, res) => {
    try {
        const accessToken = await AuthService.createNew(req.body)
        return res.status(200).json({
            success: true,
            message: 'User created successfully',
            accessToken
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

const login = async (req, res) => {
    try {
        const accessToken = await AuthService.login(req.body)
        if (!accessToken) return res.status(400).json({ success: false, message: 'Incorrect username or password' })
        return res.status(200).json({
            success: true,
            message: 'Login successfully',
            accessToken
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

const verifyUser = async (req, res) => {
    try {
        const user = await AuthService.verifyUser(req.userId)
        if (!user) return res.status(400).json({ success: false, message: 'User not found' })
        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export const AuthController = { createNew, login, verifyUser }