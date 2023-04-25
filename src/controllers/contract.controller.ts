import {Request, Response, NextFunction} from "express";
import { createContract, findContract, getContracts } from "../service/contract.service";
import { findABI } from "../service/contractAbi.service";
import log from "../logger";
import { FilterQuery } from "mongoose";
import { ContractDocument, ContractABIDocument } from "../model/contract.model";

const crypto = require('crypto');

export async function createContractHandler(req: Request, res: Response, next: NextFunction) {
    
    try {      

        //Check ABI
        log.info("ABI UUID: " + req.body.abi);
        const contractABIQuery: FilterQuery<ContractABIDocument> = { uuid: req.body.abi};
        const contractABI = await findABI(contractABIQuery);

        if(contractABI){
            log.info(contractABI);
            const saveContract  = {
                uuid: crypto.randomUUID(),
                address: req.body.address,
                ownerAddress: req.body.ownerAddress,
                abi: contractABI._id,
                whiteList: req.body.whiteList
            }

            const contract = await createContract(saveContract);
            res.send(contract.toJSON())
        }
        else {
            res.status(400).send("Must specify a valid ABI uuid");
        }

        
    } catch (error:any) {
        log.error(error);
        return res.status(409).send(error.message);
    }
}

export async function getContractHandler(req: Request, res: Response, next: NextFunction) {
    
    try {

        const pPublicAddress = req.body.publicAddress;
        const pContractAddress = req.body.contractAddress;
        const pOwnerAddress = req.body.ownerAddress;
        log.info(`Searching contract for: ${pPublicAddress}, contract: ${pContractAddress}`);

        const contractQuery: FilterQuery<ContractDocument> = { publicAddress: pPublicAddress, contractAddress: pContractAddress, ownerAddress: pOwnerAddress};
        const contract = await findContract(contractQuery);

        if(contract){
            return res.send(contract);
        } else {
            return res.json('{"status":"error","message":"contract not found"}');
        }

    } catch (error:any) {
        log.error(error.message);
        return res.json(`{"status":"error","message":"Error getting the contract ${error.message} "}`);
    }


}

export async function getOwnerContractsHandler(req: Request, res: Response, next: NextFunction) {
    
    try {

        const pOwnerAddress = req.params.ownerAddress;

        log.info(`Searching contracts for: ${pOwnerAddress}`);

        const contractQuery: FilterQuery<ContractDocument> = { ownerAddress: pOwnerAddress};
        const contracts = await getContracts(contractQuery);

        if(contracts){
            return res.send(contracts);
        } else {
            return res.json('{"status":"error","message":"contract not found"}');
        }

    } catch (error:any) {
        log.error(error.message);
        return res.json(`{"status":"error","message":"Error getting the contract ${error.message} "}`);
    }


}