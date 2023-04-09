import { BytesLike, SignatureLike } from "@ethersproject/bytes";
import mongoose from "mongoose";
import config from "config";
import { number } from "yup";
import { EIP712SignatureStruct } from "../typechain-types/LensHub";


export interface PostDocument extends mongoose.Document {    
    publicAddress: string;
    profileId?: number;
    contentURI: string;
    collectModule?: string;
    collectModuleInitData?: number[];
    referenceModule?: string;
    referenceModuleInitData?: number[];
    message: string;
    signedMessage: EIP712SignatureStruct;
};

const PostSchema = new mongoose.Schema(
    {
        publicAddress: { type: String, required: true, unique: true},
        profileId: { type: Number, required: true, unique: true},
        contentURI: { type: String, required: true, unique: true},
        collectModule: { type: String, required: true, unique: true},
        collectModuleInitData: { type: Array, required: true, unique: true},
        referenceModule: { type: String, required: true, unique: true},
        referenceModuleInitData: { type: Array, required: true, unique: true},
        message: { type: String, required: true, unique: true},
    }
);

const Post = mongoose.model<PostDocument>("Post", PostSchema);

export default Post;