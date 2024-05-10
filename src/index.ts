import express from 'express';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import requireEnvironmentVariables from './classes/globals';

import router from './routes/routes';

const port =  requireEnvironmentVariables.getPort();

dotenv.config();


const app = express();

//cross origin resource sharing
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    optionsSuccessStatus: 200
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const server = http.createServer(app);


app.use('/api', router());

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//app.listen(process.env.PORT, () => {