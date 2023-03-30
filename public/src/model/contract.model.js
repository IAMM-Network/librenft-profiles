"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = exports.ContractABI = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ContractABISchema = new mongoose_1.default.Schema({
    uuid: { type: String, required: false, unique: true },
    version: { type: Number, required: true, unique: false },
    abi: { type: String, required: false, unique: false },
    type: { type: Number, required: true, unique: false }
}, { timestamps: true });
const ContractABI = mongoose_1.default.model("ContractABI", ContractABISchema);
exports.ContractABI = ContractABI;
const ContractSchema = new mongoose_1.default.Schema({
    uuid: { type: String, required: false, unique: true },
    address: { type: String, required: false, unique: false },
    ownerAddress: { type: String, required: false, unique: false },
    abi: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'ContractABI' },
    whiteList: { type: String, required: false, unique: false },
}, { timestamps: true });
const Contract = mongoose_1.default.model("Contract", ContractSchema);
exports.Contract = Contract;
ContractSchema.pre('save', async function preSaveFunction(next) {
    const existingABI = await ContractABI.findOne({ uuid: this.abi });
    if (!existingABI) {
        throw new Error(`No existing ABI ${this.abi}`);
    }
    this;
    next();
});
