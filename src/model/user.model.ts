import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

enum profileType {
    creator = 1,
    collector,
    builder,
    critic
}

export interface UserDocument extends  mongoose.Document {
    publicAddress: string;
    handle: string;
    imageURI: string;
    followNFTURI: string;
    createdAt: Date;
    updatedAt: Date;
    profileType: profileType;
    profileId?: number;
}

const UserSchema = new mongoose.Schema(
    {
        publicAddress: { type: String, required: true, unique: true},
        handle: { type: String, required: true, unique: true},
        imageURI: { type: String, required: false, unique: false},
        followNFTURI: { type: String, required: false, unique: false},
        profileType: { type: Number, required: false, unique: false},
        profileId: { type: Number, required: false, unique: false},
    },
    { timestamps: true}
);

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;