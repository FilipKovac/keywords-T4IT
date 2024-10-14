import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        middleName: { type: String, required: false },
        lastName: { type: String, required: true },
        hobbies: { type: String, required: false },
        keywords: { type: String, required: false, select: false },
    },
    {
        timestamps: true,
    },
);

UserSchema.index({ keywords: 'text' });

export const UserModel = mongoose.model('users', UserSchema);
