"use strict";
exports.__esModule = true;
exports.queryUnlockableSchema = exports.createUnlockableSchema = void 0;
var yup_1 = require("yup");
exports.createUnlockableSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        publicAddress: (0, yup_1.string)()
            .required("Public Address is required")
            .min(42, "Must be exactly 42 characters")
            .max(42, "Must be exactly 42 characters"),
        contractAddress: (0, yup_1.string)()
            .required("Public Address is required")
            .min(42, "Must be exactly 42 characters")
            .max(42, "Must be exactly 42 characters"),
        link: (0, yup_1.string)()
            .required("link is required"),
        signedMessage: (0, yup_1.object)({
            r: (0, yup_1.string)(),
            s: (0, yup_1.string)(),
            v: (0, yup_1.number)()
        })
            .required("signedMessage is required")
    })
});
exports.queryUnlockableSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        publicAddress: (0, yup_1.string)()
            .required("Public Address is required")
            .min(42, "Must be exactly 42 characters")
            .max(42, "Must be exactly 42 characters"),
        contractAddress: (0, yup_1.string)()
            .required("Public Address is required")
            .min(42, "Must be exactly 42 characters")
            .max(42, "Must be exactly 42 characters"),
        signedMessage: (0, yup_1.object)({
            r: (0, yup_1.string)(),
            s: (0, yup_1.string)(),
            v: (0, yup_1.number)()
        })
            .required("signedMessage is required")
    })
});
