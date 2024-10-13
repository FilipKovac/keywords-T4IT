import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        middleName: { type: String, required: false },
        lastName: { type: String, required: true },
        hobbies: { type: String, required: false },
    },
    {
        timestamps: true,
    },
);

export const UserModel = mongoose.model('users', UserSchema);
