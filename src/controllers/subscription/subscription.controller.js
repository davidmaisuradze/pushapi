import * as subscriptionService from '../../services/subscribtion.service';

export const createSubscription = async (req, res, next) => {
    const result = await subscriptionService.createSubscription(req.body);
    return res.status(result.status).json(result.data);
};
