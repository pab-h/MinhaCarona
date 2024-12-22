import users from "./users";
import auth from "./auth";
import vehicles from "./vehicles";

export default {
    paths: {
        ... users,
        ... auth,
        ... vehicles
    }
}
