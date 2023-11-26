const bcrypt = require('bcrypt');
require('dotenv').config();
const getAUser = require('../utils/getAUser');
const { password } = require('../Config/dbconfig');
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
    const pool = req.pool;
    const user = req.body;

    try {
        const hashedPassword = await bcrypt.hash(user.password, 8);
        if (pool.connected) {
            const result = await pool.request()
                .input("fullname", user.fullname)
                .input("location", user.location)
                .input("password", hashedPassword)
                .input("email", user.email)
                .input("emergency_contact", user.phone)
                .execute("CreateNewUser");

            console.log(result.recordset)

            if (result.recordset && result.recordset.length > 0 && result.recordset[0].success === 1) {
                res.status(200).send("User registered successfully!");
            } else {
                res.status(500).send("User registration failed. Please try again later.");
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

async function createCaregiver(req, res) {
    const pool = req.pool;
    const caregiver = req.body;

    try {
        const hashedPassword = await bcrypt.hash(caregiver.password, 8);
        if (pool.connected) {
            const result = await pool.request()
                .input("fullname", caregiver.fullname)
                .input("location", caregiver.location)
                .input("email", caregiver.email)
                .input("phone_number", caregiver.phone)
                .input("description", caregiver.description)
                .input("password", hashedPassword)
                .execute("sp_CreateCaregiver");

            console.log(result);

            // Check the number of rows affected to determine success
            if (result.rowsAffected && result.rowsAffected[0] > 0) {
                res.status(200).send("Caregiver created successfully!");
            } else {
                // Handle specific error cases, if necessary
                res.status(500).send("Caregiver creation failed. Please try again later.");
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
async function getLoggedInUser(req, res) {
    try {
        let user = req.session.user;
        if (user) {
            res.json({
                success: true,
                message: "user found",
                user: user,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "No user found",
            });
        }
    } catch (error) {
        res.send(error.message);
    }
}


async function loginUser(req, res) {
    const { email, pwd } = req.body;
    try {
        const { pool } = req;
        if (pool.connected) {
            const result = await pool.request().input('email', email).execute('Test')
            //kwanza =>user pili=>caregiver

            if (result.rowsAffected[0] === 0 && result.rowsAffected[1] === 0) {
                res.status(404).json({
                    success: false,
                    message: "No user found",
                }
                );
            } else {
                if (result.rowsAffected[0] === 1) {
                    const user = result.recordsets[0][0];
                    console.log(user)
                    let passwords_match = await bcrypt.compare(pwd, user.password);
                    if (passwords_match) {
                        const user_payload = {
                            id: user.id,
                            role: 'user',
                        };
                        const token = jwt.sign(
                            user_payload, process.env.SECRET,
                            {
                                expiresIn: "1d",
                            }

                        );
                        console.log(token)
                        const refresh_token = jwt.sign(
                            user_payload,
                            process.env.REFRESH_TOKEN_SECRET,
                            {
                                expiresIn: '7d',
                            }
                        )
                        console.log(refresh_token)

                        res
                            .cookie("refreshtoken", refresh_token, {
                                httpOnly: true,
                                sameSite: "none",
                                secure: true,
                            })
                            .cookie("accesstoken", token, {
                                httpOnly: true,
                                sameSite: "none",
                                secure: true,
                            })
                            .status(200)
                            .json({
                                success: true,
                                message: "Login successful",
                                cookies: token,
                            });
                    }
                    else {
                        res.status(401).json({
                            success: false,
                            message: "login failed, check password and try again"
                        })
                    }
                } else if (result.rowsAffected[1] === 1) {

                    const user = result.recordsets[1][0];
                    let passwords_match = await bcrypt.compare(pwd, user.password);
                    if (passwords_match) {
                        const user_payload = {
                            id: user.id,
                            role: 'caregiver',
                        };
                        const token = jwt.sign(
                            user_payload, process.env.SECRET,
                            {
                                expiresIn: "1d",
                            }

                        );
                        console.log(token)
                        const refresh_token = jwt.sign(
                            user_payload,
                            process.env.REFRESH_TOKEN_SECRET,
                            {
                                expiresIn: '7d',
                            }
                        )
                        console.log(refresh_token)

                        res
                            .cookie("refreshtoken", refresh_token, {
                                httpOnly: true,
                                sameSite: "none",
                                secure: true,
                            })
                            .cookie("accesstoken", token, {
                                httpOnly: true,
                                sameSite: "none",
                                secure: true,
                            })
                            .status(200)
                            .json({
                                success: true,
                                message: "Login successful",
                                cookies: token,
                            });

                    }
                    else {
                        res.status(201).json({
                            success: false,
                            message: "check credentials and try again"
                        })
                    }




                }
            }

        }
    }

    catch (error) {
        console.log(error)
    }
}

async function logoutUser(req, res) {
    try {
        res.clearCookie("accesstoken");
        res.clearCookie("refreshtoken");
        res.status(200).json({
            message: "Logout successful",
        });
    } catch (error) {
        console.log(error);
    }
}




module.exports = { registerUser, createCaregiver, loginUser, logoutUser, getLoggedInUser };
