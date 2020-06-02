import HttpStatus from 'http-status';
import UserModel from '../models/user.model';

export const createUser = async (data) => {
    try {
        const {id: googleId, email, name, photoUrl, firstName, lastName, provider} = data;

        const checkUser = await UserModel.findOne({externalId: googleId});
        let result = {};
        if (!checkUser) {
            const userModel = new UserModel({
                email: email,
                name: name,
                photoUrl: photoUrl,
                firstName: firstName,
                lastName: lastName,
                externalId: googleId,
                externalType: provider
            });
            result = await userModel.save();
        }

        return {status: HttpStatus.OK, data: result};
    } catch (err) {
        console.log(err, 'err');
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};
