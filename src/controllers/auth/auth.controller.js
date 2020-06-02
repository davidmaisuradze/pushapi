import { google } from 'googleapis';
import googleOauthConfig from '../../config/google-oauth.config';
import * as authService from '../../services/auth.service';

export const saveGoogleUser = async (req, res, next) => {
    const result = await authService.createUser(req.body);
    const auth = createConnection();
    auth.setCredentials(req.body.idToken);
    return res.status(result.status).json(result.data);
};

/*export const registerViaGoogle = (req, res, next) => {
    const defaultScope = [
        'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/userinfo.email',
    ];

    const authorizeUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: defaultScope
    });

    return res.status(HttpStatus.OK).json(authorizeUrl);
};

export const googleCallback = (req, res, next) => {
    console.log(req, 'req');
    console.log(req.query.code, 'code');
    res.status(HttpStatus.OK).json(req);
};*/

const createConnection = () => {
    return new google.auth.OAuth2(
        googleOauthConfig.web.client_id,
        googleOauthConfig.web.client_secret,
        googleOauthConfig.web.redirect_uris[0]
    );
};
