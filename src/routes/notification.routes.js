import { Router } from 'express';
import validate from 'express-validation';
import authenticate from '../middlewares/authenticate';

import * as NotificationController from '../controllers/notification/notification.controller';
import validators from '../controllers/notification/notification.validators';

const routes = new Router();

// GET
routes.get('/', authenticate, NotificationController.getNotifications);

// POST
routes.post('/', authenticate, validate(validators.createNotification), NotificationController.createNotification);
routes.post('/send/:notificationId', authenticate, NotificationController.sendNotificationsToSubscriptions);

// PUT
routes.put('/', authenticate, validate(validators.updateNotification), NotificationController.updateNotification);

// DELETE
routes.delete('/:notificationId', NotificationController.deleteNotification);

export default routes;
