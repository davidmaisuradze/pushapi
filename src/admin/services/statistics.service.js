import HttpStatus from 'http-status';
import LogModel from '../../models/log.model';
import { LOG_TYPES } from '../../config/constants';

export const getNotificationStatistics = async (data) => {
    try {
        const {fromDate, toDate} = data;
        const notificationLogs = await LogModel
            .aggregate([
                    {
                        $match: {
                            type: LOG_TYPES.notification,
                            'createdAt': {'$gt': new Date(fromDate), '$lt': new Date(toDate)}
                        }
                    },
                    {
                        $group: {
                            _id: '$objectId',
                            successCount: {$sum: {$cond: [{'$eq': ['$hasError', false]}, 1, 0]}},
                            failedCount: {$sum: {$cond: [{'$eq': ['$hasError', true]}, 1, 0]}},
                        }
                    }
                ]
            );

        return {status: HttpStatus.OK, data: notificationLogs};
    } catch (err) {
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};
