import { toast } from "react-toastify";
import axios_instance from "../../utils/Axios Instance/axios_instance";

const signup = async (e: any) => {

    return await toast.promise(
        axios_instance.post("/signup", e),
        {
            pending: 'Creating account... Please wait',
            success: `Welcome ${e.name} to Notely World`,
            error: "Account creation failed. Try again later."
        }
    )
}

const signin = async (e: any) => {

    return await toast.promise(
        axios_instance.post("/signin", e),
        {
            pending: 'Verifying credentials',
            success: `Welcome back buddy`,
            error: "Your credentials are invalid"
        }
    )
}

const email_otp = async (e: any) => {

    return await toast.promise(
        axios_instance.post("/email_otp", e),
        {
            pending: `Sending OTP on ${e.email}`,
            success: `OTP is sent on ${e.email}`,
            error: "Network error cccured, Try again later"
        }
    )
}

const email_otp_verification = async (e: object) => {

    return await toast.promise(
        axios_instance.post("/email_otp_verification", e),
        {
            pending: 'Verifying OTP',
            success: 'OTP Verified successfully',
            error: "OTP Verification failed"
        }
    )
}

const check_email = async (e: any) => {
    return await toast.promise(
        axios_instance.post("/check_email", e),
        {
            pending: `Checking email.... Please wait`,
            error: "Email invalid"
        }
    )
}

const check_email_duplicacy = async (e: any) => {
    return await toast.promise(
        axios_instance.post("/check_email_duplicacy", e),
        {
            pending: `Checking email.... Please wait`
        }
    )
}

const create_new_password = async (e: object) => {

    return await toast.promise(
        axios_instance.post("/create_new_password", e),
        {
            pending: 'Resetting password.. Please wait.',
            success: 'Password reset successfully',
            error: "Password reset failed"
        }
    )
}

const add_note = async (e: object) => {

    return await toast.promise(
        axios_instance.post("/dashboard/add_note", e),
        {
            pending: 'Adding note... Please wait',
            success: 'Note added successfully',
            error: "Adding note failed."
        }
    )
}

const edit_note = async (e: object) => {

    return await toast.promise(
        axios_instance.post("/dashboard/edit_note", e),
        {
            pending: 'Editing note... Please wait',
            success: 'Note edited successfully',
            error: "Editing note failed."
        }
    )
}

const delete_note = async (e: object) => {

    return await toast.promise(
        axios_instance.post("/dashboard/delete_note", e),
        {
            pending: 'Deleting note... Please wait',
            success: 'Note deleted successfully',
            error: "Deleting note failed."
        }
    )
}

const pin_unpin_note = async (e: any) => {

    const status = e.pin ? "Pinned" : "Unpinned";

    return await toast.promise(
        axios_instance.post("/dashboard/pin_unpin_note", e),
        {
            pending: `${status} requested note`,
            success: `Note ${status} successfully`,
            error: `${status} note failed`
        }
    )
}

const verify_token = async () => {
    return await toast.promise(
        axios_instance.get("/dashboard/verify_token"),
        {
            error: "Session logout. Please login again"
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