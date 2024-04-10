
const { newCaregiverValidator } = require('../validators/newUserValidator');

const { newUserValidator } = require('../validators/newUserValidator');
function newUserMiddleware(req, res, next) {
    let user = req.body;
    try {
        let { value } = newUserValidator(user);

        req.value = value;

        next();
    } catch (error) {
        next({
            status: 400,
            message: error.message
        });

    }

}
function newCaregiverMiddleware(req, res, next) {
    let caregiver = req.body;
    try {
        let { value } = newCaregiverValidator(caregiver);

        req.value = value;

        next();
    } catch (error) {
        next({
            status: 400,
            message: error.message
        });

    }

}
module.exports = { newUserMiddleware, newCaregiverMiddleware };