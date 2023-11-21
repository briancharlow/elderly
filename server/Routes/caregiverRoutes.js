const express = require('express');
const caregiverRoute = express.Router();

const { getCaregivers, updateProfile, getAppointments, createAppointment, deleteAccount, getCaregiver } = require('../Controllers/caregiverControllers');

const { sessionAuthorization } = require('../middleware/sessionAuthorization');


caregiverRoute.use(sessionAuthorization);
caregiverRoute.get('/getcaregivers', getCaregivers);
caregiverRoute.get('/getappointments', getAppointments);
caregiverRoute.post('/createappointment', createAppointment);
caregiverRoute.put('/updateprofile', updateProfile);
caregiverRoute.delete('/deleteAccount', deleteAccount);
caregiverRoute.get('/caregiver/:id', getCaregiver);



module.exports = { caregiverRoute };