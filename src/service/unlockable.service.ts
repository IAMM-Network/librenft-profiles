import { DocumentDefinition, FilterQuery } from "mongoose";
import { randomUUID } from "crypto"; 
import { ethers } from "ethers";
import { BytesLike, SignatureLike } from "@ethersproject/bytes";
import Unlockable, { createUnlockable, signedUnlockable, UnlockableDocument } from "../model/unlockable.model";
import log from "../logger";
import User, { UserDocument } from "../model/user.model";
import { findUser } from './user.service';

export async function createUnlockable(input:DocumentDefinition<createUnlockable>) {
    try{ 

        let pUnlockable: signedUnlockable = { 
            publicAddress: input.publicAddress,
            contractAddress: input.contractAddress,
            link: input.link
        };    
    
        const signatureInMessage: SignatureLike = input.signedMessage;
        
        log.info("Verifiying message");
        log.info(JSON.stringify(pUnlockable));
        //const actualAddress = ethers.utils.verifyMessage(JSON.stringify(unlockable), signatureInMessage);
        //log.info(actualAddress);
        console.log(JSON.stringify(pUnlockable));
        const msgHash = ethers.utils.hashMessage(JSON.stringify(pUnlockable));
        const msgHashBytes = ethers.utils.arrayify(msgHash);

        const recoveredPubKey = ethers.utils.recoverPublicKey(msgHashBytes, signatureInMessage);
        const recoveredAddress = ethers.utils.recoverAddress(msgHashBytes, signatureInMessage);

        log.info(`recoveredPubKey: ${recoveredPubKey}, recoveredAddress: ${recoveredAddress} `);
    
        if(recoveredAddress !== pUnlockable.publicAddress){
            log.error("Adresses don't match");
            throw new Error("Adresses don't match");
        }

        //get user by Address
        const userQuery: FilterQuery<UserDocument> = { publicAddress: recoveredAddress}
        const user = await findUser(userQuery);

        if(!user) {
            throw new Error("User not found");
        }

        let newUnlockable = { uuid: randomUUID(), publicAddress: recoveredAddress, contractAddress: pUnlockable.contractAddress, link: pUnlockable.link, user: user._id };

        return await Unlockable.create(newUnlockable);

    }catch(error:any){
        log.error(error.message);
        throw new Error(error);
    }
    
}

export async function getUnlockable(query: FilterQuery<UnlockableDocument>){

    let pSignedQuery: signedUnlockable = { 
        publicAddress: query.publicAddress,
        contractAddress: query.contractAddress,
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
