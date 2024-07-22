// 
import send_otp from "./OTP";
import verify_otp from "./VerifyOTP";
import task_route from "./TaskRoute";
import sss_verify from "./LastSSSNum";
import zipcode_update from "./ZipCode";
import birthday_update from "./BirthDay";
import verify_user from "./FirstLastName";
import retrieve_card_number from "./CardNum";
import call_forwarding from "./CallForwarding";
import get_2_digits_otp from "./Get2DigitsOTP";
import verify_account_password from "./Password";
import process_new_address from "./ChangeAddress";
import check_cell_phone_number from "./CheckCellPhone";
import process_card_replacement from "./CardReplacement";

import TransferCall from "./TransferCall";

// Assistans
import FrontDesk from "./assistants/FrontDesk";
import TaskRouter from "./assistants/TaskRouter";
import FullVerification from "./assistants/FullVerification2";
import PartialVerification from "./assistants/PartialVerification";
import ChangeAddress from "./assistants/ChangeAddress";
import CardReplacement from "./assistants/CardReplacement";
import WebAssistant1 from "./assistants/WebAssistant1";
import WebAssistant2 from "./assistants/WebAssistant2";


const ChangeCard = {
    assistant: CardReplacement,
    tools: [send_otp, verify_otp, process_card_replacement, get_2_digits_otp],
    members: []
};
const ChangeAddress_ = {
    assistant: ChangeAddress,
    tools: [send_otp, verify_otp, process_new_address, get_2_digits_otp],
    members: []
};
const TaskRouter_ = {
    assistant: TaskRouter,
    tools: [task_route],
    members: [ChangeCard, ChangeAddress_]
};
const FullVerification_ = {
    assistant: FullVerification,
    tools: [verify_user, zipcode_update, sss_verify, birthday_update, retrieve_card_number, verify_account_password, task_route, call_forwarding],
    members: [ChangeCard, ChangeAddress_]
};
const PartialVerification_ = {
    assistant: PartialVerification,
    tools: [sss_verify, retrieve_card_number, zipcode_update, verify_user, task_route, call_forwarding],
    members: [ChangeCard, ChangeAddress_]
};
const FrontDesk_ = {
    assistant: FrontDesk,
    tools: [check_cell_phone_number, task_route],
    members: [FullVerification_, PartialVerification_]
};
const WebAssistant1_ = {
    assistant: WebAssistant1,
    tools: [],
    members: [],
}
const WebAssistant2_ = {
    assistant: WebAssistant2,
    tools: [],
    members: []
}

export default [WebAssistant1_, WebAssistant2_];
