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
exports.initEnv = exports.deployWithVerify = exports.deployContract = exports.waitForTx = exports.getAddrs = exports.ProtocolState = exports.ZERO_ADDRESS = void 0;
require("@nomiclabs/hardhat-ethers");
const signers_1 = require("@nomiclabs/hardhat-ethers/signers");
const fs_1 = __importDefault(require("fs"));
const ethers_1 = require("ethers");
const logger_1 = __importDefault(require("../../logger"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
var ProtocolState;
(function (ProtocolState) {
    ProtocolState[ProtocolState["Unpaused"] = 0] = "Unpaused";
    ProtocolState[ProtocolState["PublishingPaused"] = 1] = "PublishingPaused";
    ProtocolState[ProtocolState["Paused"] = 2] = "Paused";
})(ProtocolState = exports.ProtocolState || (exports.ProtocolState = {}));
function getAddrs() {
    const json = fs_1.default.readFileSync('addresses.json', 'utf8');
    const addrs = JSON.parse(json);
    return addrs;
}
exports.getAddrs = getAddrs;
function waitForTx(tx) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (yield tx).wait();
    });
}
exports.waitForTx = waitForTx;
function deployContract(tx) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield tx;
        yield result.deployTransaction.wait();
        return result;
    });
}
exports.deployContract = deployContract;
function deployWithVerify(tx, args, contractPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const deployedContract = yield deployContract(tx);
        let count = 0;
        let maxTries = 8;
        const runtimeHRE = require('hardhat');
        while (true) {
            yield delay(10000);
            try {
                console.log('Verifying contract at', deployedContract.address);
                yield runtimeHRE.run('verify:verify', {
                    address: deployedContract.address,
                    constructorArguments: args,
                    contract: contractPath,
                });
                break;
            }
            catch (error) {
                if (String(error).includes('Already Verified')) {
                    console.log(`Already verified contract at ${contractPath} at address ${deployedContract.address}`);
                    break;
                }
                if (++count == maxTries) {
                    console.log(`Failed to verify contract at ${contractPath} at address ${deployedContract.address}, error: ${error}`);
                    break;
                }
                console.log(`Retrying... Retry #${count}, last error: ${error}`);
            }
        }
        return deployedContract;
    });
}
exports.deployWithVerify = deployWithVerify;
// export async function initEnv(hre: HardhatRuntimeEnvironment): Promise<SignerWithAddress[]> {
//   const ethers = hre.ethers; // This allows us to access the hre (Hardhat runtime environment)'s injected ethers instance easily
//   const accounts = await ethers.getSigners(); // This returns an array of the default signers connected to the hre's ethers instance
//   const governance = accounts[1];
//   const treasury = accounts[2];
//   const user = accounts[3];
//   return [governance, treasury, user];
// }
function initEnv(input) {
    return __awaiter(this, void 0, void 0, function* () {
        //TODO: GARVAZ: Modify this function to get the addresses from .env file
        //const ethers = hre.ethers; // This allows us to access the hre (Hardhat runtime environment)'s injected ethers instance easily
        //const accounts = await ethers.getSigners(); // This returns an array of the default signers connected to the hre's ethers instance
        logger_1.default.info("Initiating HRE Env");
        let url = process.env.RPCURL || "http://localhost:8546";
        let customHttpProvider = new ethers_1.ethers.providers.JsonRpcProvider(url);
        logger_1.default.info("getting governance");
        let gvWallet = new ethers_1.ethers.Wallet(process.env.GOVERNANCE || "", customHttpProvider);
        let gvAddress = yield gvWallet.getAddress();
        const governance = yield signers_1.SignerWithAddress.create(customHttpProvider.getSigner(gvAddress));
        logger_1.default.info("getting treasury");
        let tsWallet = new ethers_1.ethers.Wallet(process.env.TREASURY || "", customHttpProvider);
        let tsAddress = yield tsWallet.getAddress();
        const treasury = yield signers_1.SignerWithAddress.create(customHttpProvider.getSigner(tsAddress));
        logger_1.default.info("getting user for contract");
        let hcWallet = new ethers_1.ethers.Wallet(process.env.USERCT || "", customHttpProvider);
        let hcAddress = yield hcWallet.getAddress();
        const user = yield signers_1.SignerWithAddress.create(customHttpProvider.getSigner(hcAddress));
        //const user = accounts[3];
        logger_1.default.info("Returning governance, treasury and user");
        return [governance, treasury, user];
    });
}
exports.initEnv = initEnv;
function delay(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => setTimeout(resolve, ms));
    });
}
