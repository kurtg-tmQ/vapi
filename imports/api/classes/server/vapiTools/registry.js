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
import process_card_replacement from "./CardReplacement";

// Assistans
import FrontDesk from "./assistants/FrontDesk";
import TaskRouter from "./assistants/TaskRouter";
import FullVerification from "./assistants/FullVerification2";
import PartialVerification from "./assistants/PartialVerification";
import ChangeAddress from "./assistants/ChangeAddress";
import CardReplacement from "./assistants/CardReplacement";


const ChangeCard = {
    assistant: CardReplacement,
    tools: [verify_user, send_otp, verify_otp, process_card_replacement],
    members: []
};
const ChangeAddress_ = {
    assistant: ChangeAddress,
    tools: [],
    members: []
};
const TaskRouter_ = {
    assistant: TaskRouter,
    tools: [task_route],
    members: [ChangeCard, ChangeAddress_]
};
const FullVerification_ = {
    assistant: FullVerification,
    tools: [verify_user, zipcode_update, birthday_update, sss_verify, retrieve_card_number, verify_account_password],
    members: [TaskRouter_]
};
const PartialVerification_ = {
    assistant: PartialVerification,
    tools: [verify_user, send_otp, verify_otp],
    members: [TaskRouter_]
};
const FrontDesk_ = {
    assistant: FrontDesk,
    tools: [task_route],
    members: [FullVerification_, PartialVerification_]
};




export default [TaskRouter_, FullVerification_, PartialVerification_, FrontDesk_, ChangeCard, ChangeAddress_];