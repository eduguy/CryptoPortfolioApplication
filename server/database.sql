CREATE DATABASE CryptoApp;

CREATE TABLE currencyEntry (
    entry_id SERIAL PRIMARY KEY, 
    buy_price INTEGER(),
    coin_name VARCHAR(255) REFERENCES Currencies(id)
)

CREATE TABLE Currencies (
    id VARCHAR(255) PRIMARY KEY 
)

CREATE TABLE currencyEntryTest (
    entry_id SERIAL PRIMARY KEY, 
    buy_price INTEGER,
	quantity NUMERIC(10,6),
    coin_name VARCHAR(255) REFERENCES Currencies(id),
	ColumnDateTime timestamp DEFAULT now()
)

CREATE TABLE PortfolioHistory (
    portfolio_value NUMERIC(15, 6),
    ColumnDateTime timestamp DEFAULT now()
)

INSERT INTO Currencies(id) VALUES(Bitcoin);
INSERT INTO Currencies(id) VALUES(Ethereum);
