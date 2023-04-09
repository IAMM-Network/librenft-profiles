import {Request, Response, NextFunction} from "express";
import { createUnlockable, getUnlockable } from "../service/unlockable.service";
import log from "../logger";
import { FilterQuery } from "mongoose";
import { UnlockableDocument } from "../model/unlockable.model";

export async function createUnlockableHandler(req: Request, res: Response, next: NextFunction) {

    try {

        const unlockable = await createUnlockable(req.body);

        res.status(200).json({status:"ok",message:"Unlockable created",data:unlockable});

    } catch (error:any) {
        log.error(error);
        return res.status(400).send({status:"error",message:error.message,data:error.message});
    }
}

export async function getUnlockableHandler(req: Request, res: Response, next: NextFunction) {
    
    try {
        const pPublicAddress = req.body.publicAddress;
        const pContractAddress = req.body.contractAddress;
        const pSignedMessage = req.body.signedMessage;
        log.info(`searching unlockable for: ${pPublicAddress}, contract: ${pContractAddress}`);

        const unlockableQuery: FilterQuery<UnlockableDocument> = { publicAddress: pPublicAddress, contractAddress: pContractAddress, signedMessage: pSignedMessage};
        const unlockable = await getUnlockable(unlockableQuery);

        if(unlockable){
            return res.send(unlockable);
        } else {
            return res.json({status:"error",message:"Unlockable not found"});
        }

    } catch (error:any) {
        log.error(error.message);
        return res.json({status:"error",message:"Error getting the unlockable",data:error.message});
    }


}