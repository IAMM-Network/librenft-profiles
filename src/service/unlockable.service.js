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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getUnlockable = exports.createUnlockable = void 0;
var crypto_1 = require("crypto");
var ethers_1 = require("ethers");
var unlockable_model_1 = require("../model/unlockable.model");
var logger_1 = require("../logger");
var user_service_1 = require("./user.service");
function createUnlockable(input) {
    return __awaiter(this, void 0, void 0, function () {
        var pUnlockable, signatureInMessage, msgHash, msgHashBytes, recoveredPubKey, recoveredAddress, userQuery, user, newUnlockable, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    pUnlockable = {
                        publicAddress: input.publicAddress,
                        contractAddress: input.contractAddress,
                        link: input.link
                    };
                    signatureInMessage = input.signedMessage;
                    logger_1["default"].info("Verifiying message");
                    logger_1["default"].info(JSON.stringify(pUnlockable));
                    //const actualAddress = ethers.utils.verifyMessage(JSON.stringify(unlockable), signatureInMessage);
                    //log.info(actualAddress);
                    console.log(JSON.stringify(pUnlockable));
                    msgHash = ethers_1.ethers.utils.hashMessage(JSON.stringify(pUnlockable));
                    msgHashBytes = ethers_1.ethers.utils.arrayify(msgHash);
                    recoveredPubKey = ethers_1.ethers.utils.recoverPublicKey(msgHashBytes, signatureInMessage);
                    recoveredAddress = ethers_1.ethers.utils.recoverAddress(msgHashBytes, signatureInMessage);
                    logger_1["default"].info("recoveredPubKey: ".concat(recoveredPubKey, ", recoveredAddress: ").concat(recoveredAddress, " "));
                    if (recoveredAddress !== pUnlockable.publicAddress) {
                        logger_1["default"].error("Adresses don't match");
                        throw new Error("Adresses don't match");
                    }
                    userQuery = { publicAddress: recoveredAddress };
                    return [4 /*yield*/, (0, user_service_1.findUser)(userQuery)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        throw new Error("User not found");
                    }
                    newUnlockable = { uuid: (0, crypto_1.randomUUID)(), publicAddress: recoveredAddress, contractAddress: pUnlockable.contractAddress, link: pUnlockable.link, user: user._id };
                    return [4 /*yield*/, unlockable_model_1["default"].create(newUnlockable)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    error_1 = _a.sent();
                    logger_1["default"].error(error_1.message);
                    throw new Error(error_1);
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.createUnlockable = createUnlockable;
function getUnlockable(query) {
    return __awaiter(this, void 0, void 0, function () {
        var pSignedQuery, signatureInMessage, msgHash, msgHashBytes, recoveredPubKey, recoveredAddress, dbUnlockable;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pSignedQuery = {
                        publicAddress: query.publicAddress,
                        contractAddress: query.contractAddress
                    };
                    signatureInMessage = query.signedMessage;
                    logger_1["default"].info("Verifiying message");
                    logger_1["default"].info(JSON.stringify(pSignedQuery));
                    console.log(JSON.stringify(pSignedQuery));
                    msgHash = ethers_1.ethers.utils.hashMessage(JSON.stringify(pSignedQuery));
                    msgHashBytes = ethers_1.ethers.utils.arrayify(msgHash);
                    recoveredPubKey = ethers_1.ethers.utils.recoverPublicKey(msgHashBytes, signatureInMessage);
                    recoveredAddress = ethers_1.ethers.utils.recoverAddress(msgHashBytes, signatureInMessage);
                    logger_1["default"].info("recoveredPubKey: ".concat(recoveredPubKey, ", recoveredAddress: ").concat(recoveredAddress, " "));
                    if (recoveredAddress !== pSignedQuery.publicAddress) {
                        logger_1["default"].error("Adresses don't match");
                        throw new Error("Adresses don't match");
                    }
                    return [4 /*yield*/, unlockable_model_1["default"].findOne(query).lean()];
                case 1:
                    dbUnlockable = _a.sent();
                    if (dbUnlockable) {
                        logger_1["default"].info(dbUnlockable);
                    }
                    else {
                        logger_1["default"].info("search of unlockable ".concat(query.toJSON, " did not produce a result"));
                    }
                    return [2 /*return*/, dbUnlockable];
            }
        });
    });
}
exports.getUnlockable = getUnlockable;
