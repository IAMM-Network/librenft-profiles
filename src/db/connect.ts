import mongoose, { ConnectOptions } from "mongoose";
import * as dotenv from "dotenv";

import config from "config";
import log from "../logger";


function connect() {
    
    let dbUri = config.get<string>("dbUri");
    log.info("Config");
    //let dbUri = process.env.dbUri || "mongodb+srv://IAMMUSER:<pwd>@cluster0.hf1dq.mongodb.net/IAMM?retryWrites=true&w=majority";
    const password = process.env.mongoPassword ?? "";

    log.info(dbUri);

    dbUri = dbUri.replace("<pwd>", password);    

    return mongoose
        .connect(dbUri)
        .then( () => {
            log.info("Database connected");
        })
        .catch((error) => {
            log.error("db error", error);
            process.exit(1);
        })
}

export default connect;