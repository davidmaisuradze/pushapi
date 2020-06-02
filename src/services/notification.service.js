import HttpStatus from 'http-status';
import NotificationModel from '../models/notification.model';
import LogModel from '../models/log.model';
import { LOG_TYPES } from '../config/constants';

export const getNotifications = async (userId) => {
    try {
        const notifications = await NotificationModel.find({userId: userId});
        const updatedNotifications = await Promise.all(notifications.map(async notification => {
            const notificationLogs = await LogModel.find({type: LOG_TYPES.notification, objectId: notification.title});
            const successCount = notificationLogs.filter(item => !item.hasError).length;
            const failedCount = notificationLogs.length - successCount;
            return {
                ...notification._doc,
                statistics: {
                    successCount: successCount,
                    failedCount: failedCount
                }
            }
        }));
        return {status: HttpStatus.OK, data: updatedNotifications};
    } catch (err) {
        console.log(err, 'err');
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};

export const createNotification = async (userId, data) => {
    try {
        const {title, body, description, url, websites} = data;

        const notificationModel = new NotificationModel({
            title: title,
            body: body,
            description: description,
            url: url,
            websites: websites,
            userId: userId
        });
        const result = await notificationModel.save();
        return {status: HttpStatus.OK, data: result};
    } catch (err) {
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};

export const updateNotification = async (data) => {
    try {
        const {id, title, body, description, url, websites} = data;

        const result = await NotificationModel.findOneAndUpdate(
            {_id: id},
            {
                $set: {
                    title: title,
                    body: body,
                    description: description,
                    websites: websites,
                    url: url
                }
            },
            {upsert: true, new: true}
        );

        return {status: HttpStatus.OK, data: result};
    } catch (err) {
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};

export const deleteNotification = async notificationId => {
    try {
        const result = await NotificationModel.findOneAndDelete({_id: notificationId});

        return {status: HttpStatus.OK, data: result};
    } catch (err) {
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};
