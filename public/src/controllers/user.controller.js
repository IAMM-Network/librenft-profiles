"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserHandler = exports.createUserHandler = void 0;
const user_service_1 = require("../service/user.service");
const logger_1 = __importDefault(require("../logger"));
async function createUserHandler(req, res) {
    try {
        const user = await (0, user_service_1.createUser)(req.body);
        return res.send(user.toJSON());
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
}
exports.createUserHandler = createUserHandler;
async function getUserHandler(req, res) {
    try {
        const userAddress = req.params.publicAddress;
        logger_1.default.info("searching public address: " + userAddress);
        const userQuery = { publicAddress: userAddress };
        const user = await (0, user_service_1.findUser)(userQuery);
        if (user) {
            return res.send(user);
        }
        else {
            return res.json('{"status":"error","message":"User not found"}');
        }
    }
    catch (error) {
        logger_1.default.error(error.message);
    }
}
exports.getUserHandler = getUserHandler;
