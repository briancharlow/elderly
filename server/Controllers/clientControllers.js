async function searchCaregiver(req, res) {
    const { pool } = req;
    const searchTerm = req.params;

    try {
        if (pool.connected) {
            let results = await pool.request()
                .input('searchTerm', searchTerm)
                .execute('SearchCaregiver');

            console.log(results)
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
    }
}


module.exports = { searchCaregiver }