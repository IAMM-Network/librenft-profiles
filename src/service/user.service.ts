import { DocumentDefinition, FilterQuery } from "mongoose";
import User, { UserDocument } from "../model/user.model";
import log from "../logger";

export async function createUser(input: DocumentDefinition<UserDocument>){

    try { 

        return await User.create(input);
    } catch(error: any) {
        throw new Error(error);
    }

}

export async function findUser(query: FilterQuery<UserDocument>){
    const dbUser = await User.findOne(query).lean();
    if(dbUser){
        log.info(dbUser);
    } else {
        log.info(`search of user ${query.toJSON} did not produce a result`)
    }
    return dbUser;
}
