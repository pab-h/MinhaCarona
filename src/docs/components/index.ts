import usersSchemas from "./users";
import paramsSchemas from "./params";
import authSchemas from "./auth";

export default {
    components: {
        schemas: {
            ... usersSchemas,
            ... paramsSchemas,
            ... authSchemas
        },
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    }
};