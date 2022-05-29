const dbPool = require('../db');

async function deleteFromHistory(req, res) {
    try {
        const data = await dbPool.query("DELETE FROM portfoliohistory WHERE username = $1", [req.params.user]);
        res.json(data.rows);
    } catch (err) {
        console.error(err);
        res.status(400);
        res.end('Error');
    }
}

async function getUserHistory(req, res) {
    try {
        const data = await dbPool.query("SELECT * FROM portfoliohistory WHERE username=$1", [req.params.user]);
        res.json(data.rows);
    } catch (err) {
        console.error(err);
        res.status(400);
        res.end('Error');
    }
}

async function insertIntoHistory(req, res) {
    try {
        const newData = req.body;
        const newElem = await dbPool.query("INSERT INTO portfoliohistory(portfolio_value, username) VALUES($1,$2) RETURNING *", [newData.sum, newData.user]);
        res.json(newElem.rows);
    } catch (err) {
        console.error(err);
        res.status(400);
        res.end('Error');

    }
}

module.exports = { deleteFromHistory, getUserHistory, insertIntoHistory };