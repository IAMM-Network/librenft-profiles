import { DocumentDefinition, FilterQuery } from "mongoose";
import { randomUUID } from "crypto"; 
import { ethers } from "ethers";
import { BytesLike, SignatureLike } from "@ethersproject/bytes";
import Unlockable, { createUnlockable, signedUnlockable, UnlockableDocument } from "../model/unlockable.model";
import log from "../logger";
import User, { UserDocument } from "../model/user.model";
import { findUser } from './user.service';
import { ValidateSign } from "./helpers/utils";
import { boolean } from "yup";

export async function createUnlockable(input:DocumentDefinition<createUnlockable>) {

    try{ 

        let pUnlockable: signedUnlockable = { 
            publicAddress: input.publicAddress,
            contractAddress: input.contractAddress,
            tokenId: input.tokenId,
            link: input.link
        };    

        log.info(`tokenId: ${input.tokenId}`);
    
        const signedMessage: SignatureLike = input.signedMessage;
        
        log.info("Verifiying message");
        log.info(JSON.stringify(pUnlockable));

        const isValidSign = await ValidateSign(signedMessage, pUnlockable.publicAddress, pUnlockable);

        if(!isValidSign){
            throw new Error("Sign is not valid");
        }

        //get user by Address
        const userQuery: FilterQuery<UserDocument> = { publicAddress: pUnlockable.publicAddress}
        const user = await findUser(userQuery);

        if(!user) {
            throw new Error("User with that public address was not found");
        }

        let newUnlockable = { 
            uuid: randomUUID(), 
            publicAddress: pUnlockable.publicAddress, 
            contractAddress: pUnlockable.contractAddress, 
            tokenId: pUnlockable.tokenId, 
            link: pUnlockable.link, 
            user: user._id 
        };

        const dbUnlockable = await Unlockable.create(newUnlockable);

        return dbUnlockable;

    }catch(error:any){
        log.error(error.message);
        throw new Error(error);
    }
    
}

export async function getUnlockable(query: FilterQuery<UnlockableDocument>){

    let pSignedQuery: signedUnlockable = { 
        publicAddress: query.publicAddress,
        contractAddress: query.contractAddress,
        tokenId: query.tokenId
    };

    const signatureInMessage: SignatureLike = query.signedMessage;

    log.info("Verifiying message");
    log.info(JSON.stringify(pSignedQuery));

    console.log(JSON.stringify(pSignedQuery));
    const msgHash = ethers.utils.hashMessage(JSON.stringify(pSignedQuery));
    const msgHashBytes = ethers.utils.arrayify(msgHash);

    const recoveredPubKey = ethers.utils.recoverPublicKey(msgHashBytes, signatureInMessage);
    const recoveredAddress = ethers.utils.recoverAddress(msgHashBytes, signatureInMessage);

    log.info(`recoveredPubKey: ${recoveredPubKey}, recoveredAddress: ${recoveredAddress} `);

    if(recoveredAddress !== pSignedQuery.publicAddress){
        log.error("Adresses don't match");
        throw new Error("Adresses don't match");
    }

    const dbUnlockable = await Unlockable.findOne(query).lean();

    if(dbUnlockable){
        log.info(dbUnlockable);
    } else {
        log.info(`search of unlockable ${query.toJSON} did not produce a result`)
    }

    return dbUnlockable;
}
