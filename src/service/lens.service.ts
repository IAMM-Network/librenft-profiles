import { DocumentDefinition, FilterQuery } from "mongoose";
import { CreateProfileDataStruct, PostDataStruct } from '../typechain-types/LensHub';
import { EIP712SignatureStruct, SetDispatcherWithSigDataStruct } from '../typechain-types/LensHub';
import { LensHub__factory } from '../typechain-types';
import { waitForTx, initEnv, getAddrs, ZERO_ADDRESS } from './helpers/utils';
import { defaultAbiCoder } from 'ethers/lib/utils';
import User, { UserDocument } from "../model/user.model";
import Post, {PostDocument} from '../model/post.model';
import { Dispatcher } from '../model/dispatcher.model';
import log from "../logger";
import { BigNumber } from "@ethersproject/bignumber";
import { findUser } from "./user.service";
import { SignatureLike } from "@ethersproject/bytes";

const hre = require("hardhat");

export async function createProfile(dbUser: DocumentDefinition<UserDocument>){

    try { 

        const [governance, , user] = await initEnv(hre);
        const addrs = getAddrs();
        const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], governance);
      
        //console.log(`Profile ID by handle: ${await lensHub.getProfileIdByHandle('zer0dot')}`);
      
        console.log(`waitlisting ${user.address}`);
        await waitForTx(lensHub.whitelistProfileCreator(user.address, true));

        //Validate if the profile Exists
        log.info(`Getting profile id by handle ${dbUser.handle}`);
        let handle: string = dbUser.handle;
        let profileID = await lensHub.getProfileIdByHandle(handle);
        console.log(`Profile ID by handle: ${profileID}`);

        if(profileID > BigNumber.from('0x0')) {

            let owner = await lensHub.ownerOf(profileID);
            console.log(`Profile owner: ${owner}`);

            if(owner === dbUser.publicAddress)
                return profileID;
            else    
                return -1;
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
    
        console.log('creating profile');
        await waitForTx(lensHub.connect(user).createProfile(inputStruct));

        profileID = await lensHub.getProfileIdByHandle(handle)

        console.log(
        `Profile ID by handle: ${profileID}, user address : ${dbUser.publicAddress}`
        );

        return profileID;

    } catch(error: any) {
        log.error(error);
        throw new Error(error);
    }

}

export async function createPost(dbPost: DocumentDefinition<PostDocument>){
    try {         

        let newPost;

         //get user by Address
         const userQuery: FilterQuery<UserDocument> = { publicAddress: dbPost.publicAddress }
         const _isLensUser = await isLensUser(userQuery);

        if(_isLensUser){

            const [governance, treasury, user] = await initEnv(hre);
            const addrs = getAddrs();
            const freeCollectModuleAddr = addrs['free collect module'];
            const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], governance);


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

        if(newPost){
            console.log(newPost);
        }

        return newPost;

    } catch(error: any) {
        throw new Error(error);
    }
}

export async function setDispatcher(dispatcher: Dispatcher){
    try {         

         //get user by Address
         const userQuery: FilterQuery<UserDocument> = { publicAddress: dispatcher.publicAddress }
         const _isLensUser = await isLensUser(userQuery);

        if(_isLensUser){

            const [governance, treasury, user] = await initEnv(hre);
            const addrs = getAddrs();
            const freeCollectModuleAddr = addrs['free collect module'];
            const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], governance);

            const _eip712Sig: EIP712SignatureStruct = dispatcher.signedMessage;

            const eip712st: EIP712SignatureStruct = {
                v: _eip712Sig.v,
                r: _eip712Sig.r,
                s: _eip712Sig.s,
                deadline: _eip712Sig.deadline,
              };
            
              const setDispSt: SetDispatcherWithSigDataStruct = {
                profileId: dispatcher.profileId,
                dispatcher: dispatcher.dispatcher,
                sig: eip712st,
              };
            
              //Garvaz
              console.log('--## TxDispatcher ##--');
              const txDispatcher = await waitForTx(lensHub.setDispatcherWithSig(setDispSt));
            
              console.log(txDispatcher);   
            
        }

        return dispatcher;

    } catch(error: any) {
        throw new Error(error);
    }
}

export async function getSigNonce(query: FilterQuery<UserDocument>): Promise<[BigNumber, boolean]> {


    //get user by Address
    const userQuery: FilterQuery<UserDocument> = { publicAddress: query.publicAddress }
    const dbUser = await findUser(userQuery);

   if(dbUser){

        log.info("Getting signers");
        //Get signers
        const [governance, treasury, user] = await initEnv(hre);
        const addrs = getAddrs();
        //log.info(governance);
        const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], user);

        const sigNonce = await lensHub.sigNonces(query.publicAddress);
        console.log(`SigNonce: ${sigNonce}`);

        return [sigNonce, false]


   } else {

    return [BigNumber.from('-1',), true]
   }
    
}

export async function isLensUser(query: FilterQuery<UserDocument>){
    try {         

         //get user by Address
         const userQuery: FilterQuery<UserDocument> = { publicAddress: query.publicAddress }
         const dbUser = await findUser(userQuery);

        if(dbUser){

            log.info("Getting signers");
            //Get signers
            const [governance, treasury, user] = await initEnv(hre);
            const addrs = getAddrs();

            const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], governance);

            log.info(`Getting profile id by handle ${dbUser.handle}`);
            let handle: string = dbUser.handle;
            const profileID = await lensHub.getProfileIdByHandle(handle);
            console.log(`Profile ID by handle: ${profileID}`);

            if(profileID){
                return true;
            }
        }

        return false;

    } catch(error: any) {
        throw new Error(error);
    }
}
    