import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { ethers } from "ethers";
import { BytesLike, SignatureLike } from "@ethersproject/bytes";
import config from "config";
import User from "./user.model";
import log from "../logger";

export interface signedUnlockable {
    publicAddress: string;
    contractAddress: string;
    tokenId: number;
    link?: string;   
}

export interface createUnlockable {
    publicAddress: string;
    contractAddress: string;
    tokenId: number;
    link: string;    
    signedMessage: SignatureLike;
}

export interface UnlockableDocument extends mongoose.Document {
    uuid: string;
    publicAddress: string;
    contractAddress: string;
    tokenId: number,
    link: string;
    user: mongoose.Schema.Types.ObjectId;    
    signedMessage?: SignatureLike;
    createdAt?: Date;
    updatedAt?: Date;
}

const UnlockableSchema = new mongoose.Schema<UnlockableDocument>(
    {
        uuid: { type: String, required: false, unique: true},
        publicAddress: { type: String, required: true, unique: false},
        contractAddress: { type: String, required: true, unique: false},
        tokenId: {type: Number, required:true, unique: false},
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        link: { type: String, required: true, unique: false}
    },
    { timestamps: true}
);

UnlockableSchema.pre('save', async function (this, next){

    log.info("Validating pre save");

    next();

});

const Unlockable = mongoose.model<UnlockableDocument>("Unlockable", UnlockableSchema);

export default Unlockable;