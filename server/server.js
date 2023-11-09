const express = require('express');
const app = express();
const { Route } = require('./Routes/userRoutes');
require('dotenv').config();
const dbConfig = require('./Config/dbconfig')
const sql = require('mssql');
const session = require('express-session')
const { v4 } = require('uuid');


app.use(express.json());
async function startApp() {
    const port = process.env.PORT;
    const oneDay = 1000 * 60 * 60 * 24
    const pool = await sql.connect(dbConfig);
    app.use((req, res, next) => {
        req.pool = pool;
        next();
    })
    app.use(session({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: false,
        rolling: true,
        unset: "destroy",
        genid: () => v4(),
        cookie: {
            maxAge: oneDay,
            httpOnly: false,
            secure: false,
            domain: "localhost"
        }
    }))
    app.use(Route);




    app.listen(port, () => console.log(`server running ${port}`))
}
startApp()