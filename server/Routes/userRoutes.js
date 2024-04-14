const express = require('express');
const Route = express.Router();

const { registerUser, createCaregiver, loginUser, getLoggedInUser, logoutUser, getCaregiver, getCaregivers, getSession } = require('../Controllers/userControllers');
const { newUserMiddleware, newCaregiverMiddleware } = require('../middleware/newUserMiddleware');
const { sessionAuthorization } = require('../middleware/sessionAuthorization');



// Route.get('/', (req, res) => {
//     res.send('user route')
// })

Route.post('/register', registerUser);
Route.post('/createcaregiver', createCaregiver);
Route.post('/login', loginUser)
Route.get("/user", sessionAuthorization, getLoggedInUser)
Route.get("/logout", sessionAuthorization, logoutUser)
Route.get('/getcaregivers', sessionAuthorization, getCaregivers);
Route.get('/caregiver/:id', sessionAuthorization, getCaregiver);
Route.get('/getsession', sessionAuthorization, getSession);



module.exports = { Route };