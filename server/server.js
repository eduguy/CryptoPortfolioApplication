const express = require('express');
const app = express();
const cors = require('cors');
const entriesRouter = require('./routes/Entries');
const currenciesRouter = require('./routes/Currencies');
const pricesRouter = require('./routes/Prices');
const historyRouter = require('./routes/History');
const usersRouter = require('./routes/Users');

app.use(cors());
app.use(express.json());

app.use('/api/entries', entriesRouter);
app.use('/api/currencies', currenciesRouter);
app.use('/api/prices', pricesRouter);
app.use('/api/history', historyRouter);
app.use('/api/users', usersRouter);

app.listen(5000, () => {
    console.log("Started on 5000");
});