const express = require('express');
const pricesRouter = express.Router();

pricesRouter.get("/", async (req, ret) => {

    const axios = require('axios')

    try {
        if (process.env.NODE_ENV === 'production') {
            axios.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=bitcoin,ethereum', {
                    headers: {
                        'X-CMC_PRO_API_KEY': process.env.COINAPI
                    }
                })
                .then(res => {
                    ret.json(res.data);
                })
                .catch(error => {
                    ret.status(400);
                    console.error(error)
                })
        } else {
            axios.get('https://sandbox-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=bitcoin,ethereum', {
                    headers: {
                        'X-CMC_PRO_API_KEY': 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c'
                    }
                })
                .then(res => {
                    ret.json(res.data);
                })
                .catch(error => {
                    ret.status(400);
                    console.error(error)
                })
        }
    } catch (err) {
        res.status(400);
        res.end('Error');
    }

})

module.exports = pricesRouter;