const express = require('express');
const usersRouter = express.Router();
const dbPool = require('../db');

usersRouter.get("/", async (req, res) => {
    try {
        const newElem = await dbPool.query("SELECT Username FROM Users");
        res.json(newElem.rows);
    } catch (err) {
        console.error(err);
        res.status(400);
        res.end('Error');
    }
});

usersRouter.post("/", async (req, res) => {
    try {
        let user = req.body.user;
        const newElem = await dbPool.query("INSERT INTO users(Username) VALUES ($1) RETURNING *", [user]);
        res.json(newElem.rows);
    } catch (err) {
        console.error(err);
        res.status(400);
        res.end('Error');
    }
});

module.exports = usersRouter;