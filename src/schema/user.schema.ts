import { object, string, number, ref } from "yup";

export const createUserSchema = object({
    body: object({
        publicAddress: string()
            .required("Public Address is required")
            .min(42,"Must be exactly 42 characters")
            .max(42, "Must be exactly 42 characters"),
        handle: string()
            .required("Must include handle"),
        imageURI: string()
            .required("Must include imageURI"),            
        followNFTURI: string()
            .required("Must include followNFTURI"), 
        profileType: number()
            .required("Must include profileType"), 
    }),
});

export const queryUserNonceSchema = object({
    body: object({
        publicAddress: string()
            .required("Public Address is required")
            .min(42,"Must be exactly 42 characters")
            .max(42, "Must be exactly 42 characters")   
    }),
});