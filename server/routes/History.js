const express = require('express');
const historyRouter = express.Router();
const dbPool = require('../db');

historyRouter.delete("/:user", async (req, res) => {
    try {
        const data = await dbPool.query("DELETE FROM portfoliohistory WHERE username = $1", [req.params.user]);
        res.json(data.rows);
    } catch (err) {
        console.error(err);
        res.status(400);
        res.end('Error');
    }
})



historyRouter.get("/:user", async (req, res) => {
    try {
        const data = await dbPool.query("SELECT * FROM portfoliohistory WHERE username=$1", [req.params.user]);
        res.json(data.rows);
    } catch (err) {
        console.error(err);
        res.status(400);
        res.end('Error');
    }
});

historyRouter.post("/", async (req, res) => {
    try {
        const newData = req.body;
        const newElem = await dbPool.query("INSERT INTO portfoliohistory(portfolio_value, username) VALUES($1,$2) RETURNING *", [newData.sum,newData.user]);
        res.json(newElem.rows);
    } catch (err) {
        console.error(err);
        res.status(400);
        res.end('Error');

    }
});

module.exports = historyRouter;