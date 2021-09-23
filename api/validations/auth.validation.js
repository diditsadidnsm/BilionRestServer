const Joi = require('joi');
module.exports = {

    login: {
        body: Joi.object({
            username: Joi.string().alphanum().trim().required().max(128),
            password: Joi.string().alphanum().trim().required().max(15),
        }),
    },

    register: {
        body: Joi.object({
            username: Joi.string().alphanum().trim().required().max(25),
            email: Joi.string().trim().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).trim().required().min(6).max(15),
            confirmPassword: Joi.ref('password'),
        }),
    },

    refresh: {
        body: Joi.object({
            email: Joi.string()
                .email()
                .required(),
            refreshToken: Joi.string().required(),
        }),
    },

    sendPasswordReset: {
        body: Joi.object({email: Joi.string()
                .email()
                .required(),
        }),
    },

    passwordReset: {
        body: Joi.object({
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string()
                .required()
                .min(6)
                .max(128),
            resetToken: Joi.string().required(),
        }),
    },
};