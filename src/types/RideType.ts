import { BaseModelType } from "./BaseModelType";

export type RideType = {
    origin: string;
    destination: string;
    date: Date;
    seats: number;
    ownerId: string;
    vehicleId: string;
} & BaseModelType;