import { Router } from 'express';
import validate from 'express-validation';
import authenticate from '../middlewares/authenticate';

import * as WebSiteController from '../controllers/website/website.controller';
import validators from '../controllers/website/website.validators';

const routes = new Router();

// GET
routes.get('/', authenticate, WebSiteController.getWebsites);
routes.get('/download-service-worker', WebSiteController.downloadServiceWorker);

// POST
routes.post('/', authenticate, validate(validators.createWebsite), WebSiteController.createWebsite);

// PUT
routes.put('/', authenticate, validate(validators.updateWebsite), WebSiteController.updateWebsite);

// DELETE
routes.delete('/:websiteId', WebSiteController.deleteWebsite);

export default routes;
