import z from "zod";

export const idSchema = z.object({
    id: z
        .string({required_error: "id is requested"})
        .uuid({message: "bad formatted uuid"})
});

export const createUserSchema = z.object({
    name: z
        .string({required_error: "name is requested"}),
    email: z
        .string({required_error: "email is requested"})
        .email({message: "bad formatted email"}),
    password: z
        .string({required_error: "password is requested"})
        .min(6, "password length must be greater than 6")
});

export const loginUserSchema = z.object({
    email: z
        .string({required_error: "email is requested"})
        .email({message: "bad formatted email"}),
    password: z
        .string({required_error: "password is requested"})
        .min(6, "password length must be greater than 6")
});
