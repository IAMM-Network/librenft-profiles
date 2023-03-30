"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findABI = exports.createAbi = void 0;
const contract_model_1 = require("../model/contract.model");
const logger_1 = __importDefault(require("../logger"));
async function createAbi(input) {
    try {
        return await contract_model_1.ContractABI.create(input);
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.createAbi = createAbi;
async function findABI(query) {
    const dbABI = await contract_model_1.ContractABI.findOne(query).lean();
    if (dbABI) {
        logger_1.default.info(dbABI);
    }
    else {
        logger_1.default.info(`search of user ${query.toJSON} did not produce a result`);
    }
    return dbABI;
}
exports.findABI = findABI;
