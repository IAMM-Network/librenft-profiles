import '@nomiclabs/hardhat-ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Contract, ContractTransaction, Wallet } from 'ethers';
import fs from 'fs';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { ethers } from 'ethers';
import { DocumentDefinition, FilterQuery } from "mongoose";
import User, { UserDocument } from "../../model/user.model";
import log from "../../logger";
import dotenv from "dotenv";
dotenv.config();

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export enum ProtocolState {
  Unpaused,
  PublishingPaused,
  Paused,
}

export function getAddrs(): any {
  const json = fs.readFileSync('addresses.json', 'utf8');
  const addrs = JSON.parse(json);
  return addrs;
}

export async function waitForTx(tx: Promise<ContractTransaction>) {
  await (await tx).wait();
}

export async function deployContract(tx: any): Promise<Contract> {
  const result = await tx;
  await result.deployTransaction.wait();
  return result;
}

export async function deployWithVerify(
  tx: any,
  args: any,
  contractPath: string
): Promise<Contract> {
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
    } catch (error) {
      if (String(error).includes('Already Verified')) {
        console.log(
          `Already verified contract at ${contractPath} at address ${deployedContract.address}`
        );
        break;
      }
      if (++count == maxTries) {
        console.log(
          `Failed to verify contract at ${contractPath} at address ${deployedContract.address}, error: ${error}`
        );
        break;
      }
      console.log(`Retrying... Retry #${count}, last error: ${error}`);
    }
  }

  return deployedContract;
}

// export async function initEnv(hre: HardhatRuntimeEnvironment): Promise<SignerWithAddress[]> {
//   const ethers = hre.ethers; // This allows us to access the hre (Hardhat runtime environment)'s injected ethers instance easily

//   const accounts = await ethers.getSigners(); // This returns an array of the default signers connected to the hre's ethers instance
//   const governance = accounts[1];
//   const treasury = accounts[2];
//   const user = accounts[3];

//   return [governance, treasury, user];
// }

export async function initEnv(input: DocumentDefinition<UserDocument>): Promise<SignerWithAddress[]> {

  //TODO: GARVAZ: Modify this function to get the addresses from .env file
  
  //const ethers = hre.ethers; // This allows us to access the hre (Hardhat runtime environment)'s injected ethers instance easily

  //const accounts = await ethers.getSigners(); // This returns an array of the default signers connected to the hre's ethers instance
  log.info("Initiating HRE Env");

  let url = process.env.RPCURL || "http://localhost:8546";
  let customHttpProvider = new ethers.providers.JsonRpcProvider(url);

  log.info("getting governance")
  let gvWallet: Wallet =  new ethers.Wallet(process.env.GOVERNANCE || "", customHttpProvider); 
  let gvAddress = await gvWallet.getAddress();
  const governance = await SignerWithAddress.create(customHttpProvider.getSigner(gvAddress));

  log.info("getting treasury");
  let tsWallet: Wallet =  new ethers.Wallet(process.env.TREASURY || "", customHttpProvider); 
  let tsAddress = await tsWallet.getAddress();
  const treasury =  await SignerWithAddress.create(customHttpProvider.getSigner(tsAddress));

  log.info("getting user for contract");
  let hcWallet: Wallet = new ethers.Wallet(process.env.USERCT || "", customHttpProvider); 
  let hcAddress = await hcWallet.getAddress();
  const user = await SignerWithAddress.create(customHttpProvider.getSigner(hcAddress)); 
  //const user = accounts[3];
  log.info("Returning governance, treasury and user");

  return [governance, treasury, user];
}

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
