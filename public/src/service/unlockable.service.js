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
exports.getUnlockable = exports.createUnlockable = void 0;
const crypto_1 = require("crypto");
const ethers_1 = require("ethers");
const unlockable_model_1 = __importDefault(require("../model/unlockable.model"));
const logger_1 = __importDefault(require("../logger"));
const user_service_1 = require("./user.service");
function createUnlockable(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let pUnlockable = {
                publicAddress: input.publicAddress,
                contractAddress: input.contractAddress,
                tokenId: input.tokenId,
                link: input.link
            };
            logger_1.default.info(`tokenId: ${input.tokenId}`);
            const signatureInMessage = input.signedMessage;
            logger_1.default.info("Verifiying message");
            logger_1.default.info(JSON.stringify(pUnlockable));
            //const actualAddress = ethers.utils.verifyMessage(JSON.stringify(unlockable), signatureInMessage);
            //log.info(actualAddress);
            console.log(JSON.stringify(pUnlockable));
            const msgHash = ethers_1.ethers.utils.hashMessage(JSON.stringify(pUnlockable));
            const msgHashBytes = ethers_1.ethers.utils.arrayify(msgHash);
            const recoveredPubKey = ethers_1.ethers.utils.recoverPublicKey(msgHashBytes, signatureInMessage);
            const recoveredAddress = ethers_1.ethers.utils.recoverAddress(msgHashBytes, signatureInMessage);
            logger_1.default.info(`recoveredPubKey: ${recoveredPubKey}, recoveredAddress: ${recoveredAddress} `);
            if (recoveredAddress !== pUnlockable.publicAddress) {
                logger_1.default.error("Adresses don't match");
                throw new Error("Adresses don't match");
            }
            //get user by Address
            const userQuery = { publicAddress: recoveredAddress };
            const user = yield (0, user_service_1.findUser)(userQuery);
            if (!user) {
                throw new Error("User not found");
            }
            let newUnlockable = { uuid: (0, crypto_1.randomUUID)(), publicAddress: recoveredAddress, contractAddress: pUnlockable.contractAddress, tokenId: pUnlockable.tokenId, link: pUnlockable.link, user: user._id };
            return yield unlockable_model_1.default.create(newUnlockable);
        }
        catch (error) {
            logger_1.default.error(error.message);
            throw new Error(error);
        }
    });
}
exports.createUnlockable = createUnlockable;
function getUnlockable(query) {
    return __awaiter(this, void 0, void 0, function* () {
        let pSignedQuery = {
            publicAddress: query.publicAddress,
            contractAddress: query.contractAddress,
            tokenId: query.tokenId
        };
        const signatureInMessage = query.signedMessage;
        logger_1.default.info("Verifiying message");
        logger_1.default.info(JSON.stringify(pSignedQuery));
        console.log(JSON.stringify(pSignedQuery));
        const msgHash = ethers_1.ethers.utils.hashMessage(JSON.stringify(pSignedQuery));
        const msgHashBytes = ethers_1.ethers.utils.arrayify(msgHash);
        const recoveredPubKey = ethers_1.ethers.utils.recoverPublicKey(msgHashBytes, signatureInMessage);
        const recoveredAddress = ethers_1.ethers.utils.recoverAddress(msgHashBytes, signatureInMessage);
        logger_1.default.info(`recoveredPubKey: ${recoveredPubKey}, recoveredAddress: ${recoveredAddress} `);
        if (recoveredAddress !== pSignedQuery.publicAddress) {
            logger_1.default.error("Adresses don't match");
            throw new Error("Adresses don't match");
        }
        const dbUnlockable = yield unlockable_model_1.default.findOne(query).lean();
        if (dbUnlockable) {
            logger_1.default.info(dbUnlockable);
        }
        else {
            logger_1.default.info(`search of unlockable ${query.toJSON} did not produce a result`);
        }
        return dbUnlockable;
    });
}
exports.getUnlockable = getUnlockable;
