"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryContractSchema = exports.createContractSchema = void 0;
const yup_1 = require("yup");
exports.createContractSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        uuid: (0, yup_1.string)()
            .required("Must send a contract's uuid"),
        abi: (0, yup_1.string)()
            .required("Must send a contract's abi uuid"),
        address: (0, yup_1.string)()
            .required("Must send the contract's address")
            .min(42, "Must be exactly 42 characters")
            .max(42, "Must be exactly 42 characters"),
        ownerAddress: (0, yup_1.string)()
            .required("Owner's public Address is required")
            .min(42, "Must be exactly 42 characters")
            .max(42, "Must be exactly 42 characters"),
        whiteList: (0, yup_1.array)().of((0, yup_1.string)()),
    }),
});
exports.queryContractSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        address: (0, yup_1.string)()
            .required("Public Address is required")
            .min(42, "Must be exactly 42 characters")
            .max(42, "Must be exactly 42 characters"),
    }),
});
