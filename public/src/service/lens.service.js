"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLensUser = exports.getSigNonce = exports.setDispatcher = exports.createPost = exports.createProfile = void 0;
const typechain_types_1 = require("../typechain-types");
const utils_1 = require("./helpers/utils");
const utils_2 = require("ethers/lib/utils");
const post_model_1 = __importDefault(require("../model/post.model"));
const logger_1 = __importDefault(require("../logger"));
const bignumber_1 = require("@ethersproject/bignumber");
const user_service_1 = require("./user.service");
const hre = require("hardhat");
async function createProfile(dbUser) {
    try {
        const [governance, , user] = await (0, utils_1.initEnv)(hre);
        const addrs = (0, utils_1.getAddrs)();
        const lensHub = typechain_types_1.LensHub__factory.connect(addrs['lensHub proxy'], governance);
        console.log(`Profile ID by handle: ${await lensHub.getProfileIdByHandle('zer0dot')}`);
        console.log(`waitlisting ${user.address}`);
        await (0, utils_1.waitForTx)(lensHub.whitelistProfileCreator(user.address, true));
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
            followModule: utils_1.ZERO_ADDRESS,
            followModuleInitData: [],
            followNFTURI: dbUser.followNFTURI,
        };
        logger_1.default.info(`Lenshub creating profile for ${dbUser.publicAddress}`);
        await (0, utils_1.waitForTx)(lensHub.createProfile(inputStruct));
        console.log(`Total supply (should be 1): ${await lensHub.totalSupply()}`);
        console.log(`Profile owner: ${await lensHub.ownerOf(1)}, user address (should be the same): ${user.address}`);
        console.log(`Profile ID by handle: ${await lensHub.getProfileIdByHandle('zer0dot')}, user address (should be the same): ${user.address}`);
    }
    catch (error) {
        logger_1.default.error(error);
        throw new Error(error);
    }
}
exports.createProfile = createProfile;
async function createPost(dbPost) {
    try {
        let newPost;
        //get user by Address
        const userQuery = { publicAddress: dbPost.publicAddress };
        const _isLensUser = await isLensUser(userQuery);
        if (_isLensUser) {
            const [governance, treasury, user] = await (0, utils_1.initEnv)(hre);
            const addrs = (0, utils_1.getAddrs)();
            const freeCollectModuleAddr = addrs['free collect module'];
            const lensHub = typechain_types_1.LensHub__factory.connect(addrs['lensHub proxy'], governance);
            const newdbPost = {
                ...dbPost,
                collectModule: freeCollectModuleAddr,
                collectModuleInitData: utils_2.defaultAbiCoder.encode(['bool'], [true]),
                referenceModule: utils_1.ZERO_ADDRESS,
                referenceModuleInitData: []
            };
            newPost = await post_model_1.default.create(newdbPost);
            const inputStruct = {
                profileId: 1,
                contentURI: dbPost.contentURI,
                collectModule: freeCollectModuleAddr,
                collectModuleInitData: utils_2.defaultAbiCoder.encode(['bool'], [true]),
                referenceModule: utils_1.ZERO_ADDRESS,
                referenceModuleInitData: [],
            };
            await (0, utils_1.waitForTx)(lensHub.connect(user).post(inputStruct));
            console.log(await lensHub.getPub(1, 1));
        }
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
async function setDispatcher(dispatcher) {
    try {
        //get user by Address
        const userQuery = { publicAddress: dispatcher.publicAddress };
        const _isLensUser = await isLensUser(userQuery);
        if (_isLensUser) {
            const [governance, treasury, user] = await (0, utils_1.initEnv)(hre);
            const addrs = (0, utils_1.getAddrs)();
            const freeCollectModuleAddr = addrs['free collect module'];
            const lensHub = typechain_types_1.LensHub__factory.connect(addrs['lensHub proxy'], governance);
            const _eip712Sig = dispatcher.signedMessage;
            const eip712st = {
                v: _eip712Sig.v,
                r: _eip712Sig.r,
                s: _eip712Sig.s,
                deadline: _eip712Sig.deadline,
            };
            const setDispSt = {
                profileId: dispatcher.profileId,
                dispatcher: dispatcher.dispatcher,
                sig: eip712st,
            };
            //Garvaz
            console.log('--## TxDispatcher ##--');
            const txDispatcher = await (0, utils_1.waitForTx)(lensHub.setDispatcherWithSig(setDispSt));
            console.log(txDispatcher);
        }
        return dispatcher;
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.setDispatcher = setDispatcher;
async function getSigNonce(query) {
    //get user by Address
    const userQuery = { publicAddress: query.publicAddress };
    const dbUser = await (0, user_service_1.findUser)(userQuery);
    if (dbUser) {
        logger_1.default.info("Getting signers");
        //Get signers
        const [governance, treasury, user] = await (0, utils_1.initEnv)(hre);
        const addrs = (0, utils_1.getAddrs)();
        //log.info(governance);
        const lensHub = typechain_types_1.LensHub__factory.connect(addrs['lensHub proxy'], user);
        const sigNonce = await lensHub.sigNonces(query.publicAddress);
        console.log(`SigNonce: ${sigNonce}`);
        return [sigNonce, false];
    }
    else {
        return [bignumber_1.BigNumber.from('-1'), true];
    }
}
exports.getSigNonce = getSigNonce;
async function isLensUser(query) {
    try {
        //get user by Address
        const userQuery = { publicAddress: query.publicAddress };
        const dbUser = await (0, user_service_1.findUser)(userQuery);
        if (dbUser) {
            logger_1.default.info("Getting signers");
            //Get signers
            const [governance, treasury, user] = await (0, utils_1.initEnv)(hre);
            const addrs = (0, utils_1.getAddrs)();
            const lensHub = typechain_types_1.LensHub__factory.connect(addrs['lensHub proxy'], governance);
            logger_1.default.info(`Getting profile id by handle ${dbUser.handle}`);
            let handle = dbUser.handle;
            const profileID = await lensHub.getProfileIdByHandle(handle);
            console.log(`Profile ID by handle: ${profileID}`);
            if (profileID) {
                return true;
            }
        }
        return false;
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.isLensUser = isLensUser;
