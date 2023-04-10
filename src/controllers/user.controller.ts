import {Request, Response, NextFunction} from "express";
import {omit} from 'lodash';
import { FilterQuery } from "mongoose";
import {createUser, findUser} from '../service/user.service';
import { getSigNonce, setDispatcher } from '../service/lens.service';
import User, { UserDocument } from "../model/user.model";
import log from "../logger";

export async function createUserHandler(req: Request, res: Response) {

    try {

        const user = await createUser(req.body);
        return res.status(200).json({status:"ok",message:"User handler created",data:user})

    } catch(e: any){
        log.error(e);
        return res.status(409).send({status:"error",message:e.message,data:e.message});
    }
}

export async function createDispatcher(req: Request, res: Response) {

    try {

        const dispatcher = await setDispatcher(req.body);
        return res.status(200).json({status:"ok",message:"User Dispatcher was set",data:dispatcher})

    } catch(e: any){
        log.error(e);
        return res.status(409).send({status:"error",message:e.message,data:e.message});
    }
}

export async function getUserHandler(req: Request, res: Response) {
    try {
        const userAddress = req.params.publicAddress;
        log.info("searching public address: " + userAddress);

        const userQuery: FilterQuery<UserDocument> = { publicAddress: userAddress}
        const user = await findUser(userQuery);

        if(user){
            return res.status(200).json({status:"ok",message:"User handler found",data:user});
        } else {
            return res.status(404).json({status:"error",message:"User not found"});
        }

    } catch (error:any) {
        log.error(error.message);
    }
}

export async function getUserSigNonces(req: Request, res: Response) {

    try {

        const userAddress = req.params.publicAddress;
        log.info("searching nonces for public address: " + userAddress);

        const userQuery: FilterQuery<UserDocument> = { publicAddress: userAddress}
        const [nonce, error] = await getSigNonce(userQuery);

        if(!error) {
            return res.status(200).json({status:"ok",message:"User SigNonce found",data:nonce});
        }
        else {
            return res.status(404).json({status:"error",message:"User not found or SigNonce not found"});
        }

    } catch (error:any) {
        log.error(error.message);
    }

}