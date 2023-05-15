import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { ethers } from "ethers";
import { BytesLike, SignatureLike } from "@ethersproject/bytes";
import config from "config";
import User from "./user.model";
import log from "../logger";

export interface contractABI {
    uuid?: string;
    version: number;
    abi?: string;
    type: number;
}

export interface contract extends contractABI {
    address: string;
    owner: string;
    abi: string;
    whiteList: string[];
    tokenImageURL: string;
    cid: string;
    metadata: string;
}

export interface ContractABIDocument extends mongoose.Document {
    uuid: string;
    version: number;
    abi: string;
    type: number;
}

export interface ContractDocument extends mongoose.Document {
    uuid: string;        
    address: string;
    ownerAddress: string;
    abi: mongoose.Schema.Types.ObjectId;
    whiteList: string[];
    tokenImageURL: string;
    cid: string;
    metadata: string;
}

const ContractABISchema = new mongoose.Schema<ContractABIDocument>(
    {
        uuid: { type: String, required: false, unique: true},
        version: {type: Number, required:true, unique: false},
        abi: { type: String, required: false, unique: false},
        type: { type: Number, required: true, unique: false}
    },
    { timestamps: true}
);

const ContractABI = mongoose.model<ContractABIDocument>("ContractABI", ContractABISchema);

const ContractSchema = new mongoose.Schema<ContractDocument>(
    {
        uuid: { type: String, required: false, unique: true},        
        address: { type: String, required: false, unique: false},
        ownerAddress: { type: String, required: false, unique: false},
        abi: { type: mongoose.Schema.Types.ObjectId, ref: 'ContractABI'},
        whiteList: [{ type: String, required: false, unique: false}],
        tokenImageURL: { type: String, required: false, unique: false},
        cid: { type: String, required: false, unique: false},
        metadata: { type: String, required: false, unique: false},
    },
    { timestamps: true}
);

const Contract = mongoose.model<ContractDocument>("Contract", ContractSchema);

ContractSchema.pre('save', async function preSaveFunction(this: ContractDocument, next){
    const existingABI = await ContractABI.findOne( { uuid: this.abi});

    if (!existingABI) {
        throw new Error(`No existing ABI ${this.abi}`)
    }

    this

    next();
});

export {ContractABI, Contract};