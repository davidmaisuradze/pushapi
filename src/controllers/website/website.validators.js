import Joi from 'joi';

export default {
    createWebsite: {
        body: {
            url: Joi.string().required(),
            name: Joi.string(),
            subscribeAutomatically: Joi.boolean()
        }
    },
    updateWebsite: {
        body: {
            id: Joi.string().required(),
            url: Joi.string().required(),
            name: Joi.string(),
            subscribeAutomatically: Joi.boolean()
        }
    }
};
