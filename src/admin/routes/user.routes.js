import {Router} from 'express';
import validate from 'express-validation';

import * as UserController from '../controllers/user/user.controller';
import validators from '../controllers/user/user.validators';

const routes = new Router();

// GET
routes.get('/', UserController.getAllUsers);

export default routes;
