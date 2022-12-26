"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("../logger"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function connect() {
    var _a;
    let dbUri = config_1.default.get("dbUri");
    const password = (_a = process.env.mongoPassword) !== null && _a !== void 0 ? _a : "";
    logger_1.default.info(dbUri);
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
