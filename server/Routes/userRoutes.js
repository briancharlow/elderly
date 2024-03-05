const express = require('express');
const Route = express.Router();

const { registerUser, createCaregiver, loginUser, getLoggedInUser, logoutUser, getCaregiver, getCaregivers } = require('../Controllers/userControllers');
const { newUserMiddleware, newCaregiverMiddleware } = require('../middleware/newUserMiddleware');
const { sessionAuthorization } = require('../middleware/sessionAuthorization');



Route.get('/', (req, res) => {
    res.send('user route')
})

Route.post('/register', newUserMiddleware, registerUser);
Route.post('/createcaregiver', newCaregiverMiddleware, createCaregiver);
Route.post('/login', loginUser)
Route.get("/user", sessionAuthorization, getLoggedInUser)
Route.get("/logout", logoutUser)
Route.get('/getcaregivers', getCaregivers);
Route.get('/caregiver/:id', sessionAuthorization, getCaregiver);




module.exports = { Route };