import * as statisticsService from '../../services/statistics.service';

export const getNotificationStatistics = async (req, res, next) => {
    const {status, data} = await statisticsService.getNotificationStatistics(req.query);
    return res.status(status).json(data);
};
