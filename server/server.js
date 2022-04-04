const express = require('express');
const app = express();
const cors = require('cors');
const dbPool = require('./db');
const { resolve } = require('path');

app.use(cors());
app.use(express.json());

// Create a purchase entry
//TODO: Update code to include quantity
app.post("/entries", async (req, res) => {
    try {
        const newData = req.body;
        const newElem = await dbPool.query("INSERT INTO currencyEntry(buy_price, coin_name) VALUES($1, $2) RETURNING *", [newData.buy_price, newData.coin_name]);
        res.json(newElem.rows);
    } catch (err) {
        console.error(err);
    }
})

// get all purchase entry

app.get("/entries", async (req, res) => {
    try {
        const data = await dbPool.query("SELECT * FROM currencyEntry");
        res.json(data.rows);
    } catch (err) {
        console.error(err);
    }
});

app.get("/currencies", async (req, res) => {
    try {
        const data = await dbPool.query("SELECT * FROM currencies");
        res.json(data.rows);
    } catch (err) {
        console.error(err);
    }
});


// update a purchase entry with id, buy_price, coin_name
app.put("/entries/:id", async (req, res) => {
    try {
        console.log(req.body.price);
        let newPrice = req.body.price;
        const data = await dbPool.query("UPDATE currencyEntry SET buy_price=$1 WHERE entry_id=$2 RETURNING *", [newPrice, req.params.id]);
        res.json(data.rows);
        console.log('a');
        
    } catch (err) {
        console.error(err);
    }
});

// delete an purchase entry

app.delete("/entries/:id", async (req, res) => {
    try {
        const data = await dbPool.query("DELETE FROM currencyEntry WHERE entry_id = $1 RETURNING *", [req.params.id]);
        res.json(data.rows);
    } catch (err) {
        console.error(err);
    }
});

app.get("/prices", async (req, ret) => {

    const axios = require('axios')

    axios
      .get('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
          headers: {
            'X-CMC_PRO_API_KEY': 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c'
          }
      })
      .then(res => {
        // console.log(`statusCode: ${res.status}`)
        ret.json(res.data);
      })
      .catch(error => {
        console.error(error)
      })
})

app.get("/history", async (req,res) => {
    try {
        const data = await dbPool.query("SELECT * FROM portfoliohistory");
        res.json(data.rows);
    } catch (err) {
        console.error(err);
    }
});

app.listen(5000, () => {
    console.log("Started on 5000");
});