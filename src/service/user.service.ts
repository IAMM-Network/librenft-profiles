import { DocumentDefinition, FilterQuery } from "mongoose";
import User, { UserDocument } from "../model/user.model";
import log from "../logger";
import { createProfile } from "./lens.service";

export async function createUser(input: DocumentDefinition<UserDocument>){

    try { 

        //Find user by handle
        log.info(`Looking for user ${input.handle}`)
        let existingUser = await User.find( { handle: input.handle});

        if(existingUser && existingUser.length > 0){
            throw new Error("Existing Handler");
        }

        let user = await User.create(input);

        if(user){
            //create the lens profile
            console.log(input);
            createProfile(input);
        }

        return user;

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
