"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
//import config from "config";
const logger_1 = __importDefault(require("../logger"));
function connect() {
    var _a;
    //let dbUri = config.get<string>("dbUri");
    dotenv.config();
    logger_1.default.info("Config");
    let dbUri = process.env.DBURI || "mongodb+srv://IAMMUSER:<pwd>@cluster0.hf1dq.mongodb.net/IAMM?retryWrites=true&w=majority";
    const password = (_a = process.env.MONGOPASSWORD) !== null && _a !== void 0 ? _a : "";
    logger_1.default.info(dbUri);
    logger_1.default.info("pwd: " + password);
    dbUri = dbUri.replace("<pwd>", password);
    return mongoose_1.default
        .connect(dbUri)
        .then(() => {
        logger_1.default.info("Database connected");
    })
        .catch((error) => {
        logger_1.default.error("db error", error);
        process.exit(1);
    });
}
exports.default = connect;
