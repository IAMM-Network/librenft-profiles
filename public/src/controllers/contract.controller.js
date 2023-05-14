"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOwnerContractsHandler = exports.getContractHandler = exports.createContractHandler = void 0;
const contract_service_1 = require("../service/contract.service");
const contractAbi_service_1 = require("../service/contractAbi.service");
const logger_1 = __importDefault(require("../logger"));
const crypto = require('crypto');
async function createContractHandler(req, res, next) {
    try {
        //Check ABI
        logger_1.default.info("ABI UUID: " + req.body.abi);
        const contractABIQuery = { uuid: req.body.abi };
        const contractABI = await (0, contractAbi_service_1.findABI)(contractABIQuery);
        if (contractABI) {
            logger_1.default.info(contractABI);
            const saveContract = {
                uuid: crypto.randomUUID(),
                address: req.body.address,
                ownerAddress: req.body.ownerAddress,
                abi: contractABI._id,
                whiteList: req.body.whiteList
            };
            const contract = await (0, contract_service_1.createContract)(saveContract);
            res.send(contract.toJSON());
        }
        else {
            res.status(400).send("Must specify a valid ABI uuid");
        }
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(409).send(error.message);
    }
}
exports.createContractHandler = createContractHandler;
async function getContractHandler(req, res, next) {
    try {
        const pPublicAddress = req.body.publicAddress;
        const pContractAddress = req.body.contractAddress;
        const pOwnerAddress = req.body.ownerAddress;
        logger_1.default.info(`Searching contract for: ${pPublicAddress}, contract: ${pContractAddress}`);
        const contractQuery = { publicAddress: pPublicAddress, contractAddress: pContractAddress, ownerAddress: pOwnerAddress };
        const contract = await (0, contract_service_1.findContract)(contractQuery);
        if (contract) {
            return res.send(contract);
        }
        else {
            return res.json('{"status":"error","message":"contract not found"}');
        }
    }
    catch (error) {
        logger_1.default.error(error.message);
        return res.json(`{"status":"error","message":"Error getting the contract ${error.message} "}`);
    }
}
exports.getContractHandler = getContractHandler;
async function getOwnerContractsHandler(req, res, next) {
    try {
        const pOwnerAddress = req.params.ownerAddress;
        logger_1.default.info(`Searching contracts for: ${pOwnerAddress}`);
        const contractQuery = { ownerAddress: pOwnerAddress };
        const contracts = await (0, contract_service_1.getContracts)(contractQuery);
        if (contracts) {
            return res.status(200).json({ status: "ok", message: "Contracts found", data: contracts });
        }
        else {
            return res.status(200).json({ status: "error", message: "Contract not found" });
        }
    }
    catch (error) {
        logger_1.default.error(error.message);
        return res.status(200).json({ status: "error", message: `${error.message}` });
    }
}
exports.getOwnerContractsHandler = getOwnerContractsHandler;
