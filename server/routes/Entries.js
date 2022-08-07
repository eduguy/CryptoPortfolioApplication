const express = require('express');
const EntriesController = require('../controllers/EntriesController');
const entriesRouter = express.Router();

entriesRouter.post("/", EntriesController.addNewEntry);
entriesRouter.get("/:user", EntriesController.getUserEntries);
entriesRouter.put("/:id", EntriesController.updateEntry);
entriesRouter.delete("/:id", EntriesController.deleteEntry);

module.exports = entriesRouter;