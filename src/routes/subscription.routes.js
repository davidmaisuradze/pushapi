import { Router } from 'express';
import validate from 'express-validation';

import * as SubscriptionController from '../controllers/subscription/subscription.controller';
import validators from '../controllers/subscription/subscription.validators';

const routes = new Router();

// GET

// POST
routes.post('/create', SubscriptionController.createSubscription);

export default routes;
