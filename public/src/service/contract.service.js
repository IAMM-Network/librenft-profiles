"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findContract = exports.createContract = void 0;
const contract_model_1 = require("../model/contract.model");
const logger_1 = __importDefault(require("../logger"));
async function createContract(input) {
    try {
        return await contract_model_1.Contract.create(input);
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.createContract = createContract;
async function findContract(query) {
    const dbContract = await contract_model_1.Contract.findOne(query).lean();
    if (dbContract) {
        logger_1.default.info(dbContract);
    }
    else {
        logger_1.default.info(`search of user ${query.toJSON} did not produce a result`);
    }
    return dbContract;
}
exports.findContract = findContract;
