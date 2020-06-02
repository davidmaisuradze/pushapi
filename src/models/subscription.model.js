import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const keySchema = new Schema({
    p256dh: { type: String, required: true },
    auth: { type: String, required: true }
});

export const subscriptionSchema = new Schema({
    siteId: { type: String, required: true},
    endpoint: { type: String, required: true },
    keys: { type: keySchema, required: true }
}, {timestamps: true});

export default mongoose.model('subscriptions', subscriptionSchema);
