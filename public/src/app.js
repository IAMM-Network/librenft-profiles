"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hre = require("hardhat");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("./logger"));
const connect_1 = __importDefault(require("./db/connect"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || config_1.default.get("port");
const host = process.env.HOST || config_1.default.get("host");
//options for cors midddleware
var whitelist = ['https://iamm.network/', 'http://localhost:3000'];
const options = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
        'Acess-Control-Allow-Origin',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: '*',
    preflightContinue: true,
    optionsSuccessStatus: 204
};
//use cors middleware
app.use((0, cors_1.default)(options));
//enable pre-flight
app.options('*', (0, cors_1.default)(options));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, helmet_1.default)());
app.get('/', (req, res) => {
    res.json({ status: 'ok',
        message: 'Profiles API Working!'
    });
});
(0, routes_1.default)(app);
const db = (0, connect_1.default)();
app.listen(port, host, () => {
    // const db = await connect();
    //routes(app);
    logger_1.default.info(`Server available at http://${host}:${port}`);
});
