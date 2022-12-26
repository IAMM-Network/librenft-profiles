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
exports.getUnlockableHandler = exports.createUnlockableHandler = void 0;
const unlockable_service_1 = require("../service/unlockable.service");
const logger_1 = __importDefault(require("../logger"));
function createUnlockableHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const unlockable = yield (0, unlockable_service_1.createUnlockable)(req.body);
            res.send(unlockable.toJSON());
        }
        catch (error) {
            logger_1.default.error(error);
            return res.status(409).send(error.message);
        }
    });
}
exports.createUnlockableHandler = createUnlockableHandler;
function getUnlockableHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pPublicAddress = req.body.publicAddress;
            const pContractAddress = req.body.contractAddress;
            const pSignedMessage = req.body.signedMessage;
            logger_1.default.info(`searching unlockable for: ${pPublicAddress}, contract: ${pContractAddress}`);
            const unlockableQuery = { publicAddress: pPublicAddress, contractAddress: pContractAddress, signedMessage: pSignedMessage };
            const unlockable = yield (0, unlockable_service_1.getUnlockable)(unlockableQuery);
            if (unlockable) {
                return res.send(unlockable);
            }
            else {
                return res.json('{"status":"error","message":"Unlockable not found"}');
            }
        }
        catch (error) {
            logger_1.default.error(error.message);
            return res.json(`{"status":"error","message":"Error getting the unlockable ${error.message} "}`);
        }
    });
}
exports.getUnlockableHandler = getUnlockableHandler;
