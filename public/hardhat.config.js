"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_wallets_1 = require("./helpers/test-wallets");
const types_1 = require("./helpers/types");
const hardhat_constants_1 = require("./helpers/hardhat-constants");
const helper_hardhat_config_1 = require("./helper-hardhat-config");
const dotenv_1 = __importDefault(require("dotenv"));
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: '../.env' });
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@typechain/hardhat");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require("hardhat-log-remover");
require("hardhat-spdx-license-identifier");
if (!process.env.SKIP_LOAD) {
    glob_1.default.sync('./tasks/**/*.ts').forEach(function (file) {
        require(path_1.default.resolve(file));
    });
}
const DEFAULT_BLOCK_GAS_LIMIT = 100000000429720; //12450000;
const MNEMONIC_PATH = "m/44'/60'/0'/0";
const MNEMONIC = process.env.MNEMONIC || '';
const MAINNET_FORK = process.env.MAINNET_FORK === 'true';
const TRACK_GAS = process.env.TRACK_GAS === 'true';
const BLOCK_EXPLORER_KEY = process.env.BLOCK_EXPLORER_KEY || '';
const getCommonNetworkConfig = (networkName, networkId) => ({
    url: helper_hardhat_config_1.NETWORKS_RPC_URL[networkName] ?? '',
    accounts: {
        mnemonic: MNEMONIC,
        path: MNEMONIC_PATH,
        initialIndex: 0,
        count: 20,
    },
    blockGasLimit: DEFAULT_BLOCK_GAS_LIMIT,
    gas: DEFAULT_BLOCK_GAS_LIMIT,
    gasPrice: 57471896077,
    allowUnlimitedContractSize: true,
    chainId: 71401,
    throwOnTransactionFailures: true,
    throwOnCallFailures: true,
});
const mainnetFork = MAINNET_FORK
    ? {
        blockNumber: 12012081,
        url: helper_hardhat_config_1.NETWORKS_RPC_URL['main'],
    }
    : undefined;
const config = {
    solidity: {
        compilers: [
            {
                version: '0.8.10',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                        details: {
                            yul: true,
                        },
                    },
                },
            },
        ],
    },
    defaultNetwork: "gwTestnet",
    networks: {
        kovan: getCommonNetworkConfig(types_1.eEthereumNetwork.kovan, 42),
        ropsten: getCommonNetworkConfig(types_1.eEthereumNetwork.ropsten, 3),
        main: getCommonNetworkConfig(types_1.eEthereumNetwork.main, 1),
        tenderlyMain: getCommonNetworkConfig(types_1.eEthereumNetwork.tenderlyMain, 3030),
        matic: getCommonNetworkConfig(types_1.ePolygonNetwork.matic, 137),
        sandbox: getCommonNetworkConfig(types_1.ePolygonNetwork.mumbai, 80001),
        mumbai: getCommonNetworkConfig(types_1.ePolygonNetwork.mumbai, 80001),
        xdai: getCommonNetworkConfig(types_1.eXDaiNetwork.xdai, 100),
        gwTestnet: getCommonNetworkConfig(types_1.eGodWokenNetwork.gwTestnet, 71401),
        hardhat: {
            hardfork: 'london',
            blockGasLimit: DEFAULT_BLOCK_GAS_LIMIT,
            gas: DEFAULT_BLOCK_GAS_LIMIT,
            gasPrice: 8000000000,
            chainId: hardhat_constants_1.HARDHATEVM_CHAINID,
            throwOnTransactionFailures: true,
            throwOnCallFailures: true,
            accounts: test_wallets_1.accounts.map(({ secretKey, balance }) => ({
                privateKey: secretKey,
                balance,
            })),
            forking: mainnetFork,
        },
        local: {
            url: 'http://127.0.0.1:8545/',
            accounts: {
                mnemonic: MNEMONIC,
                path: MNEMONIC_PATH,
                initialIndex: 0,
                count: 20,
            },
        },
    },
    gasReporter: {
        enabled: TRACK_GAS,
    },
    spdxLicenseIdentifier: {
        overwrite: false,
        runOnCompile: false,
    },
    etherscan: {
        apiKey: BLOCK_EXPLORER_KEY,
    },
};
exports.default = config;
