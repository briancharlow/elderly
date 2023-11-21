const express = require('express');
const app = express();
const { Route } = require('./Routes/userRoutes');
const { caregiverRoute } = require('./Routes/caregiverRoutes');
require('dotenv').config();
const dbConfig = require('./Config/dbconfig')
const sql = require('mssql');
const session = require('express-session')
const { v4 } = require('uuid');
const { clientRoute } = require('./Routes/clientRoutes');
const RedisStore = require("connect-redis").default;
const { createClient } = require("redis");

app.use(express.json());
async function startApp() {




    const port = process.env.PORT;
    const oneDay = 1000 * 60 * 60 * 24
    const pool = await sql.connect(dbConfig);

    const redisClient = createClient();
    redisClient.connect();
    console.log('connected to redis');

    const redisStore = new RedisStore({
        client: redisClient,
        prefix: ''

    })

    app.use((req, res, next) => {
        req.pool = pool;
        next();
    })
    app.use(session({
        store: redisStore,
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
    app.use(caregiverRoute);
    app.use(clientRoute);

    app.use("*", (req, res, next) => {
        const error = new Error("Route Not found");
        next({
            status: 404,
            message: error.message,
        });

    });
    app.use((error, req, res, next) => {
        res.status(error.status).json(error.message);
    });



    app.listen(port, () => console.log(`server running ${port}`))
}
startApp()