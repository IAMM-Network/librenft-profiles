import {
  eEthereumNetwork,
  ePolygonNetwork,
  eXDaiNetwork,
  eGodWokenNetwork,
  iParamsPerNetwork,
  eNetwork
} from './helpers/types';

import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.KOVAN_RPC_URL);

const TENDERLY_FORK_ID = process.env.TENDERLY_FORK_ID || '';

const GWEI = 1000 * 1000 * 1000;

export const NETWORKS_RPC_URL: iParamsPerNetwork<string> = {
  [eEthereumNetwork.kovan]: process.env.KOVAN_RPC_URL,
  [eEthereumNetwork.ropsten]: process.env.ROPSTEN_RPC_URL,
  [eEthereumNetwork.main]: process.env.MAINNET_RPC_URL,
  [eEthereumNetwork.hardhat]: 'http://localhost:8545',
  [eEthereumNetwork.harhatevm]: 'http://localhost:8545',
  [eEthereumNetwork.tenderlyMain]: `https://rpc.tenderly.co/fork/${TENDERLY_FORK_ID}`,
  [ePolygonNetwork.mumbai]: process.env.MUMBAI_RPC_URL,
  [ePolygonNetwork.matic]: process.env.POLYGON_RPC_URL,
  [eXDaiNetwork.xdai]: 'https://rpc.xdaichain.com/',
  [eGodWokenNetwork.gwTestnet]: process.env.GODWOKENTESTNET_RPC_URL,
  [eGodWokenNetwork.gwMainnet]: process.env.GODWOKENMAINNET_RPC_URL
};
