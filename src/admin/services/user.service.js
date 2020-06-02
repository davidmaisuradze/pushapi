import UserModel from '../../models/user.model';
import WebsiteModel from '../../models/website.model';
import HttpStatus from 'http-status';

export const getAllUsers = async () => {
    try {
        const users = await UserModel.find({});
        const updatedUsers = await Promise.all(users.map(async user => {
            const websiteCounts = await WebsiteModel.countDocuments({userId: user._id});
            console.log(user, 'user');
            return {
                ...user._doc,
                websitesCount: websiteCounts
            };
        }));
        return {status: HttpStatus.OK, data: updatedUsers};
    } catch (err) {
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};
