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
exports.getUserHandler = exports.createUserHandler = void 0;
const user_service_1 = require("../service/user.service");
const logger_1 = __importDefault(require("../logger"));
function createUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, user_service_1.createUser)(req.body);
            return res.send(user.toJSON());
        }
        catch (e) {
            logger_1.default.error(e);
            return res.status(409).send(e.message);
        }
    });
}
exports.createUserHandler = createUserHandler;
function getUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userAddress = req.params.publicAddress;
            logger_1.default.info("searching public address: " + userAddress);
            const userQuery = { publicAddress: userAddress };
            const user = yield (0, user_service_1.findUser)(userQuery);
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
    });
}
exports.getUserHandler = getUserHandler;
