import * as userService from '../../services/user.service';

export const getAllUsers = async (req, res, next) => {
    const {status, data} = await userService.getAllUsers();
    return res.status(status).json(data);
};
