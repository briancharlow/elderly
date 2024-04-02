const bcrypt = require('bcrypt');
require('dotenv').config();
const getAUser = require('../utils/getAUser');
const { password } = require('../Config/dbconfig');
const jwt = require("jsonwebtoken");
// const fs = require('fs');
const fs = require('fs');

async function registerUser(req, res) {
    const pool = req.pool;
    const user = req.body;

    try {
        const salt = await bcrypt.genSalt(8); // Generate a salt value with cost factor 8
        const hashedPassword = await bcrypt.hash(user.password, salt);
        if (pool.connected) {
            const result = await pool.request()
                .input("fullname", user.fullname)
                .input("location", user.location)
                .input("password", hashedPassword)
                .input("email", user.email)
                .input("emergency_contact", user.phone)
                .execute("CreateNewUser");
            console.log(result)


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

    const pool = req.pool; const caregiver = req.body; try { // Read the caregivers.json file to check if the user already exists 
        const caregiversData = fs.readFileSync('caregivers.json', 'utf8');
        const caregivers = JSON.parse(caregiversData);
        const caregiverExists = caregivers.find(c => c.certification_id == caregiver.certification_id);
        console.log(caregiverExists);
        const { qualifications, date_of_certification, institution_of_certification } = caregiverExists;

        if (!caregiverExists) {
            res.status(400).json({ success: false, message: "You should be certified to sign up as a caregiver!" });
        } else {
            const salt = await bcrypt.genSalt(8); // Generate a salt value with cost factor 8
            const hashedPassword = await bcrypt.hash(caregiver.password, salt);

            if (pool.connected) {
                const result = await pool.request()
                    .input("certification_id", caregiver.certification_id)
                    .input("fullname", caregiver.fullname).input("location", caregiver.location)
                    .input("email", caregiver.email).input("phone_number", caregiver.phone)
                    .input("description", caregiver.description)
                    .input("password", hashedPassword)
                    .input("qualifications", qualifications)
                    .input("date_of_certification", date_of_certification)
                    .input("education", institution_of_certification)
                    .execute("sp_CreateCaregiver");

                console.log(result) // Check the number of rows affected to determine success 
                if (result.rowsAffected && result.rowsAffected[0] > 0) {
                    res.status(200).json({ success: true, message: "Caregiver created successfully!" });

                } else { // Handle specific error cases, if necessary
                    res.status(500).json({ success: false, message: "Caregiver creation failed. Please try again later." });
                }
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
            const result = await pool.request().input('email', email).execute('Test');

            if (result.rowsAffected[0] === 0 && result.rowsAffected[1] === 0) {
                res.status(404).json({
                    success: false,
                    message: "No user found",
                });
            } else {
                if (result.rowsAffected[0] === 1) {
                    const user = result.recordsets[0][0];

                    let passwords_match = await bcrypt.compare(pwd, user.password);
                    if (passwords_match) {
                        req.session.authorized = true;
                        req.session.user = user;

                        res.status(200).json({
                            success: true,
                            message: "Login successful",
                            role: "guardian"
                        })

                    }
                    else {
                        res.status(401).json({
                            success: false,
                            message: "Check credentials and try again"
                        });
                    }
                } else if (result.rowsAffected[1] === 1) {
                    const user = result.recordsets[1][0];
                    let passwords_match = await bcrypt.compare(pwd, user.password);
                    if (passwords_match) {
                        req.session.authorized = true;
                        req.session.user = user;

                        res.status(200).json({
                            success: true,
                            message: "Login successful",
                            role: "caregiver"
                        })
                    } else {
                        res.status(401).json({
                            success: false,
                            message: "Check credentials and try again"
                        });
                    }
                }
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Database connection error",
        });
    }
}

async function logoutUser(req, res) {
    // console.log(req.session)
    console.log(req.session.user)


    req.session.destroy((err) => {
        if (err) {
            res.send("Error logging out");
        } else {
            res.send("Logged out successfully");
        }
    })

}
async function getCaregivers(req, res) {
    const pool = req.pool;

    try {
        if (pool.connected) {
            let results = await pool.request().execute('GetAllCaregivers');


            const caregivers = results.recordsets[0];
            res.status(200).json({
                success: true,
                message: "Caregivers found",
                caregivers: caregivers,
            })

        }
        else {
            res.status(404).json({
                success: false,
                message: "No caregivers found",
            })
        }
    } catch (error) {
        console.log(error)
    }
}
async function getCaregiver(req, res) {
    const { pool } = req;
    const { id } = req.params;
    try {
        if (pool.connected) {
            let results = await pool.request()
                .input('caregiverId', id)
                .execute("GetCaregiverById");

            const caregiver = results.recordsets[0];

            if (caregiver.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "caregiver not found",
                })
            }
            else {

                res.status(200).json({
                    success: true,
                    message: "caregiver retrieved successfully",
                    caregiver: caregiver

                })
            }
        }
    } catch (error) {
        console.log(error)
    }
}




module.exports = { registerUser, createCaregiver, loginUser, logoutUser, getLoggedInUser, getCaregiver, getCaregivers };
