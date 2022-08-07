const dbPool = require('../db');

async function getCurrencies(req, res) {
    try {
        const data = await dbPool.query("SELECT * FROM currencies");
        res.json(data.rows);
    } catch (err) {
        console.error(err);
        res.status(400);
        res.end('Error');
    }
}

module.exports = { getCurrencies }