"use strict";
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
async function waitForTx(tx) {
    await (await tx).wait();
}
exports.waitForTx = waitForTx;
async function deployContract(tx) {
    const result = await tx;
    await result.deployTransaction.wait();
    return result;
}
exports.deployContract = deployContract;
async function deployWithVerify(tx, args, contractPath) {
    const deployedContract = await deployContract(tx);
    let count = 0;
    let maxTries = 8;
    const runtimeHRE = require('hardhat');
    while (true) {
        await delay(10000);
        try {
            console.log('Verifying contract at', deployedContract.address);
            await runtimeHRE.run('verify:verify', {
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
async function initEnv(input) {
    //TODO: GARVAZ: Modify this function to get the addresses from .env file
    //const ethers = hre.ethers; // This allows us to access the hre (Hardhat runtime environment)'s injected ethers instance easily
    //const accounts = await ethers.getSigners(); // This returns an array of the default signers connected to the hre's ethers instance
    logger_1.default.info("Initiating HRE Env");
    let url = process.env.RPCURL || "http://localhost:8546";
    let customHttpProvider = new ethers_1.ethers.providers.JsonRpcProvider(url);
    logger_1.default.info("getting governance");
    let gvWallet = new ethers_1.ethers.Wallet(process.env.GOVERNANCE || "", customHttpProvider);
    let gvAddress = await gvWallet.getAddress();
    const governance = await signers_1.SignerWithAddress.create(customHttpProvider.getSigner(gvAddress));
    logger_1.default.info("getting treasury");
    let tsWallet = new ethers_1.ethers.Wallet(process.env.TREASURY || "", customHttpProvider);
    let tsAddress = await tsWallet.getAddress();
    const treasury = await signers_1.SignerWithAddress.create(customHttpProvider.getSigner(tsAddress));
    logger_1.default.info("getting user for contract");
    let hcWallet = new ethers_1.ethers.Wallet(process.env.USERCT || "", customHttpProvider);
    let hcAddress = await hcWallet.getAddress();
    const user = await signers_1.SignerWithAddress.create(customHttpProvider.getSigner(hcAddress));
    //const user = accounts[3];
    logger_1.default.info("Returning governance, treasury and user");
    return [governance, treasury, user];
}
exports.initEnv = initEnv;
async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
