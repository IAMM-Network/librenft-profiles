import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserDocument extends mongoose.Document {
    publicAddress: string;
    handle: string;
    imageURI: string;
    followNFTURI: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new mongoose.Schema(
    {
        publicAddress: { type: String, required: true, unique: true},
        handle: { type: String, required: true, unique: true},
        imageURI: { type: String, required: false, unique: false},
        followNFTURI: { type: String, required: false, unique: false},
        email: { type: String, required: false, unique: false}
    },
    { timestamps: true}
);

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;