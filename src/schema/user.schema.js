"use strict";
exports.__esModule = true;
exports.createUserSchema = void 0;
var yup_1 = require("yup");
exports.createUserSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        publicAddress: (0, yup_1.string)()
            .required("Public Address is required")
            .min(42, "Must be exactly 42 characters")
            .max(42, "Must be exactly 42 characters"),
        email: (0, yup_1.string)()
            .email("Must be a valid email"),
        signedMessage: (0, yup_1.object)({
            r: (0, yup_1.string)(),
            s: (0, yup_1.string)(),
            v: (0, yup_1.number)()
        })
            .required("signedMessage is required")
    })
});
