async function searchCaregiver(req, res) {
    const { pool } = req;
    const searchTerm = req.params;

    try {
        if (pool.connected) {
            let results = await pool.request().input('searchTerm', searchTerm).execute('SearchCaregiver');
            const caregivers = results.recordsets[0];
            res.status(200).json({
                success: true,
                message: "Caregivers found",
                caregivers: caregivers,
            })
        }

    } catch (error) {
        console.log(error)
    }
}


module.exports = { searchCaregiver }