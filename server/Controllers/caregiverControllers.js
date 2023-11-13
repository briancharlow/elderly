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
async function createAppointment(req, res) {
    const caregiver = req.session.user;
    const { user, time } = req.body;
    try {
        if (pool.connected) {

        }
    } catch (error) {
        console.log(error)
    }
}
async function getAppointments(req, res) {
    const caregiver = req.session.user;
    try {
        if (pool.connected) {

        }
    } catch (error) {
        console.log(error)
    }
}
async function getCaregivers(req, res) {

    try {
        if (pool.connected) {
            let results = await pool.request().execute('GetAllCaregivers');
            console.log(results)
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

module.exports = { getCaregivers, getAppointments, createAppointment, updateProfile }
