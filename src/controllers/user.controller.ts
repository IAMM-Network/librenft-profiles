import {Request, Response, NextFunction} from "express";
import {omit} from 'lodash';
import { FilterQuery } from "mongoose";
import {createUser, findUser} from '../service/user.service';
import User, { UserDocument } from "../model/user.model";
import log from "../logger";

export async function createUserHandler(req: Request, res: Response) {
    try {
        const user = await createUser(req.body);
        return res.send(user.toJSON());        
    } catch(e: any){
        log.error(e);
        return res.status(409).send(e.message);
    }
}

export async function getUserHandler(req: Request, res: Response) {
    try {
        const userAddress = req.params.publicAddress;
        log.info("searching public address: " + userAddress);

        const userQuery: FilterQuery<UserDocument> = { publicAddress: userAddress}
        const user = await findUser(userQuery);

        if(user){
            return res.send(user);
        } else {
            return res.json('{"status":"error","message":"User not found"}');
        }

    } catch (error:any) {
        log.error(error.message);
    }
}