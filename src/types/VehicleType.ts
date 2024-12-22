import { VehicleEnum } from "@prisma/client";
import { BaseModelType } from "./BaseModelType";

export type VehicleType = {
    type: VehicleEnum;
    plate: string;
    model: string;    
    color: string;    
    ownerId: string;
} & BaseModelType;