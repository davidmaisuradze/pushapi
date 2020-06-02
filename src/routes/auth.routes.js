import { Router } from 'express';

import * as AuthController from '../controllers/auth/auth.controller';

const routes = new Router();

// GET
// routes.get('/google/callback', AuthController.googleCallback);

// POST
// routes.post('/register', AuthController.registerViaGoogle);
routes.post('/saveGoogleUser', AuthController.saveGoogleUser);

export default routes;
