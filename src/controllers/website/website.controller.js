import * as websiteService from '../../services/website.service';
import path from 'path';
import axios from 'axios';
import fs from 'fs';


export const getWebsites = async (req, res, next) => {
    const {status, data} = await websiteService.getWebsites(req.currentUser._id);
    return res.status(status).json(data);
};

export const downloadServiceWorker = async  (req, res, next) => {
    const file = path.join(__dirname, '../../../public/service-worker.js');
    res.download(file);
};

export const createWebsite = async (req, res, next) => {
    const {currentUser, body} = req;

    const {status, data} = await websiteService.createWebsite(currentUser._id, body);
    return res.status(status).json(data);
};

export const updateWebsite = async (req, res, next) => {
    const {body} = req;

    const {status, data} = await websiteService.updateWebsite(body);
    return res.status(status).json(data);
};

export const deleteWebsite = async (req, res, next) => {
    const {status, data} = await websiteService.deleteWebsite(req.params.websiteId);
    return res.status(status).json(data);
};
