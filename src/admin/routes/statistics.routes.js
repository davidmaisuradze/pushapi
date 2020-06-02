import { Router } from 'express';
import validate from 'express-validation';

import * as StatisticsController from '../controllers/statistics/statistics.controller';
import * as validators from '../controllers/statistics/statistics.validators';

const routes = new Router();

// GET
routes.get('/notifications', StatisticsController.getNotificationStatistics);

export default routes;
