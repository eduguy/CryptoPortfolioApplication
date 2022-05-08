const express = require('express');
const historyRouter = express.Router();
const historyController = require('../controllers/HistoryController');

historyRouter.delete("/:user", historyController.deleteFromHistory);
historyRouter.get("/:user", historyController.getUserHistory);
historyRouter.post("/", historyController.insertIntoHistory);

module.exports = historyRouter;