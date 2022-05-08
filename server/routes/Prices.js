const express = require('express');
const PricesController = require('../controllers/PricesController');
const pricesRouter = express.Router();

pricesRouter.get("/", PricesController.getPrices);

module.exports = pricesRouter;