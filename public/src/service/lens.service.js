"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = exports.createProfile = void 0;
const utils_1 = require("ethers/lib/utils");
const post_model_1 = __importDefault(require("../model/post.model"));
const logger_1 = __importDefault(require("../logger"));
const typechain_types_1 = require("../typechain-types");
const utils_2 = require("./helpers/utils");
const bignumber_1 = require("@ethersproject/bignumber");
const user_service_1 = require("./user.service");
const hre = require("hardhat");
async function createProfile(dbUser) {
    try {
        logger_1.default.info("Getting signers");
        //Get signers
        const [governance, treasury, user] = await (0, utils_2.initEnv)(hre);
        const addrs = (0, utils_2.getAddrs)();
        //log.info(governance);
        const lensHub = typechain_types_1.LensHub__factory.connect(addrs['lensHub proxy'], user);
        //Validate if the profile Exists
        logger_1.default.info(`Getting profile id by handle ${dbUser.handle}`);
        let handle = dbUser.handle;
        const profileID = await lensHub.getProfileIdByHandle(handle);
        console.log(`Profile ID by handle: ${profileID}`);
        if (profileID > bignumber_1.BigNumber.from('0x0')) {
            logger_1.default.error("Existing handler");
            return;
        }
        logger_1.default.info("Creating profile structure");
        const inputStruct = {
            to: dbUser.publicAddress,
            handle: dbUser.handle,
            imageURI: dbUser.imageURI,
            followModule: utils_2.ZERO_ADDRESS,
            followModuleInitData: [],
            followNFTURI: dbUser.followNFTURI,
        };
        logger_1.default.info(`Lenshub creating profile for ${dbUser.publicAddress}`);
        await (0, utils_2.waitForTx)(lensHub.connect(user).createProfile(inputStruct));
        console.log(`Total supply (should be 1): ${await lensHub.totalSupply()}`);
        console.log(`Profile owner: ${await lensHub.ownerOf(1)}, user address (should be the same): ${user.address}`);
        console.log(`Profile ID by handle: ${await lensHub.getProfileIdByHandle('zer0dot')}, user address (should be the same): ${user.address}`);
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.createProfile = createProfile;
async function createPost(dbPost) {
    try {
        let newPost;
        logger_1.default.info("Getting signers");
        //Get signers
        const [governance, treasury, user] = await (0, utils_2.initEnv)(hre);
        const addrs = (0, utils_2.getAddrs)();
        //log.info(governance);
        const lensHub = typechain_types_1.LensHub__factory.connect(addrs['lensHub proxy'], user);
        //get user by Address
        const userQuery = { publicAddress: dbPost.publicAddress };
        const dbUser = await (0, user_service_1.findUser)(userQuery);
        if (dbUser) {
            logger_1.default.info(`Getting profile id by handle ${dbUser.handle}`);
            let handle = dbUser.handle;
            const profileID = await lensHub.getProfileIdByHandle(handle);
            console.log(`Profile ID by handle: ${profileID}`);
            logger_1.default.info("waitlisting");
            //whitelist
            const freeCollectModuleAddr = addrs['free collect module'];
            await (0, utils_2.waitForTx)(lensHub.whitelistCollectModule(freeCollectModuleAddr, true));
            const newdbPost = {
                ...dbPost,
                collectModule: freeCollectModuleAddr,
                collectModuleInitData: utils_1.defaultAbiCoder.encode(['bool'], [true]),
                referenceModule: utils_2.ZERO_ADDRESS,
                referenceModuleInitData: []
            };
            newPost = await post_model_1.default.create(newdbPost);
            const inputStruct = {
                profileId: 1,
                contentURI: dbPost.contentURI,
                collectModule: freeCollectModuleAddr,
                collectModuleInitData: utils_1.defaultAbiCoder.encode(['bool'], [true]),
                referenceModule: utils_2.ZERO_ADDRESS,
                referenceModuleInitData: [],
            };
            await (0, utils_2.waitForTx)(lensHub.connect(user).post(inputStruct));
            console.log(await lensHub.getPub(1, 1));
        }
        //Validate if the profile Exists
        if (newPost) {
            console.log(newPost);
        }
        return newPost;
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.createPost = createPost;
