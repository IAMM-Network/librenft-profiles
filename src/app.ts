import express, {Application, Request, Response} from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import config from "config";
import log from "./logger";
import connect from "./db/connect";

import routes from './routes';

dotenv.config();


const app: Application = express();
const port: number = Number(process.env.PORT) || config.get<number>("port");
const host = process.env.HOST || config.get<string>("host");


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
