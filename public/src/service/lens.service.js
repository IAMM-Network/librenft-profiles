"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProfile = void 0;
const logger_1 = __importDefault(require("../logger"));
const typechain_types_1 = require("../typechain-types");
const utils_1 = require("./helpers/utils");
const bignumber_1 = require("@ethersproject/bignumber");
const hre = require("hardhat");
function createProfile(dbUser) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info("Getting signers");
            //Get signers
            const [governance, treasury, user] = yield (0, utils_1.initEnv)(hre);
            const addrs = (0, utils_1.getAddrs)();
            //log.info(governance);
            const lensHub = typechain_types_1.LensHub__factory.connect(addrs['lensHub proxy'], user);
            //Validate if the profile Exists
            logger_1.default.info(`Getting profile id by handle ${dbUser.handle}`);
            let handle = dbUser.handle;
            const profileID = yield lensHub.getProfileIdByHandle(handle);
            console.log(`Profile ID by handle: ${profileID}`);
            if (profileID > bignumber_1.BigNumber.from('0x0')) {
                logger_1.default.error("Existing handler");
                return;
            }
            logger_1.default.info("waitlisting");
            //whitelist
            yield (0, utils_1.waitForTx)(lensHub.whitelistProfileCreator(user.address, true, {
                gasLimit: 12450000,
                gasPrice: 37257824143
            }));
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
            yield (0, utils_1.waitForTx)(lensHub.connect(user).createProfile(inputStruct));
            console.log(`Total supply (should be 1): ${yield lensHub.totalSupply()}`);
            console.log(`Profile owner: ${yield lensHub.ownerOf(1)}, user address (should be the same): ${user.address}`);
            console.log(`Profile ID by handle: ${yield lensHub.getProfileIdByHandle('zer0dot')}, user address (should be the same): ${user.address}`);
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.createProfile = createProfile;
