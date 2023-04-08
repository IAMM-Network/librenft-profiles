import { DocumentDefinition, FilterQuery } from "mongoose";
import { defaultAbiCoder } from 'ethers/lib/utils';
import User, { UserDocument } from "../model/user.model";
import Post, {PostDocument} from '../model/post.model';
import log from "../logger";
import { LensHub__factory } from '../typechain-types';
import { CreateProfileDataStruct, PostDataStruct } from '../typechain-types/LensHub';
import { waitForTx, initEnv, getAddrs, ZERO_ADDRESS } from './helpers/utils';
import { BigNumber } from "@ethersproject/bignumber";
import { findUser } from "./user.service";

const hre = require("hardhat");

export async function createProfile(dbUser: DocumentDefinition<UserDocument>){

    try { 

        log.info("Getting signers");
        //Get signers
        const [governance, treasury, user] = await initEnv(hre);
        const addrs = getAddrs();
        //log.info(governance);
        const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], user);

        //Validate if the profile Exists
        log.info(`Getting profile id by handle ${dbUser.handle}`);
        let handle: string = dbUser.handle;
        const profileID = await lensHub.getProfileIdByHandle(handle);
        console.log(`Profile ID by handle: ${profileID}`);

        if(profileID > BigNumber.from('0x0')) {
            log.error("Existing handler");
            return;
        }

        log.info("Creating profile structure");

        const inputStruct: CreateProfileDataStruct = {
            to: dbUser.publicAddress,
            handle: dbUser.handle,
            imageURI: dbUser.imageURI,
            followModule: ZERO_ADDRESS,
            followModuleInitData: [],
            followNFTURI: dbUser.followNFTURI,
        };        
    
        log.info(`Lenshub creating profile for ${dbUser.publicAddress}`);
        await waitForTx(lensHub.connect(user).createProfile(inputStruct));
                    
        console.log(`Total supply (should be 1): ${await lensHub.totalSupply()}`);
        console.log(
        `Profile owner: ${await lensHub.ownerOf(1)}, user address (should be the same): ${user.address}`
        );
        console.log(
        `Profile ID by handle: ${await lensHub.getProfileIdByHandle(
            'zer0dot'
        )}, user address (should be the same): ${user.address}`
        );

    } catch(error: any) {
        throw new Error(error);
    }

}

export async function createPost(dbPost: DocumentDefinition<PostDocument>){
    try {         

        let newPost;

        log.info("Getting signers");
        //Get signers
        const [governance, treasury, user] = await initEnv(hre);
        const addrs = getAddrs();
        //log.info(governance);
        const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], user);

         //get user by Address
         const userQuery: FilterQuery<UserDocument> = { publicAddress: dbPost.publicAddress }
         const dbUser = await findUser(userQuery);

        if(dbUser){

            log.info(`Getting profile id by handle ${dbUser.handle}`);
            let handle: string = dbUser.handle;
            const profileID = await lensHub.getProfileIdByHandle(handle);
            console.log(`Profile ID by handle: ${profileID}`);

            log.info("waitlisting");
            //whitelist
            const freeCollectModuleAddr = addrs['free collect module'];
            await waitForTx(lensHub.whitelistCollectModule(freeCollectModuleAddr, true));

            const newdbPost = {
                ...dbPost,
                collectModule: freeCollectModuleAddr,
                collectModuleInitData: defaultAbiCoder.encode(['bool'], [true]),
                referenceModule: ZERO_ADDRESS,
                referenceModuleInitData: []
            }

            newPost = await Post.create(newdbPost);

            const inputStruct: PostDataStruct = {
                profileId: 1,
                contentURI: dbPost.contentURI,
                collectModule: freeCollectModuleAddr,
                collectModuleInitData: defaultAbiCoder.encode(['bool'], [true]),
                referenceModule: ZERO_ADDRESS,
                referenceModuleInitData: [],
            };
            
            await waitForTx(lensHub.connect(user).post(inputStruct));
            console.log(await lensHub.getPub(1, 1));
        }

        //Validate if the profile Exists
        if(newPost){
            console.log(newPost);
        }

        return newPost;

    } catch(error: any) {
        throw new Error(error);
    }
}
    