"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    publicAddress: { type: String, required: true, unique: true },
    handle: { type: String, required: true, unique: true },
    imageURI: { type: String, required: false, unique: false },
    followNFTURI: { type: String, required: false, unique: false },
    email: { type: String, required: false, unique: false }
}, { timestamps: true });
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
