export default {
    AuthUserRequestSchema: {
        type: "object",
        properties: {
            email: { type: "string" },
            password: { type: "string" }
        },
        example: {
            email: "johndoe@example.com",
            password: "strongPassword123"
        }   
    },
    AuthUserResponseSchema: {
        type: "object",
        properties: {
            token: { type: "string" }
        },
        example: {
            token: "dbe3c0ab-65f4-4792-a029-6862851499cc",
        }
    },
}