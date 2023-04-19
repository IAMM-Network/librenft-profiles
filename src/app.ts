const hre = require("hardhat");
import express, {Application, Request, Response} from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import config from "config";
import log from "./logger";
import connect from "./db/connect";
import cors from "cors";

import routes from './routes';
import { AnyNaptrRecord } from "dns";


dotenv.config();

const app: Application = express();
const port: number = Number(process.env.PORT) || config.get<number>("port");
const host = process.env.HOST || config.get<string>("host");

//options for cors midddleware
var whitelist = ['https://iamm.network/', 'http://localhost:3000']
const options: cors.CorsOptions = {
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
app.use(cors(options));

//enable pre-flight
app.options('*', cors(options));

app.use(express.json());
app.use(express.urlencoded( { extended: false}));
app.use(helmet());

app.get('/', (req: Request, res: Response) => {
    res.json({ status: 'ok',
               message: 'Profiles API Working!'
            });
});

routes(app);
const db = connect();

app.listen(port, host, () => {
    // const db = await connect();
    //routes(app);
    log.info(`Server available at http://${host}:${port}`);
});
