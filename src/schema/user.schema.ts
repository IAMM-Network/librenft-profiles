import { object, string, number, ref } from "yup";

export const createUserSchema = object({
    body: object({
        publicAddress: string()
            .required("Public Address is required")
            .min(42,"Must be exactly 42 characters")
            .max(42, "Must be exactly 42 characters"),
        email: string()
            .email("Must be a valid email"),
        signedMessage:  object({
            r: string(),
            s: string(),
            v: number()
        })
        .required("signedMessage is required"),
    }),
});