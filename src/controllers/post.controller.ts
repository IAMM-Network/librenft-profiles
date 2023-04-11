import {Request, Response, NextFunction} from "express";
import {omit} from 'lodash';
import { FilterQuery } from "mongoose";
import {createPost} from '../service/lens.service';
import Post, { PostDocument } from "../model/post.model";
import log from "../logger";

export async function createPostHandler(req: Request, res: Response) {
    try {

        //Get the profileID from the user Address

        const newPost = await createPost(req.body);
        return res.status(200).json({status:"ok",message:"Post created",data:newPost});   

    } catch(e: any){
        log.error(e);
        return res.status(409).send({status:"error",message:e.message,data:e.message});
    }
}