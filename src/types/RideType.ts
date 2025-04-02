import { BaseModelType } from "./BaseModelType";

export type TravelType = {
    origin:      string;
    destination: string;
}

export type RideType = {
    date:        Date;
    seats:       number;
    ownerId:     string;
    vehicleId:   string;
} & BaseModelType & TravelType;