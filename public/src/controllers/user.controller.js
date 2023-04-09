"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserSigNonces = exports.getUserHandler = exports.createDispatcher = exports.createUserHandler = void 0;
const user_service_1 = require("../service/user.service");
const lens_service_1 = require("../service/lens.service");
const logger_1 = __importDefault(require("../logger"));
async function createUserHandler(req, res) {
    try {
        const user = await (0, user_service_1.createUser)(req.body);
        return res.status(200).json({ status: "ok", message: "User handler created", data: user });
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send({ status: "error", message: e.message, data: e.message });
    }
}
exports.createUserHandler = createUserHandler;
async function createDispatcher(req, res) {
    try {
        const dispatcher = await (0, lens_service_1.setDispatcher)(req.body);
        return res.status(200).json({ status: "ok", message: "User Dispatcher was set", data: dispatcher });
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send({ status: "error", message: e.message, data: e.message });
    }
}
exports.createDispatcher = createDispatcher;
async function getUserHandler(req, res) {
    try {
        const userAddress = req.params.publicAddress;
        logger_1.default.info("searching public address: " + userAddress);
        const userQuery = { publicAddress: userAddress };
        const user = await (0, user_service_1.findUser)(userQuery);
        if (user) {
            return res.status(200).json({ status: "ok", message: "User handler found", data: user });
        }
        else {
            return res.status(404).json({ status: "error", message: "User not found" });
        }
    }
    catch (error) {
        logger_1.default.error(error.message);
    }
}
exports.getUserHandler = getUserHandler;
async function getUserSigNonces(req, res) {
    try {
        const userAddress = req.params.publicAddress;
        logger_1.default.info("searching nonces for public address: " + userAddress);
        const userQuery = { publicAddress: userAddress };
        const [nonce, error] = await (0, lens_service_1.getSigNonce)(userQuery);
        if (!error) {
            return res.status(200).json({ status: "ok", message: "User SigNonce found", data: nonce });
        }
        else {
            return res.status(404).json({ status: "error", message: "User signonce not found" });
        }
    }
    catch (error) {
        logger_1.default.error(error.message);
    }
}
exports.getUserSigNonces = getUserSigNonces;
