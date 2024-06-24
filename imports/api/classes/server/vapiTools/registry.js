// 
import send_otp from "./OTP";
import verify_otp from "./VerifyOTP";
import task_route from "./TaskRoute";
import sss_verify from "./LastSSSNum";
import zipcode_update from "./ZipCode";
import birthday_update from "./BirthDay";
import verify_user from "./FirstLastName";
import retrieve_card_number from "./CardNum";
import verify_account_password from "./Password";
import process_card_replacement from "./CardReplacement"

// Assistans
import TaskRouter from "./assistants/TaskRouter";
import FullVerification from "./assistants/FullVerification2";
import PartialVerification from "./assistants/PartialVerification";
import CardReplacement from "./assistants/CardReplacement";

const FV = {
    assistant: FullVerification,
    tools: [verify_user, zipcode_update, birthday_update, sss_verify, retrieve_card_number, verify_account_password]
};
const PV = {
    assistant: PartialVerification,
    tools: [verify_user, send_otp, verify_otp]
};
const TV = {
    assistant: TaskRouter,
    tools: [task_route]
};

const CR = {
    assistant: CardReplacement,
    tools: [verify_user, send_otp, verify_otp, process_card_replacement]
}

export default [TV, FV, PV, CR];