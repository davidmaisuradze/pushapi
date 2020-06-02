import {Router} from 'express';

// middleware to log errors
import logError from '../../utils/log-error.utils';

// ROUTES
import AdminAuthRoutes from './admin-auth.routes';
import UserRoutes from './user.routes';
import StatisticsRoutes from './statistics.routes';

const routes = new Router();

// register routes
routes.use('/auth', AdminAuthRoutes);
routes.use('/user', UserRoutes);
routes.use('/statistics', StatisticsRoutes);

routes.use(logError);

export default routes;
