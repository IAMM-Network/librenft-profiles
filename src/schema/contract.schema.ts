import { object, string, number, array } from "yup";

export const createContractSchema = object({
    body: object({
        uuid: string()
            .required("Must send a contract's uuid"),
        abi: string()
            .required("Must send a contract's abi uuid"),
        address: string()
            .required("Must send the contract's address")
            .min(42,"Must be exactly 42 characters")
            .max(42, "Must be exactly 42 characters"),
        ownerAddress: string()
            .required("Owner's public Address is required")
            .min(42,"Must be exactly 42 characters")
            .max(42, "Must be exactly 42 characters"),
        whiteList: array().of(string()),
    }),
});


export const queryContractSchema = object({
    body: object({
        address: string()
            .required("Public Address is required")
            .min(42,"Must be exactly 42 characters")
            .max(42, "Must be exactly 42 characters"),
    }),
});