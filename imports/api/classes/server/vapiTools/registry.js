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
import process_new_address from "./ChangeAddress";

import check_cell_phone_number from "./CheckCellPhone";
// Assistans
import FrontDesk from "./assistants/FrontDesk";
import TaskRouter from "./assistants/TaskRouter";
import FullVerification from "./assistants/FullVerification2";
import PartialVerification from "./assistants/PartialVerification";
import ChangeAddress from "./assistants/ChangeAddress";
import CardReplacement from "./assistants/CardReplacement";


const ChangeCard = {
    assistant: CardReplacement,
    tools: [send_otp, verify_otp, process_card_replacement],
    members: []
};
const ChangeAddress_ = {
    assistant: ChangeAddress,
    tools: [send_otp, verify_otp, process_new_address],
    members: []
};
const TaskRouter_ = {
    assistant: TaskRouter,
    tools: [task_route],
    members: [ChangeCard, ChangeAddress_]
};
const FullVerification_ = {
    assistant: FullVerification,
    tools: [verify_user, zipcode_update, sss_verify, birthday_update, retrieve_card_number, verify_account_password, task_route],
    members: [TaskRouter_]
};
const PartialVerification_ = {
    assistant: PartialVerification,
    tools: [sss_verify, retrieve_card_number, zipcode_update, verify_user, task_route],
    members: [TaskRouter_]
};
const FrontDesk_ = {
    assistant: FrontDesk,
    tools: [check_cell_phone_number, task_route],
    members: [FullVerification_, PartialVerification_]
};

export default [TaskRouter_, FullVerification_, PartialVerification_, FrontDesk_, ChangeCard, ChangeAddress_];
