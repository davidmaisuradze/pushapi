import { Router } from 'express';
import validate from 'express-validation';
import adminAuthenticate from '../middlewares/admin-authenticate';

import * as AdminAuthController from '../controllers/admin-auth/admin-auth.controller';
import validators from '../controllers/admin-auth/admin-auth.validators';

const routes = new Router();

// POST
routes.post('/login', validate(validators.loginAdmin), AdminAuthController.loginAdmin);
routes.post('/register', validate(validators.registerAdmin), AdminAuthController.registerAdmin);

export default routes;
