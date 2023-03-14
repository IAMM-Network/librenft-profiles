"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefenderSigner = exports.getMnemonicWallet = exports.getPrivateKeyWallet = void 0;
const ethers_1 = require("ethers");
const ethers_2 = require("defender-relay-client/lib/ethers");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../.env' });
const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
const MNEMONIC = process.env.MNEMONIC || '';
const DEFENDER_API_KEY = process.env.DEFENDER_API_KEY || '';
const DEFENDER_SECRET_KEY = process.env.DEFENDER_SECRET_KEY || '';
const getPrivateKeyWallet = () => new ethers_1.Wallet(PRIVATE_KEY);
exports.getPrivateKeyWallet = getPrivateKeyWallet;
const getMnemonicWallet = () => ethers_1.Wallet.fromMnemonic(MNEMONIC);
exports.getMnemonicWallet = getMnemonicWallet;
const getDefenderSigner = () => {
    const credentials = { apiKey: DEFENDER_API_KEY, apiSecret: DEFENDER_SECRET_KEY };
    const provider = new ethers_2.DefenderRelayProvider(credentials);
    return new ethers_2.DefenderRelaySigner(credentials, provider, { speed: 'fast' });
};
exports.getDefenderSigner = getDefenderSigner;
