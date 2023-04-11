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
};

const PostSchema = new mongoose.Schema(
    {
        publicAddress: { type: String, required: true, unique: false},
        profileId: { type: Number, required: true, unique: false},
        contentURI: { type: String, required: true, unique: false},
        collectModule: { type: String, required: true, unique: false},
        collectModuleInitData: { type: Array, required: true, unique: false},
        referenceModule: { type: String, required: true, unique: false},
        referenceModuleInitData: { type: Array, required: true, unique: false},
        message: { type: String, required: true, unique: false},
    }
);

const Post = mongoose.model<PostDocument>("Post", PostSchema);

export default Post;