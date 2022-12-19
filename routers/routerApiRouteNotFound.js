import express from 'express';

import { controllerRouteNotFound } from '../controllers/controllerApiRouteNotFound.js';

const routerApiRouteNotFound = express.Router();

//router cart
routerApiRouteNotFound.all('/', controllerRouteNotFound)

export default routerApiRouteNotFound;