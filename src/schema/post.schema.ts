import { object, string, number, array, ref } from "yup";

export const createPostSchema = object({
    body: object({
        publicAddress: string()
            .required("Public Address is required")
            .min(42,"Must be exactly 42 characters")
            .max(42, "Must be exactly 42 characters"),
        contentURI: string()
            .required("contentURI is required"),
        message: string()
            .required("message is required"),
    })
});