"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const pino_pretty_1 = __importDefault(require("pino-pretty"));
// const log = logger({
//     transport: {
//         target: "pino-pretty",
//         options: {
//             translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
//             ignore: "pid.hostname"
//         }
//     }
// });
const stream = (0, pino_pretty_1.default)({
    levelFirst: true,
    colorize: true,
    ignore: "time,hostname,pid",
});
const log = (0, pino_1.default)({
    name: "IAMM",
    level: process.env.NODE_ENV === "development" ? "debug" : "info",
}, stream);
exports.default = log;
