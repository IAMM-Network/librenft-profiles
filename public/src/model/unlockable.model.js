"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../logger"));
const UnlockableSchema = new mongoose_1.default.Schema({
    uuid: { type: String, required: false, unique: true },
    publicAddress: { type: String, required: true, unique: false },
    contractAddress: { type: String, required: true, unique: false },
    tokenId: { type: Number, required: true, unique: false },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    link: { type: String, required: true, unique: false }
}, { timestamps: true });
UnlockableSchema.pre('save', async function (next) {
    logger_1.default.info("Validating pre save");
    next();
});
const Unlockable = mongoose_1.default.model("Unlockable", UnlockableSchema);
exports.default = Unlockable;
