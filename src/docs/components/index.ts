import usersSchemas from "./users";
import paramsSchemas from "./params";
import authSchemas from "./auth";
import vehiclesSchemas from "./vehicles";

export default {
    components: {
        schemas: {
            ... usersSchemas,
            ... paramsSchemas,
            ... authSchemas,
            ... vehiclesSchemas
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