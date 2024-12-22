import { BaseModelType } from "./BaseModelType";

export type UserType = {
    name: string;
    email: string;
    password: string;
} & BaseModelType;