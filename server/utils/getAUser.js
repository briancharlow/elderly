const mssql = require('mssql');
const config = require('../Config/dbconfig');

async function getAUser(email) {
    try {
        let sql = await mssql.connect(config);
        if (sql.connected) {
            let result = await sql.request()
                .input("email", email)
                .execute("GetUserByEmail");

            let user = result.recordset[0];
            return user;
        }
    } catch (error) {
        console.error(error);
        throw error;  // Rethrow the error to be caught by the caller
    }
}

module.exports = getAUser;
