"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var profileType;
(function (profileType) {
    profileType[profileType["collector"] = 1] = "collector";
    profileType[profileType["creator"] = 2] = "creator";
    profileType[profileType["builder"] = 3] = "builder";
    profileType[profileType["critic"] = 4] = "critic";
})(profileType || (profileType = {}));
const UserSchema = new mongoose_1.default.Schema({
    publicAddress: { type: String, required: true, unique: true },
    handle: { type: String, required: true, unique: true },
    imageURI: { type: String, required: false, unique: false },
    followNFTURI: { type: String, required: false, unique: false },
    profileType: { type: Number, required: false, unique: false },
    profileId: { type: Number, required: false, unique: false },
}, { timestamps: true });
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
