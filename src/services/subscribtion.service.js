import HttpStatus from 'http-status';
import webpush from 'web-push';
import { forEach } from 'lodash';
import SubscriptionModel from '../models/subscription.model';
import NotificationModel from '../models/notification.model';
import WebsiteModel from '../models/website.model';
import LogModel from '../models/log.model';
import { isValidSaveRequest } from '../utils/subscription.utils';
import { LOG_TYPES } from '../config/constants';

export const createSubscription = async (data) => {
    try {
        const {siteId, subscription} = data;

        const checkSubscription = isValidSaveRequest(subscription);
        if (!checkSubscription.success) {
            return {status: HttpStatus.BAD_REQUEST, data: checkSubscription.message};
        }
        const checkIfExists = await SubscriptionModel.findOne({siteId: siteId, endpoint: subscription.endpoint});

        const website = await WebsiteModel.findOne({siteId: siteId});

        if(!checkIfExists) {
            const subscriptionModel = new SubscriptionModel({
                siteId: siteId,
                endpoint: subscription.endpoint,
                keys: subscription.keys
            });
            const result = await subscriptionModel.save();

            await WebsiteModel.findOneAndUpdate(
                {siteId: siteId},
                {
                    $push: {
                        subscriptions: result._id
                    }
                }
            );
        }
        console.log(website, 'website');
        return {status: HttpStatus.OK, data: website};
    } catch (err) {
        console.log(err, 'err');
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};

const deleteSubscription = id => {
    console.log(id, 'delete subscription');
};

export const sendNotificationsToSubscriptions = async (notificationId) => {
    try {
        const notification = await NotificationModel.findOne({_id: notificationId});
        if (!notification) {
            return {status: HttpStatus.NOT_FOUND, data: 'notification not found'};
        }

        const dataToSend = {
            notification: {
                title: notification.title,
                body: notification.body,
                data: {
                    url: notification.url
                }
            }
        };
        if (notification.websites) {
            forEach(notification.websites, async websiteId => {
                const website = await WebsiteModel.findOne({_id: websiteId});

                if (website && website.subscriptions) {
                    forEach(website.subscriptions, async subscriptionId => {
                        const subscription = await SubscriptionModel.findOne({_id: subscriptionId});
                        if (subscription) {
                            const stringData = JSON.stringify(dataToSend);
                            triggerPushMessage(subscription, stringData, notification.title);
                            const log = new LogModel({
                                type: LOG_TYPES.notification,
                                objectId: notification.title,
                                data: stringData,
                                hasError: false
                            });
                            log.save();
                        }
                    })
                } else {
                    const log = new LogModel({
                        type: LOG_TYPES.notification,
                        objectId: notification.title,
                        data: 'Website not found',
                        hasError: true
                    });
                    log.save();
                }
            });
        }

        return {status: HttpStatus.OK, data: 'notifications sent'};
    } catch (err) {
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};

const triggerPushMessage = (subscription, dataToSend, notificationTitle) => {
    return webpush.sendNotification(subscription, dataToSend)
        .catch(err => {
            const log = new LogModel({
                type: LOG_TYPES.notification,
                objectId: notificationTitle,
                data: JSON.stringify(err),
                hasError: true
            });
            log.save();

            if (err.statusCode === 410) {
                deleteSubscription(subscription._id);
            } else {
                console.log('subscription is no longer valid', err);
            }
        })
};
