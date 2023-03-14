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
exports.findContract = exports.createContract = void 0;
const contract_model_1 = require("../model/contract.model");
const logger_1 = __importDefault(require("../logger"));
function createContract(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield contract_model_1.Contract.create(input);
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.createContract = createContract;
function findContract(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbContract = yield contract_model_1.Contract.findOne(query).lean();
        if (dbContract) {
            logger_1.default.info(dbContract);
        }
        else {
            logger_1.default.info(`search of user ${query.toJSON} did not produce a result`);
        }
        return dbContract;
    });
}
exports.findContract = findContract;
