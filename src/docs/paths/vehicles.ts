export default {
    "/vehicles": {
        post: {
            summary: "Cadastro de veículo",
            tags: ["Vehicles"],
            security: [
                {
                  bearerAuth: []
                }
            ],
            requestBody: {
                content: {
                    "application/json": {
                        $ref: "#/components/schemas/CreateVehicleRequestSchema"
                    }
                }
            },
            responses: {
                "201": {
                    description: "OK",
                    content: {
                        "application/json": {
                            $ref: "#/components/schemas/CreateVehicleResponseSchema"
                        }
                    }
                }
            }
        }
    },
}