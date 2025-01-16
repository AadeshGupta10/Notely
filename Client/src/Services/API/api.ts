import { toast } from "react-toastify";
import axios_instance from "../../utils/Axios Instance/axios_instance";

const signup = async (e: any) => {

    return await toast.promise(
        axios_instance.post("/signup", e),
        {
            pending: 'Creating Account... Please Wait',
            success: `Welcome ${e.name} to Your Notely World`,
            error: "Account Creation Failed. Try Again Later."
        }
    )
}

const signin = async (e: any) => {

    return await toast.promise(
        axios_instance.post("/signin", e),
        {
            pending: 'Verifying Credentials',
            success: `Welcome Back Buddy`,
            error: "Credentials Invalid"
        }
    )
}

const email_otp = async (e: any) => {

    return await toast.promise(
        axios_instance.post("/email_otp", e),
        {
            pending: `Sending OTP on ${e.email}`,
            success: `OTP is Sent on ${e.email}`,
            error: "Network Error Occured, Try Again Later"
        }
    )
}

const email_otp_verification = async (e: object) => {

    return await toast.promise(
        axios_instance.post("/email_otp_verification", e),
        {
            pending: 'Verifying OTP',
            success: 'OTP Verified Successfully',
            error: "OTP Verification Failed"
        }
    )
}

const check_email = async (e: any) => {
    return await toast.promise(
        axios_instance.post("/check_email", e),
        {
            pending: `Checking Email.... Please Wait`,
            error: "Email Invalid"
        }
    )
}

const check_email_duplicacy = async (e: any) => {
    return await toast.promise(
        axios_instance.post("/check_email_duplicacy", e),
        {
            pending: `Checking Email.... Please Wait`,
            error: "Email Already Registered"
        }
    )
}

const create_new_password = async (e: object) => {

    return await toast.promise(
        axios_instance.post("/create_new_password", e),
        {
            pending: 'Resetting Password.. Please Wait.',
            success: 'Password Reset Successfully',
            error: "Password Reset Failed"
        }
    )
}

const add_note = async (e: object) => {

    return await toast.promise(
        axios_instance.post("/dashboard/add_note", e),
        {
            pending: 'Adding Note... Please Wait',
            success: 'Note Added Successfully',
            error: "Adding Note Failed."
        }
    )
}

const edit_note = async (e: object) => {

    return await toast.promise(
        axios_instance.post("/dashboard/edit_note", e),
        {
            pending: 'Editing Note... Please Wait',
            success: 'Note Edited Successfully',
            error: "Editing Note Failed."
        }
    )
}

const delete_note = async (e: object) => {

    return await toast.promise(
        axios_instance.post("/dashboard/delete_note", e),
        {
            pending: 'Deleting Note... Please Wait',
            success: 'Note Deleted Successfully',
            error: "Deleting Note Failed."
        }
    )
}

const pin_unpin_note = async (e: any) => {

    const status = e.pin ? "Pinned" : "Unpinned";

    return await toast.promise(
        axios_instance.post("/dashboard/pin_unpin_note", e),
        {
            pending: `${status} Requested Note`,
            success: `Note ${status} Successfully`,
            error: `${status} Note Failed`
        }
    )
}

const verify_token = async () => {
    return await toast.promise(
        axios_instance.get("/dashboard/verify_token"),
        {
            pending: "Checking your Authenticity... Please wait",
            error: "Sorry, Your are not Authenticated. Please Login Again."
        }
    )
}

export {
    signup,
    signin,
    email_otp,
    email_otp_verification,
    check_email,
    check_email_duplicacy,
    create_new_password,
    add_note,
    edit_note,
    delete_note,
    pin_unpin_note,
    verify_token
}