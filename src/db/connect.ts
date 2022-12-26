import mongoose, { ConnectOptions, MongoClient, ServerApiVersion} from "mongoose";
import config from "config";
import log from "../logger";
import dotenv from "dotenv";

dotenv.config();

function connect() {
    let dbUri = config.get<string>("dbUri");
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