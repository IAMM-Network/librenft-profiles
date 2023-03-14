"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const yup_1 = require("yup");
exports.createUserSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        publicAddress: (0, yup_1.string)()
            .required("Public Address is required")
            .min(42, "Must be exactly 42 characters")
            .max(42, "Must be exactly 42 characters"),
        handle: (0, yup_1.string)()
            .required("Must include handle"),
        imageURI: (0, yup_1.string)()
            .required("Must include imageURI"),
        followNFTURI: (0, yup_1.string)()
            .required("Must include followNFTURI"),
        email: (0, yup_1.string)()
            .email("Must be a valid email"),
        signedMessage: (0, yup_1.object)({
            r: (0, yup_1.string)(),
            s: (0, yup_1.string)(),
            v: (0, yup_1.number)()
        })
            .required("signedMessage is required"),
    }),
});
