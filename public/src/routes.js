"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unlockable_controller_1 = require("./controllers/unlockable.controller");
const user_controller_1 = require("./controllers/user.controller");
const middleware_1 = require("./middleware");
const user_schema_1 = require("./schema/user.schema");
const unlockable_schema_1 = require("./schema/unlockable.schema");
function routes(app) {
    app.post("/api/profiles", (0, middleware_1.validateRequest)(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
    app.get("/api/profiles/:publicAddress", user_controller_1.getUserHandler);
    app.post("/api/unlockables", (0, middleware_1.validateRequest)(unlockable_schema_1.createUnlockableSchema), unlockable_controller_1.createUnlockableHandler);
    app.get("/api/unlockables", (0, middleware_1.validateRequest)(unlockable_schema_1.queryUnlockableSchema), unlockable_controller_1.getUnlockableHandler);
}
exports.default = routes;
