const express = require('express');
const clientRoute = express.Router();

const { searchCaregiver } = require('../Controllers/clientControllers');

const { sessionAuthorization } = require('../middleware/sessionAuthorization');

clientRoute.use(sessionAuthorization);

clientRoute.get('/searchcaregiver/:searchTerm', searchCaregiver);

module.exports = { clientRoute };