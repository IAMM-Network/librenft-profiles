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
exports.findUser = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
const logger_1 = __importDefault(require("../logger"));
function createUser(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield user_model_1.default.create(input);
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.createUser = createUser;
function findUser(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbUser = yield user_model_1.default.findOne(query).lean();
        if (dbUser) {
            logger_1.default.info(dbUser);
        }
        else {
            logger_1.default.info(`search of user ${query.toJSON} did not produce a result`);
        }
        return dbUser;
    });
}
exports.findUser = findUser;
