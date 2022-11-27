import express from 'express';

import {controllerLoginAdmin, controllerLogoutAdmin} from '../controllers/controllerSession.js';

const routerApiSession = express.Router();

//Sessions for admins
routerApiSession.post('/login',controllerLoginAdmin);
routerApiSession.post('/logout',controllerLogoutAdmin);

export default routerApiSession;