export default {
    "/auth": {
        post: {
            summary: "Autenticação do usuário",
            tags: ["Auth"],
            requestBody: {
                content: {
                    "application/json": {
                        $ref: "#/components/schemas/AuthUserRequestSchema"
                    }
                }
            },
            responses: {
                "201": {
                    description: "OK",
                    content: {
                        "application/json": {
                            $ref: "#/components/schemas/AuthUserResponseSchema"
                        }
                    }
                }
            }
        }
    }
}