import { object, string, number, array, ref } from "yup";

export const createDispatcherSchema = object({
    body: object({
        publicAddress: string()
            .required("Public Address is required")
            .min(42,"Must be exactly 42 characters")
            .max(42, "Must be exactly 42 characters"),
        profileId: number()
            .required("profileId is required"),
        dispatcher: string()
            .required("Dispatcher Address is required")
            .min(42,"Must be exactly 42 characters")
            .max(42, "Must be exactly 42 characters"),
        deadline: number()
            .required("deadline is required"),
        chainId: number()
            .required("chainId is required"),
        nonce: number()
            .required("nonce is required"),
        contracName: string()
            .required("contracName is required"),
        contractAddress: string()
            .required("contractAddress is required"),
        signedMessage:  object({
            r: string(),
            s: string(),
            v: number(),
            deadline: number()
        })
            .required("signedMessage is required"),
    })
});