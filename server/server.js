const express = require('express');
const app = express();
const cors = require('cors');
const dbPool = require('./db');
const { resolve } = require('path');

app.use(cors());
app.use(express.json());

// Create a purchase entry

app.post("/api/entries", async (req, res) => {
    try {
        const newData = req.body;
        const newElem = await dbPool.query("INSERT INTO currencyEntry(buy_price, coin_name, quantity, username) VALUES($1, $2, $3, $4) RETURNING *", [newData.buy_price, newData.coin_name, newData.quantity, newData.user]);

        res.json(newElem.rows);
    } catch (err) {
        console.error(err);
        res.status(400);
        res.end('Error');
    }
})

// get all purchase entry

app.get("/api/entries/:user", async (req, res) => {
    try {
        let user = req.params.user;
        const data = await dbPool.query("SELECT * FROM currencyEntry WHERE username=$1", [user]);
        res.json(data.rows);
    } catch (err) {
        console.error(err);
        res.status(400);
        res.end('Error');
    }
});

app.get("/api/currencies", async (req, res) => {
    try {
        const data = await dbPool.query("SELECT * FROM currencies");
        res.json(data.rows);
    } catch (err) {
        console.error(err);
        res.status(400);
        res.end('Error');
    }
});


// update a purchase entry with id, buy_price, coin_name
app.put("/api/entries/:id", async (req, res) => {
    try {
        let newPrice = req.body.price;
        const data = await dbPool.query("UPDATE currencyEntry SET buy_price=$1 WHERE entry_id=$2 RETURNING *", [newPrice, req.params.id]);
        res.json(data.rows);

    } catch (err) {
        console.error(err);
        res.status(400);
        res.end('Error');
    }
});

// delete an purchase entry

app.delete("/api/entries/:id", async (req, res) => {
    try {
        const data = await dbPool.query("DELETE FROM currencyEntry WHERE entry_id = $1 RETURNING *", [req.params.id]);
        res.json(data.rows);
    } catch (err) {
        console.error(err);
        res.status(400);
        res.end('Error');
    }
});

app.delete("/api/history/:user", async (req, res) => {
    try {
        const data = await dbPool.query("DELETE FROM portfoliohistory WHERE username = $1", [req.params.user]);
        res.json(data.rows);
    } catch (err) {
        console.error(err);
        res.status(400);
        res.end('Error');
    }
})

app.get("/api/prices", async (req, ret) => {

    const axios = require('axios')

    try {
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
    } catch (err) {
        res.status(400);
        res.end('Error');
    }

})

app.get("/api/history/:user", async (req, res) => {
    try {
        const data = await dbPool.query("SELECT * FROM portfoliohistory WHERE username=$1", [req.params.user]);
        res.json(data.rows);
    } catch (err) {
        console.error(err);
        res.status(400);
        res.end('Error');
    }
});

app.post("/api/history", async (req, res) => {
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

app.get("/api/users", async (req, res) => {
    try {
        const newElem = await dbPool.query("SELECT Username FROM Users");
        res.json(newElem.rows);
    } catch (err) {
        console.error(err);
        res.status(400);
        res.end('Error');
    }
});

app.post("/api/users", async (req, res) => {
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

app.listen(5000, () => {
    console.log("Started on 5000");
});