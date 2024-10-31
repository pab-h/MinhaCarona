export default {
    "/users": {
        post: {
            summary: "Cadastro de usuário",
            tags: ["Users"],
            requestBody: {
                content: {
                    "application/json": {
                        $ref: "#/components/schemas/CreateUserRequestSchema"
                    }
                }
            },
            responses: {
                "201": {
                    description: "OK",
                    content: {
                        "application/json": {
                            $ref: "#/components/schemas/CreateUserResponseSchema"
                        }
                    }
                }
            }
        }
    },
    "/users/{id}": {
        get: {
            summary: "Visualizar um usuário específico",
            tags: ["Users"],
            parameters: [
                { $ref: "#/components/schemas/IdParamPathSchema" }
            ],
            responses: {
                "200": {
                    description: "OK",
                    content: {
                        "application/json": {
                            $ref: "#/components/schemas/CreateUserResponseSchema"
                        }
                    }
                }
            }
        }
    }
}