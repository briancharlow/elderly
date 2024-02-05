const joi = require("joi");

const new_caregiver_Schema = joi
    .object({
        certification_id: joi.string().min(4).required(),
        fullname: joi.string().min(4).required(),
        // ProfilePicture: joi.string().min(5).max(30),
        email: joi
            .string()
            .email({ tlds: { allow: false } }),
        password: joi
            .string()
            .required()
            .pattern(new RegExp(
                "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
            )),
        c_password: joi.ref("password"),
        phone: joi.string().min(10).max(10).required(),
        location: joi.string().min(4).required(),
        description: joi.string().min(4).required(),


    })
    .with("password", "c_password");


module.exports = { new_caregiver_Schema }