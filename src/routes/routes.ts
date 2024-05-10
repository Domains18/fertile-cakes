import express from "express";


import authetication from "./authetication";


const router = express.Router();



export default (): express.Router => {
    authetication(router);
    return router;
}