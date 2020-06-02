import { Router } from 'express';
import path from 'path';

// middleware to log errors
import logError from '../utils/log-error.utils';

// ROUTES
import AuthRoutes from './auth.routes';
import SubscriptionRoutes from './subscription.routes';
import WebsiteRoutes from './website.routes';
import NotificationRoutes from './notification.routes';

const routes = new Router();

// register routes
routes.use('/auth', AuthRoutes);
routes.use('/subscribe', SubscriptionRoutes);
routes.use('/website', WebsiteRoutes);
routes.use('/notification', NotificationRoutes);

routes.all('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

routes.use(logError);

export default routes;
