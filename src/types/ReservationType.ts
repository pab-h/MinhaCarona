import { ReservationStatus } from "@prisma/client"; 
import { BaseModelType } from "./BaseModelType";

export type ReservationType = {
    rideId:  string;
    ownerId: string;
    status:  ReservationStatus;
} & BaseModelType;
