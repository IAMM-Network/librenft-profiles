import express, {Application, Request, Response} from "express";
import helmet from "helmet";
import config from "config";
import log from "./logger";
import connect from "./db/connect";

import routes from './routes';



const app: Application = express();
const port = config.get<number>("port");
const host = config.get<string>("host");


app.use(express.json());
app.use(express.urlencoded( { extended: false}));
app.use(helmet());

app.get('/', (req: Request, res: Response) => {
    res.json({ status: 'ok',
               message: 'Profiles API Working!'
            });
});

routes(app);

app.listen(port, host, () => {
    log.info(`Server available at http://${host}:${port}`);
    connect();
    routes(app);
});
