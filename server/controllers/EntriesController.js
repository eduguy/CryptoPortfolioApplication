const dbPool = require('../db');

async function addNewEntry(req, res) {
    try {
        const newData = req.body;
        const newElem = await dbPool.query("INSERT INTO currencyEntry(buy_price, coin_name, quantity, username) VALUES($1, $2, $3, $4) RETURNING *", [newData.buy_price, newData.coin_name, newData.quantity, newData.user]);
        res.json(newElem.rows);
    } catch (err) {
        console.error(err);
        res.status(400);
        res.end('Error');
    }
}

async function getUserEntries(req, res) {
    try {
        let user = req.params.user;
        const data = await dbPool.query("SELECT * FROM currencyEntry WHERE username=$1", [user]);
        res.json(data.rows);
    } catch (err) {
        console.error(err);
        res.status(400);
        res.end('Error');
    }
}

async function updateEntry(req, res) {
    try {
        let newPrice = req.body.price;
        const data = await dbPool.query("UPDATE currencyEntry SET buy_price=$1 WHERE entry_id=$2 RETURNING *", [newPrice, req.params.id]);
        res.json(data.rows);

    } catch (err) {
        console.error(err);
        res.status(400);
        res.end('Error');
    }
}

async function deleteEntry(req, res) {
    try {
        const data = await dbPool.query("DELETE FROM currencyEntry WHERE entry_id = $1 RETURNING *", [req.params.id]);
        res.json(data.rows);
    } catch (err) {
        console.error(err);
        res.status(400);
        res.end('Error');
    }
}


module.exports = { addNewEntry, getUserEntries, updateEntry, deleteEntry };