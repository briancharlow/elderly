const express = require('express');
const app = express();
const { Route } = require('./Routes/userRoutes');
const { caregiverRoute } = require('./Routes/caregiverRoutes');
const { clientRoute } = require('./Routes/clientRoutes')
require('dotenv').config();
const dbConfig = require('./Config/dbconfig')
const sql = require('mssql');
const cookieParser = require('cookie-parser');
const cors = require('cors');




app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200
}))

async function startApp() {


    const port = process.env.PORT;

    const pool = await sql.connect(dbConfig);


    app.use((req, res, next) => {
        req.pool = pool;
        next();
    })

    app.use(Route);
    app.use(caregiverRoute);
    app.use(clientRoute);


    // app.use("*", (req, res, next) => {
    //     const error = new Error("Route Not found");
    //     next({
    //         status: 404,
    //         message: error.message,
    //     });

    // });
    // app.use((error, req, res, next) => {
    //     res.status(error.status).json(error.message);
    // });



    app.listen(port, () => console.log(`server running ${port}`))
}
startApp()