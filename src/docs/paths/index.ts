import users from "./users";
import auth from "./auth";

export default {
    paths: {
        ... users,
        ... auth
    }
}
