"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
const logger_1 = __importDefault(require("../logger"));
const lens_service_1 = require("./lens.service");
async function createUser(input) {
    try {
        //Find user by handle
        logger_1.default.info(`Looking for user ${input.handle}`);
        let existingUser = await user_model_1.default.find({ handle: input.handle });
        if (existingUser && existingUser.length > 0) {
            throw new Error("Existing Handler");
        }
        let user = await user_model_1.default.create(input);
        if (user) {
            //create the lens profile
            console.log(input);
            (0, lens_service_1.createProfile)(input);
        }
        return user;
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.createUser = createUser;
async function findUser(query) {
    const dbUser = await user_model_1.default.findOne(query).lean();
    if (dbUser) {
        logger_1.default.info(dbUser);
    }
    else {
        logger_1.default.info(`search of user ${query.toJSON} did not produce a result`);
    }
    return dbUser;
}
exports.findUser = findUser;
