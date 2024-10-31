export default {
    CreateUserRequestSchema: {
        type: "object",
        properties: {
            name: { type: "string" },
            email: { type: "string" },
            password: { type: "string" }
        },
        example: {
            name: "John Doe",
            email: "johndoe@example.com",
            password: "strongPassword123"
        }   
    },
    CreateUserResponseSchema: {
        type: "object",
        properties: {
            id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            createdAt: { type: "string" },
            updatedAt: { type: "string" },
        },
        example: {
            id: "dbe3c0ab-65f4-4792-a029-6862851499cc",
            name: "John Doe",
            email: "johndoe@example.com",
            createdAt: "2024-10-19T13:26:00.882Z",
            updatedAt: "2024-10-19T13:26:00.882Z"
        }
    },
}