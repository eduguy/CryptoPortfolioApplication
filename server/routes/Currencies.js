const express = require('express');
const currenciesController = require('../controllers/CurrenciesController');
const currenciesRouter = express.Router();

currenciesRouter.get("/", currenciesController.getCurrencies);

module.exports = currenciesRouter;