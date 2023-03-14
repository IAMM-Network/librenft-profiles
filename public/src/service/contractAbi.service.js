"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findABI = exports.createAbi = void 0;
const contract_model_1 = require("../model/contract.model");
const logger_1 = __importDefault(require("../logger"));
function createAbi(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield contract_model_1.ContractABI.create(input);
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.createAbi = createAbi;
function findABI(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbABI = yield contract_model_1.ContractABI.findOne(query).lean();
        if (dbABI) {
            logger_1.default.info(dbABI);
        }
        else {
            logger_1.default.info(`search of user ${query.toJSON} did not produce a result`);
        }
        return dbABI;
    });
}
exports.findABI = findABI;
