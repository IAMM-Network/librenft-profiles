"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NETWORKS_RPC_URL = void 0;
const types_1 = require("./helpers/types");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(process.env.KOVAN_RPC_URL);
const TENDERLY_FORK_ID = process.env.TENDERLY_FORK_ID || '';
const GWEI = 1000 * 1000 * 1000;
exports.NETWORKS_RPC_URL = {
    [types_1.eEthereumNetwork.kovan]: process.env.KOVAN_RPC_URL,
    [types_1.eEthereumNetwork.ropsten]: process.env.ROPSTEN_RPC_URL || "",
    [types_1.eEthereumNetwork.main]: process.env.MAINNET_RPC_URL || "",
    [types_1.eEthereumNetwork.hardhat]: 'http://localhost:8545',
    [types_1.eEthereumNetwork.harhatevm]: 'http://localhost:8545',
    [types_1.eEthereumNetwork.tenderlyMain]: `https://rpc.tenderly.co/fork/${TENDERLY_FORK_ID}`,
    [types_1.ePolygonNetwork.mumbai]: process.env.MUMBAI_RPC_URL,
    [types_1.ePolygonNetwork.matic]: process.env.POLYGON_RPC_URL,
    [types_1.eXDaiNetwork.xdai]: 'https://rpc.xdaichain.com/',
    [types_1.eGodWokenNetwork.gwTestnet]: process.env.GODWOKENTESTNET_RPC_URL,
    [types_1.eGodWokenNetwork.gwMainnet]: process.env.GODWOKENMAINNET_RPC_URL
};
