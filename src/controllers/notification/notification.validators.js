import Joi from 'joi';

export default {
    createNotification: {
        body: {
            title: Joi.string().required(),
            body: Joi.string().required(),
            description: Joi.string(),
            url: Joi.string(),
            websites: Joi.array()
        }
    },
    updateNotification: {
        body: {
            id: Joi.string().required(),
            title: Joi.string().required(),
            body: Joi.string().required(),
            description: Joi.string(),
            url: Joi.string(),
            websites: Joi.array()
        }
    }
};
