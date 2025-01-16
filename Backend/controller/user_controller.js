require("dotenv").config();

const { userModel } = require("../model/user_model");
const { createHmac } = require("crypto");
const { setToken, verifyToken } = require("../services/authentication");
const { hash_generation, hash_verification } = require("../utilities/hash");
const { generateOTP } = require("../utilities/otp_generation");
const nodemailer = require("nodemailer");
const { noteModel } = require("../model/note_model");

// Nodemailer Transporter : It holds the info of the sender of this project
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
        user: "aadeshgupta5058@gmail.com",
        pass: "pqocmbfgeobhqiti",
    },
});

const handleUserRegisteration = async (req, res) => {

    try {
        await userModel.create(req.body)
            .then(async (response) => {
                const id = Object(response["_id"]).toString()
                const token = setToken({ ...req.body, "_id": id })

                localStorage.setItem("token", token);

                try {
                    await transporter.sendMail({
                        from: "aadeshgupta5058@gmail.com", // sender address
                        to: req.body.email, // receivers address
                        subject: `Welcome ${req.body.name} to Notely.`, // Subject line
                        text: `Your Account with Notely is created Successfully.\n\nYou can now enjoy Creating, Editing, Pinning and Searching your Notes seamlessly with Notely.`, // plain text body
                    })
                } catch {
                    return res.status(500).send("Email Not Send");
                }
            })
        res.status(201).send("User Account Created Successfully");
    } catch {
        res.status(500).send("User Account Creation Failed");
    }
}

const handleUserLogin = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) return res.status(500).send("Invalid Credentials");

        const salt = user.salt;
        const hashedPassword = user.password;

        const matchHash = createHmac("sha256", salt).update(password).digest("hex");

        if (matchHash !== hashedPassword) return res.status(500).send("Invalid Credentials");

        const token = setToken(user);

        localStorage.setItem("token", token);

        res
            .status(200)
            .send("Login Successfull");
    } catch {
        res.status(500).send("Signin Failed");
    }
}

const handleEmailOtpGeneration = async (req, res) => {
    const email_otp = generateOTP();
    const hash_email_otp = hash_generation(email_otp);

    try {
        const receiver_email = req.body.email;

        await transporter.sendMail({
            from: "aadeshgupta5058@gmail.com", // sender address
            to: receiver_email, // list of receivers
            subject: "Notely Email Verification", // Subject line
            text: `OTP for Email Verification -: ${email_otp}`, // plain text body
        })

        res.cookie("email_otp", hash_email_otp, {
            httpOnly: true,
            secure: true,
            path: "/",
            sameSite: 'None',
        });

        res
            .status(200)
            .send(`Email Verification OTP Successfully Sent`);

    } catch {
        res.status(500).send("Error in Sending OTP");
    }
}

const handleEmailOtpVerification = async (req, res) => {

    try {
        const received_email_otp = req.body.email_otp_verification;
        const email_otp_hash = req.cookies.email_otp

        if (hash_verification(received_email_otp, email_otp_hash)) {
            res.clearCookie("email_otp");
            res.status(200).send("Email Verified");
        }
        else {
            res.status(400).send("Invalid OTP");
        }
    } catch (err) {
        res.status(400).send("Email Verification Failed");
    }
}

const handleCheckEmail = async (req, res) => {

    try {
        const data = await userModel.find({ email: req.body.email }).countDocuments()

        if (data == 1) {
            res.status(200).send("Email Id Found");
        }
        else if (data == 0) {
            res.status(500).send("Email Id Not Found");
        }
        else if (data >= 2) {
            res.status(500).send("Multiple Email Id Found");
        }
    } catch {
        res.status(500).send("Error in Checking Email");
    }
}

const handleCheckEmailDuplicacy = async (req, res) => {
    try {
        const data = await userModel.find({ email: req.body.email }).countDocuments()

        if (data == 0) {
            res.status(200).send("Email Id Not Found");
        }
        else {
            res.status(500).send("Email Id Found");
        }
    } catch {
        res.status(500).send("Error in Checking Email Duplicacy");
    }
}

const handleCreateNewPassword = async (req, res) => {

    try {
        const { email, password } = req.body;

        const data = await userModel.find({ email: email }, { _id: 1, salt: 1 });

        if (data != null) {
            try {
                const { _id, salt } = data[0];
                const hashedPassword = createHmac("sha256", salt).update(password).digest("hex");

                await userModel.findByIdAndUpdate(_id, { password: hashedPassword })

                try {
                    await transporter.sendMail({
                        from: "aadeshgupta5058@gmail.com", // sender address
                        to: req.body.email, // receivers address
                        subject: `Your Notely Password is Changed`, // Subject line
                        text: `Recently your Notely password is changed.\n\nIf it is not you, please change your password to stay protected, otherwise ignore this mail.\n\n\nHave a Great Time with Notely`, // plain text body
                    })
                } catch {
                    return false
                }

                res.status(200).send("Password Reset Successfully");
            }
            catch {
                res.status(500).send("Password Reset Failed");
            }
        }
        else res.status(500).send("Invalid Email Id");
    } catch {
        res.status(500).send("Error in Creating New Password");
    }
}

const handleTokenVerification = async (req, res) => {
    try {
        const { _id } = req.user;

        const pin_array = await userModel.findById(_id, { _id: 0, pin_order: 1 });
        const notes = await noteModel.find({ createdBy: _id }, { __v: 0 }).sort({ createdAt: -1 });

        res.status(200).send({ "notes": notes, "pin_array": pin_array.pin_order })
    } catch {
        res.status(500).send("Error in Finding Notes")
    }
}

module.exports = {
    handleUserRegisteration,
    handleUserLogin,
    handleEmailOtpGeneration,
    handleEmailOtpVerification,
    handleCheckEmail,
    handleCheckEmailDuplicacy,
    handleCreateNewPassword,
    handleTokenVerification
}