import { BytesLike, SignatureLike } from "@ethersproject/bytes";
import mongoose from "mongoose";
import config from "config";
import { number } from "yup";
import { BigNumber } from "ethers";
import { EIP712SignatureStruct } from "../typechain-types/LensHub";


export interface Dispatcher {    
    publicAddress: string;
    profileId: BigNumber;
    dispatcher: string;
    chainId: number;
    nonce: BigNumber;
    contracName: string;
    contractAddress: string;
    signedMessage: EIP712SignatureStruct;
};