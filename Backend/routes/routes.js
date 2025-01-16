const express = require("express");

const { handleEmailOtpGeneration, handleEmailOtpVerification, handleUserRegisteration, handleUserLogin, handleCreateNewPassword, handleCheckEmail, handleCheckEmailDuplicacy, handleTokenVerification } = require("../controller/user_controller");

const { handleAddNote, handleEditNote, handleDeleteNote, handlePinUnpinNote } = require("../controller/note_controller");

const credential_router = express.Router();
const dashboard_router = express.Router();

credential_router
    .post("/signup", handleUserRegisteration)
    .post("/signin", handleUserLogin)
    .post("/email_otp", handleEmailOtpGeneration)
    .post("/email_otp_verification", handleEmailOtpVerification)
    .post("/check_email", handleCheckEmail)
    .post("/check_email_duplicacy", handleCheckEmailDuplicacy)
    .post("/create_new_password", handleCreateNewPassword)

dashboard_router
    .post("/add_note", handleAddNote)
    .post("/edit_note", handleEditNote)
    .post("/delete_note", handleDeleteNote)
    .post("/pin_unpin_note", handlePinUnpinNote)
    .get("/verify_token", handleTokenVerification)

module.exports = {
    credential_router,
    dashboard_router
};