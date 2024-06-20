// 
import task_route from "./TaskRoute";
import sss_verify from "./LastSSSNum";
import zipcode_update from "./ZipCode";
import birthday_update from "./BirthDay";
import verify_user from "./FirstLastName";
import retrieve_card_number from "./CardNum";
import verify_account_password from "./Password";

// Assistans
import TaskRouter from "./assistants/TaskRouter";
import FullVerification from "./assistants/FullVerification2";
import PartialVerification from "./assistants/PartialVerification";

const FV = {
    assistant: FullVerification,
    tools: [verify_user, zipcode_update, birthday_update, sss_verify, retrieve_card_number, verify_account_password]
};
const PV = {
    assistant: PartialVerification,
    tools: [verify_user, zipcode_update]
};
const TV = {
    assistant: TaskRouter,
    tools: [task_route]
};

export default [TV, FV, PV];