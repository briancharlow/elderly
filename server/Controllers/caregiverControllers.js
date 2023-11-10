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