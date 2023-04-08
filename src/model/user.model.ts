import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

enum profileType {
    collector = 1,
    creator,
    builder,
    critic
}

export interface UserDocument extends mongoose.Document {
    publicAddress: string;
    handle: string;
    imageURI: string;
    followNFTURI: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    profileSelected: profileType;
}

const UserSchema = new mongoose.Schema(
    {
        publicAddress: { type: String, required: true, unique: true},
        handle: { type: String, required: true, unique: true},
        imageURI: { type: String, required: false, unique: false},
        followNFTURI: { type: String, required: false, unique: false},
        email: { type: String, required: false, unique: false},
        profileSelected: { type: Number, required: false, unique: false},
    },
    { timestamps: true}
);

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;