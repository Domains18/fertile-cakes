import express from "express";

import { createUser, getUsers } from "../controllers/creators";


export default (router: express.Router) => {
    router.post("/create-user", createUser);
    router.get("/get-users", getUsers);
}