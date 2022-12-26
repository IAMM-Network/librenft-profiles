import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserDocument extends mongoose.Document {
    publicAddress: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new mongoose.Schema(
    {
        publicAddress: { type: String, required: true, unique: true},
        email: { type: String, required: true, unique: true}
    },
    { timestamps: true}
);

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;