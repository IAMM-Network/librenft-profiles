"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnlockableHandler = exports.createUnlockableHandler = void 0;
const unlockable_service_1 = require("../service/unlockable.service");
const logger_1 = __importDefault(require("../logger"));
async function createUnlockableHandler(req, res, next) {
    try {
        const unlockable = await (0, unlockable_service_1.createUnlockable)(req.body);
        res.status(200).json({ status: "ok", message: "Unlockable created", data: unlockable });
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(400).send({ status: "error", message: error.message, data: error.message });
    }
}
exports.createUnlockableHandler = createUnlockableHandler;
async function getUnlockableHandler(req, res, next) {
    try {
        const pPublicAddress = req.body.publicAddress;
        const pContractAddress = req.body.contractAddress;
        const pSignedMessage = req.body.signedMessage;
        logger_1.default.info(`searching unlockable for: ${pPublicAddress}, contract: ${pContractAddress}`);
        const unlockableQuery = { publicAddress: pPublicAddress, contractAddress: pContractAddress, signedMessage: pSignedMessage };
        const unlockable = await (0, unlockable_service_1.getUnlockable)(unlockableQuery);
        if (unlockable) {
            return res.send(unlockable);
        }
        else {
            return res.json({ status: "error", message: "Unlockable not found" });
        }
    }
    catch (error) {
        logger_1.default.error(error.message);
        return res.json({ status: "error", message: "Error getting the unlockable", data: error.message });
    }
}
exports.getUnlockableHandler = getUnlockableHandler;
