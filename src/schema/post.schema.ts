import { object, string, number, array, ref } from "yup";

export const createPostSchema = object({
    body: object({
        publicAddress: string()
        .required("Profile ID is required"),
        contentURI: string()
        .required("contentURI is required"),
        message: string()
        .required("message is required")
    })
});