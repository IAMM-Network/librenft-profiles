import { Express, Application, Request, Response, NextFunction} from "express";
import { createUnlockableHandler, getUnlockableHandler } from './controllers/unlockable.controller';
import { createUserHandler, getUserHandler } from './controllers/user.controller';
import { createContractHandler, getContractHandler } from './controllers/contract.controller';
import { validateRequest } from "./middleware";
import { createUserSchema } from "./schema/user.schema";
import { createUnlockableSchema, queryUnlockableSchema } from "./schema/unlockable.schema";
import { createContractSchema, queryContractSchema } from "./schema/contract.schema";


function routes(app: Application){

    app.post(
        "/api/profiles", validateRequest(createUserSchema), createUserHandler 
    );

    app.get(
        "/api/profiles/:publicAddress", getUserHandler
    );

    app.post(
        "/api/unlockables", validateRequest(createUnlockableSchema), createUnlockableHandler     
    );

    app.get(
        "/api/unlockables", validateRequest(queryUnlockableSchema), getUnlockableHandler
    );

    app.post(
        "/api/contracts", validateRequest(createContractSchema), createContractHandler
    )

    app.get(
        "/api/contracts/:contractAddress", getContractHandler
    )
}

export default routes;