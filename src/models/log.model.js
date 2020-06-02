import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const logSchema = new Schema({
    type: {type: String, required: true},
    objectId: {type: String, required: false},
    data: {type: String, required: false},
    description: {type: String, required: false},
    hasError: {type: Boolean, required: false},
    userId: {type: Schema.Types.ObjectID, ref: 'users'}
}, {timestamps: true});

export default mongoose.model('logs', logSchema);
