import UserModel from '../../models/user.model';
import bcrypt from 'bcryptjs';
import { ROLES } from '../../config/constants';
import jwt from 'jsonwebtoken';
import HttpStatus from 'http-status';

export const loginAdmin = async (email, password) => {
    try {
        const user = await UserModel.findOne({email: email});
        console.log(user, 'user');
        if (user
            && bcrypt.compareSync(password, user.passwordHash)
            && user.roles
            && user.roles.includes(ROLES.admin)) {
            const generatedJWT = jwt.sign({
                email: email
            }, process.env.JWT_SECRET, {expiresIn: '1h'});
            console.log('validation passed');
            const userToAuthJson = {
                token: generatedJWT,
                user: {
                    email: email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    roles: user.roles
                }
            };
            return {status: HttpStatus.OK, data: userToAuthJson};
        } else {
            return {status: HttpStatus.BAD_REQUEST, data: 'Invalid credentials'};
        }
    } catch (err) {
        console.log(err, 'err');
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};

export const registerAdmin = async (data) => {
    try {
        const {email, password, firstName, lastName} = data;

        const user = await UserModel.findOne({email: email});
        if (user) {
            return {status: HttpStatus.BAD_REQUEST, data: 'user already exists'};
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = bcrypt.hashSync(password, salt);

        const newUser = new UserModel({
            email: email,
            firstName: firstName,
            lastName: lastName,
            passwordHash: passwordHash,
            roles: [ROLES.admin],
            isActive: true
        });
        const result = await newUser.save();

        return {status: HttpStatus.OK, data: result};
    } catch (err) {
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};
