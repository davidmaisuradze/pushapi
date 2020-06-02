import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    title: {type: String, required: true, unique: true},
    body: {type: String, required: true},
    description: {type: String, required: false},
    url: {type: String, required: false},
    websites: [{type: Schema.Types.ObjectID, ref: 'websites'}],
    userId: {type: Schema.Types.ObjectID, ref: 'users'}
}, {timestamps: true});

export default mongoose.model('notifications', notificationSchema);
