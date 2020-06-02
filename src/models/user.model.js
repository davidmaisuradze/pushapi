import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true},
    name: { type: String, required: false},
    photoUrl: { type: String, required: false},
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    externalId: { type: String, required: false},
    externalType: { type: String, required: false},
    roles: [{type: String}],
    passwordHash: {type: String, required: false},
    isActive: {type: Boolean, required: false}
}, {timestamps: true});

export default mongoose.model('users', userSchema);
