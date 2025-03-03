import { VehicleEnum } from "@prisma/client";
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

export const createVehicleSchema = z.object({
    type: z
        .nativeEnum(VehicleEnum, {required_error: "Tipo do veículo é requerido"}),
    plate: z
            .string({required_error: "A placa do veículo é requerida"}),
    model: z
            .string({required_error: "A modelo do veículo é requerida"}),
    color: z
            .string({required_error: "A cor do veículo é requerida"}),    
    ownerId: z
            .string({required_error: "A cor do veículo é requerida"})
            .uuid({ message: "O id é um UUID"}),
});

export const createRideSchema = z.object({
    origin: z
        .string({ required_error: " é requrida" }),
    destination: z
        .string({ required_error: " é requrida" }),
    date: z
        .date({ required_error: " é requrida" }),
    seats: z
        .number({ required_error: " é requrida" }),
    vehicleId: z
        .string({ required_error: " é requrida" })
        .uuid({ message: "o id é um UUID" }),
});
