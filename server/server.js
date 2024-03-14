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
const session = require('express-session')



// app.use(cookieParser());
app.use(express.json());

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


async function startApp() {
    const port = process.env.PORT;
    const pool = await sql.connect(dbConfig);

    app.use((req, res, next) => {
        req.pool = pool;
        next();
    })

    const oneDay = 1000 * 60 * 60 * 24;
    app.use(session({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: oneDay,
            httpOnly: false,
            secure: false,
            domain: "localhost"
        }
    }));

    app.use(Route);
    app.use(caregiverRoute);
    app.use(clientRoute);

    app.listen(port, () => console.log(`server running ${port}`))
}

startApp()
