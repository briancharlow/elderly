async function updateProfile(req, res) {
    const user = req.session.user;
    const { email, password, description, fullname, phone, location } = req.body;
    try {
        if (pool.connected) {


        }

    } catch (error) {
        console.log(error)
    }
}
async function approveAppointment(req, res) {
    const { pool } = req;
    const caregiverId = req.session.user.id;
    const { appointmentId } = req.params;

    try {
        if (pool.connected) {
            let results = await pool.request()
                .input('CaregiverId', caregiverId)
                .input('AppointmentId', appointmentId)
                .execute('AcceptAppointment');

            console.log(results);
            if (results.rowsAffected[0] === 0) {
                res.status(404).json({
                    success: false,
                    message: "Appointment not found",
                })
            }
            else {
                res.status(200).json({
                    success: true,
                    message: "Appointment accepted successfully",
                });
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
async function getAppointments(req, res) {
    const { pool } = req;
    const userId = req.session.user.id; // Assuming the user ID can be either caregiver or client ID

    try {
        if (pool.connected) {
            let results = await pool.request()
                .input('id', userId) // Pass the user ID to the stored procedure
                .execute('getAppointments');

            const appointments = results.recordsets[0];

            // Check if appointments are found
            if (appointments.length === 0) {
                res.status(404).json({
                    success: false,
                    message: "No appointments found",
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "Appointments found",
                    appointments: appointments,
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while processing your request",
        });
    }
}

async function deleteAccount(req, res) {
    const { id } = req.session.user.id;
    try {
        if (pool.connected) {

        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = { getAppointments, approveAppointment, updateProfile, deleteAccount }
