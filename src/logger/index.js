"use strict";
exports.__esModule = true;
var pino_1 = require("pino");
var log = (0, pino_1["default"])({
    transport: {
        target: "pino-pretty",
        options: {
            translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
            ignore: "pid.hostname"
        }
    }
});
exports["default"] = log;
