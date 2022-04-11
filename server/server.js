const express = require('express');
const app = express();
const cors = require('cors');
const dbPool = require('./db');
const { resolve } = require('path');

app.use(cors());
app.use(express.json());

//TODO: Pass errors back to front end so when DB fails, there is indication on client side
//TODO: Create an accounts system
// Create a purchase entry

app.post("/api/entries", async (req, res) => {
    try {
        const newData = req.body;
        const newElem = await dbPool.query("INSERT INTO currencyEntry(buy_price, coin_name, quantity) VALUES($1, $2, $3) RETURNING *", [newData.buy_price, newData.coin_name, newData.quantity]);

        res.json(newElem.rows);
    } catch (err) {
        console.error(err);
    }
})

// get all purchase entry

app.get("/api/entries", async (req, res) => {
    try {
        const data = await dbPool.query("SELECT * FROM currencyEntry");
        res.json(data.rows);
    } catch (err) {
        console.error(err);
    }
});

app.get("/api/currencies", async (req, res) => {
    try {
        const data = await dbPool.query("SELECT * FROM currencies");
        res.json(data.rows);
    } catch (err) {
        console.error(err);
    }
});


// update a purchase entry with id, buy_price, coin_name
app.put("/api/entries/:id", async (req, res) => {
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

app.delete("/api/entries/:id", async (req, res) => {
    try {
        const data = await dbPool.query("DELETE FROM currencyEntry WHERE entry_id = $1 RETURNING *", [req.params.id]);
        res.json(data.rows);
    } catch (err) {
        console.error(err);
    }
});

app.delete("/api/history", async (req, res) => {
    console.log("a");
    try {
        const data = await dbPool.query("DELETE FROM portfoliohistory");
        res.json(data.rows);
    } catch (err) {
        console.error(err);
    }
})

app.get("/api/prices", async (req, ret) => {

    const axios = require('axios')

    if (process.env.NODE_ENV === 'production') {
        axios
            .get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=bitcoin,ethereum', {
                headers: {
                    'X-CMC_PRO_API_KEY': process.env.COINAPI
                }
            })
            .then(res => {
                ret.json(res.data);
            })
            .catch(error => {
                console.error(error)
            })
    } else {
        axios
            .get('https://sandbox-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=bitcoin,ethereum', {
                headers: {
                    'X-CMC_PRO_API_KEY': 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c'
                }
            })
            .then(res => {
                ret.json(res.data);
            })
            .catch(error => {
                console.error(error)
            })
    }

})

app.get("/api/history", async (req, res) => {
    try {
        const data = await dbPool.query("SELECT * FROM portfoliohistory");
        res.json(data.rows);
    } catch (err) {
        console.error(err);
    }
});

app.post("/api/history", async (req, res) => {
    try {
        const newData = req.body;
        const newElem = await dbPool.query("INSERT INTO portfoliohistory(portfolio_value) VALUES($1) RETURNING *", [newData.sum]);
        res.json(newElem.rows);
    } catch (err) {
        console.error(err);
    }
});

app.listen(5000, () => {
    console.log("Started on 5000");
});