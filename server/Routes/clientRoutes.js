const express = require('express');
const clientRoute = express.Router();

const { searchCaregiver, requestAppointment, rateCaregivers } = require('../Controllers/clientControllers');

const { sessionAuthorization } = require('../middleware/sessionAuthorization');

// clientRoute.use(sessionAuthorization);

clientRoute.get('/searchcaregiver/:searchTerm', searchCaregiver);
clientRoute.post('/requestappointment', requestAppointment);
clientRoute.post('/rate/:caregiverId', rateCaregivers);

module.exports = { clientRoute };