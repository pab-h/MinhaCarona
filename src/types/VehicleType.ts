import { BaseModelType } from "./BaseModelType";

export enum VehicleEnum {
    CAR        = 'CAR',
    MOTORCYCLE = 'MOTORCYCLE'
}

export type VehicleType = {
    type: VehicleEnum;
    plate: string;
    model: string;    
    color: string;    
    ownerId: string;
} & BaseModelType;