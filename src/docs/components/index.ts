import usersSchemas from "./users";

import paramsSchemas from "./params";

export default {
    components: {
        schemas: {
            ... usersSchemas,
            ... paramsSchemas
        },
        securitySchemes: {
        }
    }
};