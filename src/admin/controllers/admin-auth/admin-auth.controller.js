import * as adminAuthService from '../../services/admin-auth.service';

export const loginAdmin = async (req, res, next) => {
    const {email, password} = req.body;
    const {status, data} = await adminAuthService.loginAdmin(email, password);
    console.log(status, 'status');
    console.log(data, 'data');
    return res.status(status).json(data);
};

export const registerAdmin = async (req, res, next) => {
    const {status, data} = await adminAuthService.registerAdmin(req.body);
    return res.status(status).json(data);
};
