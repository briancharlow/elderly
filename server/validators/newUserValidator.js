const { new_user_Schema } = require("../schema/userSchema");
const { new_caregiver_Schema } = require("../schema/caregiverSchema");

function newUserValidator(body) {
    let user = new_user_Schema.validate(body, { abortEarly: false });

    if (user.error?.details.length > 0) {
        let message = user.error.details.map((err) => err.message);

        throw new Error(message.join("\n"));
    } else {
        return user;
    }
}
function newCaregiverValidator(body) {
    let caregiver = new_caregiver_Schema.validate(body, { abortEarly: false });
    if (caregiver.error?.details.length > 0) {
        let message = caregiver.error.details.map((err) => err.message);

        throw new Error(message.join("\n"));
    } else {
        return caregiver;
    }
}

module.exports = { newUserValidator, newCaregiverValidator };