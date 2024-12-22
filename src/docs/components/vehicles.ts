export default {
    CreateVehicleRequestSchema: {
        type: "object",
        properties: {
            type: {
                type: "string",
                enum: ["CAR", "MOTORCYCLE"]
            },
            plate: { type: "string"},
            model: { type: "string"},    
            color: { type: "string"},    
            ownerId: { type: "string"}
        },
        example: {
            type: "CAR",
            plate: "BRA2E19",
            model: "nissan",    
            color: "vermelho",    
            ownerId: "dbe3c0ab-65f4-4792-a029-6862851499cc"
        }   
    },
    CreateVehicleResponseSchema: {
        type: "object",
        properties: {
            type: {
                type: "string",
                enum: ["CAR", "MOTORCYCLE"]
            },
            plate: { type: "string"},
            model: { type: "string"},    
            color: { type: "string"},    
            ownerId: { type: "string"}
        },
        example: {
            id: "dbe3c0ab-65f4-4792-a029-6862851499cc",
            type: "CAR",
            plate: "BRA2E19",
            model: "nissan",    
            color: "vermelho",    
            ownerId: "dbe3c0ab-65f4-4792-a029-6862851499cc",
            createdAt: "2024-10-19T13:26:00.882Z",
            updatedAt: "2024-10-19T13:26:00.882Z"
        }
    },
}