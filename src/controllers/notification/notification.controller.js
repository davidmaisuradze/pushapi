import * as notificationService from '../../services/notification.service';
import * as subscriptionService from '../../services/subscribtion.service';

export const getNotifications = async (req, res, next) => {
    const {status, data} = await notificationService.getNotifications(req.currentUser._id);
    return res.status(status).json(data);
};

export const createNotification = async (req, res, next) => {
    const {currentUser, body} = req;

    const {status, data} = await notificationService.createNotification(currentUser._id, body);
    return res.status(status).json(data);
};

export const updateNotification = async (req, res, next) => {
    const {body} = req;

    const {status, data} = await notificationService.updateNotification(body);
    return res.status(status).json(data);
};

export const deleteNotification = async (req, res, next) => {
    const {status, data} = await notificationService.deleteNotification(req.params.notificationId);
    return res.status(status).json(data);
};

export const sendNotificationsToSubscriptions = async (req, res, next) => {
    const result = await subscriptionService.sendNotificationsToSubscriptions(req.params.notificationId);
    return res.status(result.status).json(result.data);
};
