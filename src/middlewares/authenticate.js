import HttpStatus from 'http-status';
import UserModel from '../models/user.model';

export default async (req, res, next) => {
    try {
        const googleId = req.headers.authorization;
        if (googleId) {
            req.currentUser = await UserModel.findOne({externalId: googleId});
            next();
        } else {
            return res.status(HttpStatus.UNAUTHORIZED).json('unauthorized');
        }
    } catch (err) {
        return res.status(HttpStatus.UNAUTHORIZED).json('unauthorized');
    }
}
