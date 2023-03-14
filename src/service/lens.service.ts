import { DocumentDefinition, FilterQuery } from "mongoose";
import User, { UserDocument } from "../model/user.model";
import log from "../logger";
import { LensHub__factory } from '../typechain-types';
import { CreateProfileDataStruct } from '../typechain-types/LensHub';
import { waitForTx, initEnv, getAddrs, ZERO_ADDRESS } from './helpers/utils';
import { BigNumber } from "@ethersproject/bignumber";

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

            log.info("waitlisting");
            //whitelist
            await waitForTx(lensHub.whitelistProfileCreator(user.address, true, {
                gasLimit: 12450000,
                gasPrice: 37257824143
            }));

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
    