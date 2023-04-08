import { Express, Application, Request, Response, NextFunction} from "express";
import { createUnlockableHandler, getUnlockableHandler } from './controllers/unlockable.controller';
import { createUserHandler, getUserHandler } from './controllers/user.controller';
import { createContractHandler, getContractHandler } from './controllers/contract.controller';
import { createPostHandler } from './controllers/post.controller';
import { validateRequest } from "./middleware";
import { createUserSchema } from "./schema/user.schema";
import { createUnlockableSchema, queryUnlockableSchema } from "./schema/unlockable.schema";
import { createContractSchema, queryContractSchema } from "./schema/contract.schema";
import { createPostSchema } from "./schema/post.schema";


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

    app.get(
        "/health", (req: Request, res: Response) => {
            res.send("API Working");
        }
    )

    app.post(
        "/api/posts", validateRequest(createPostSchema), createPostHandler
    )

}

export default routes;