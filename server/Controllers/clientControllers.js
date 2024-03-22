const mssql = require('mssql');



async function searchCaregiver(req, res) {
    const { pool } = req;
    const { searchTerm } = req.params;

    try {
        if (pool.connected) {
            let results = await pool.request()
                .input('searchTerm', searchTerm)
                .execute('SearchCaregiver');
            console.log('foo')
            console.log(results)
            console.log('bar')
            const caregivers = results.recordsets[0];
            if (results.rowsAffected[0] === 0) {
                res.status(404).json({
                    success: false,
                    message: "No caregiver found",
                })
            } else {
                res.status(200).json({
                    success: true,
                    message: "Caregivers found",
                    caregivers: caregivers,
                })
            }

        }

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "an error occurred while fetching caregivers"
        })
    }
}

async function requestAppointment(req, res) {
    const { pool } = req;

    const { caregiverId, date, startTime, endTime } = req.body;
    const clientId = req.session.user.id;


    try {
        if (pool.connected) {
            let results = await pool.request()
                .input('ClientId', clientId)
                .input('CaregiverId', caregiverId)
                .input('Date', date)
                .input('StartTime', startTime)
                .input('EndTime', endTime)
                .execute('RequestAppointment');

            console.log(results);
            const appointment = results.recordsets[0];
            console.log(appointment);

            if (results.rowsAffected[0] === 0) {
                res.status(404).json({
                    success: false,
                    message: "No caregiver found",
                })
            }
            else {

                res.status(200).json({
                    success: true,
                    message: "Appointment request submitted successfully",
                });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while processing your request",
        });
    }
}
async function rateCaregivers(req, res) {
    const { pool } = req;

    const { rating, comment } = req.body;
    const clientId = req.session.user.id;
    const { caregiverId } = req.params;

    console.log(caregiverId)

    console.log(clientId)

    try {
        if (pool.connected) {
            let results = await pool.request()
                .input('caregiver_id', caregiverId)
                .input('client_id', clientId)
                .input('rating', rating)
                .input('comment', comment)
                .execute('SubmitRating');

            console.log(results)

            const message = results.recordset[0];

            if (message.ErrorMessage) {
                // Error occurred
                res.status(400).json({
                    success: false,
                    message: message.ErrorMessage,
                });
            } else {
                // Operation was successful
                res.status(200).json({
                    success: true,
                    message: message.SuccessMessage,
                });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while processing your request",
        });
    }
}
async function getRatings(req, res) {
    const { pool } = req;
    const { caregiverId } = req.params;

    try {
        if (pool.connected) {
            let results = await pool.request()
                .input('caregiver_id', caregiverId)
                .execute('GetRatings');

            const ratings = results.recordset;
            console.log(ratings)

            if (ratings && ratings.length > 0) {
                // Ratings are retrieved successfully
                res.status(200).json({
                    success: true,
                    ratings: ratings,
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "No ratings found for the caregiver",
                });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while processing your request",
        });
    }
}


module.exports = { searchCaregiver, requestAppointment, rateCaregivers, getRatings };
