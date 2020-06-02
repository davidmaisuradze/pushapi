import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const websiteSchema = new Schema({
    url: {type: String, required: true, unique: true},
    name: {type: String, required: false},
    siteId: {type: String, required: false},
    subscribeAutomatically: {type: Boolean, required: false, default: false},
    notificationTitle: {type: String, required: false},
    notificationBody: {type: String, required: false},
    subscriptions: [{type: Schema.Types.ObjectID, ref: 'subscriptions'}],
    userId: {type: Schema.Types.ObjectID, ref: 'users'}
}, {timestamps: true});

export default mongoose.model('websites', websiteSchema);
