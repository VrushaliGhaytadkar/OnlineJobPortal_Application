//packages imports
//const express= require('express');
import swaggerDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import express from "express";
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import morgan from "morgan";
import 'express-async-errors';
import helmet from "helmet";
import xss from "xss-clean";
import mongooseSanitize from "express-mongo-sanitize";

//file imports
import connectDB from "./config/db.js";
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobsRoutes.js";
import swaggerJSDoc from "swagger-jsdoc";

//dot env config
dotenv.config();

//mongoDB Connection
connectDB();
//swagger api config/option
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Job Portal Application',
            description: 'Job Portal Application'
        },
        servers: [
            {
                url: "http://localhost:8082"
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const spec = swaggerDoc(options)
//rest object
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(xss());
app.use(mongooseSanitize());

//routes
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job', jobRoutes);

//homeroute
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(spec));
//validation Middleware

app.use(errorMiddleware);
const PORT = process.env.PORT || 8082
//listen
app.listen(8082, () => {
    console.log(
        `Server is running on ${process.env.DEV_MODE} port ${PORT}`
            .bgCyan.white
    );
});

//databasepass: Kjgxa4IsTYiQndzE