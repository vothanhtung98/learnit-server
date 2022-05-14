import Joi from 'joi'

const createNew = async (req, res, next) => {
    const conditions = Joi.object({
        title: Joi.string().required().min(3).max(20).trim()
    })

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
}

const update = async (req, res, next) => {
    const conditions = Joi.object({
        title: Joi.string().required().min(3).max(20).trim(),
        status: Joi.string().valid('TO LEARN', 'LEARNING', 'LEARNED').default('TO LEARN')
    })

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
}

export const PostValidation = { createNew, update }