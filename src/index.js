import express from 'express';
import webpush from 'web-push';
import middlewaresConfig from "./config/middlewares";
import './config/database';
import ApiRoutes from './routes';
import AdminApiRoutes from './admin/routes';
import path from 'path'
import { VAPID_KEYS } from './config/constants';

const app = express();
// wrap all the middlewares
middlewaresConfig(app);

// add the apiRoutes
app.use('/api/admin', AdminApiRoutes);
app.use('/api', ApiRoutes);
app.use('/static', express.static(path.join(__dirname, '../public')));

// set webpush to send notifications to subscriptions
webpush.setVapidDetails(
    'mailto:nika@start-with.me',
    VAPID_KEYS.publicKey,
    VAPID_KEYS.privateKey
);

const port = process.env.PORT || 4500;
app.listen(port, () => console.log(`Running on localhost: ${port}`));
