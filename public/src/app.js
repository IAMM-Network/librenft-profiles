"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("./logger"));
const connect_1 = __importDefault(require("./db/connect"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || config_1.default.get("port");
const host = process.env.HOST || config_1.default.get("host");
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, helmet_1.default)());
app.get('/', (req, res) => {
    res.json({ status: 'ok',
        message: 'Profiles API Working!'
    });
});
(0, routes_1.default)(app);
app.listen(port, host, () => {
    logger_1.default.info(`Server available at http://${host}:${port}`);
    (0, connect_1.default)();
    (0, routes_1.default)(app);
});
