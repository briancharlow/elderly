const express = require('express');
const caregiverRoute = express.Router();

const { updateProfile, getAppointments, approveAppointment, deleteAccount } = require('../Controllers/caregiverControllers');

const { sessionAuthorization } = require('../middleware/sessionAuthorization');



caregiverRoute.use(sessionAuthorization);

caregiverRoute.get('/getappointments', getAppointments);
caregiverRoute.post('/acceptappointment/:appointmentId', approveAppointment);
caregiverRoute.put('/updateprofile', updateProfile);
caregiverRoute.delete('/deleteAccount', deleteAccount);




module.exports = { caregiverRoute };