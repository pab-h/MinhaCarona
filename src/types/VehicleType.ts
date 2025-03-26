import { BaseModelType } from "./BaseModelType";
import { VehicleEnum } from "@prisma/client";

export type VehicleType = {
    type:    VehicleEnum;
    plate:   string;
    model:   string;    
    color:   string;    
    ownerId: string;
} & BaseModelType;