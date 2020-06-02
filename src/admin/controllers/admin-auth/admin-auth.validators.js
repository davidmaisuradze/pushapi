import Joi from 'joi';

export default {
    loginAdmin: {
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    },
    registerAdmin: {
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required()
        }
    }
}
