import uuidv1 from 'uuid/v1';
import HttpStatus from 'http-status';
import WebsiteModel from '../models/website.model';

export const getWebsites = async (userId) => {
    try {
        const websites = await WebsiteModel.find({userId: userId});
        return {status: HttpStatus.OK, data: websites};
    } catch (err) {
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};

export const createWebsite = async (userId, data) => {
    try {
        const {url, name, subscribeAutomatically, notificationTitle, notificationBody} = data;
        const checkWebsite = await WebsiteModel.findOne({url: url});
        if (checkWebsite) {
            return {status: HttpStatus.CONFLICT, data: 'website already exists'};
        }

        const siteId = uuidv1();

        const websiteModel = new WebsiteModel({
            url: url,
            name: name,
            subscribeAutomatically: subscribeAutomatically,
            notificationTitle: notificationTitle,
            notificationBody: notificationBody,
            siteId: siteId,
            userId: userId
        });
        const result = await websiteModel.save();
        console.log(result, 'result');
        return {status: HttpStatus.OK, data: result};
    } catch (err) {
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};

export const updateWebsite = async (data) => {
    try {
        const {id, url, name, subscribeAutomatically, notificationTitle, notificationBody} = data;

        const result = await WebsiteModel.findOneAndUpdate(
            {_id: id},
            {
                $set: {
                    url: url,
                    name: name,
                    subscribeAutomatically: subscribeAutomatically,
                    notificationTitle: notificationTitle,
                    notificationBody: notificationBody
                }
            },
            {upsert: true, new: true}
        );

        return {status: HttpStatus.OK, data: result};
    } catch (err) {
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};

export const deleteWebsite = async websiteId => {
    try {
        const result = await WebsiteModel.findOneAndDelete({_id: websiteId});

        return {status: HttpStatus.OK, data: result};
    } catch (err) {
        return {status: HttpStatus.BAD_REQUEST, data: err};
    }
};
