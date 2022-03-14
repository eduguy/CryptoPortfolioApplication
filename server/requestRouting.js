const express = require('express');
const app = express();
const cors = require('cors');
const dbPool = require('./db');

app.use(cors());
app.use(express.json());

// Create a purchase entry

app.post("/entries", async (req, res) => {
    try {
        const newData  = req.body;
        const newElem = await dbPool.query("INSERT INTO currencyEntry(buy_price, coin_name) VALUES($1, $2) RETURNING *", [newData.buy_price, newData.coin_name]);
        res.json(newElem.rows);
    } catch (err) {
        console.error(err);
    }
})

// get all purchase entry

app.get("/entries", async (req,res) => {
    try {
        const data = await dbPool.query("SELECT * FROM currencyEntry");
        res.json(data.rows);
    } catch (err) {
        console.error(err);
    }
});

// get a purchase entry


// update a purchase entry with id, buy_price, coin_name
app.put("/entries/:id/:buy_price/:coin_name", async(req,res) => {
    try {
        const data = await dbPool.query("UPDATE currencyEntry SET buy_price=$1, coin_name=$2 WHERE entry_id=$3 RETURNING *", [req.params.buy_price, req.params.coin_name, req.params.id]);
        res.json(data.rows);
    } catch (err) {
        console.error(err);
    }
});

// delete an purchase entry

app.delete("/entries/:id", async (req,res) => {
    try {
        const data = await dbPool.query("DELETE FROM currencyEntry WHERE entry_id = $1 RETURNING *",[req.params.id]);
        res.json(data.rows);
    } catch (err) {
        console.error(err);
    }
});

app.listen(5000, () =>{
    console.log("started on 5000");
});