import { BaseModelType } from "./BaseModelType";
import { VehicleEnum } from "./VehicleEnum";

export type VehicleType = {
    type: VehicleEnum;
    plate: string;
    model: string;    
    color: string;    
    ownerId: string;
} & BaseModelType;