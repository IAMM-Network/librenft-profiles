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
UnlockableSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info("Validating pre save");
        next();
    });
});
const Unlockable = mongoose_1.default.model("Unlockable", UnlockableSchema);
exports.default = Unlockable;
