const dbPool = require('../db');

async function getAllUsers(req,res) {
    try {
        const newElem = await dbPool.query("SELECT Username FROM Users");
        res.json(newElem.rows);
    } catch (err) {
        console.error(err);
        res.status(400);
        res.end('Error');
    }
}

async function addNewUser(req,res) {
    try {
        let user = req.body.user;
        const newElem = await dbPool.query("INSERT INTO users(Username) VALUES ($1) RETURNING *", [user]);
        res.json(newElem.rows);
    } catch (err) {
        console.error(err);
        res.status(400);
        res.end('Error');
    }
}

module.exports = {getAllUsers, addNewUser};