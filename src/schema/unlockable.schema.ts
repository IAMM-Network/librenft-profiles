import { object, string, number, ref } from "yup";

export const createUnlockableSchema = object({
    body: object({
        publicAddress: string()
            .required("Public Address is required")
            .min(42,"Must be exactly 42 characters")
            .max(42, "Must be exactly 42 characters"),
        contractAddress: string()
            .required("Public Address is required")
            .min(42,"Must be exactly 42 characters")
            .max(42, "Must be exactly 42 characters"),
        tokenId: number()
            .required("TokenId is required"),
        link: string()
            .required("link is required"),
        signedMessage: object({
            r: string(),
            s: string(),
            v: number()
        })
        .required("signedMessage is required"),            
    }),
});

export const queryUnlockableSchema = object({
    body: object({
        publicAddress: string()
            .required("Public Address is required")
            .min(42,"Must be exactly 42 characters")
            .max(42, "Must be exactly 42 characters"),
        contractAddress: string()
            .required("Public Address is required")
            .min(42,"Must be exactly 42 characters")
            .max(42, "Must be exactly 42 characters"),
        signedMessage: object({
            r: string(),
            s: string(),
            v: number()
        })
        .required("signedMessage is required"),            
    }),
});