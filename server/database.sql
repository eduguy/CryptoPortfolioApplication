CREATE DATABASE CryptoApp;

CREATE TABLE Currencies (
    id VARCHAR(255) PRIMARY KEY 
)

INSERT INTO Currencies(id) VALUES('Bitcoin');
INSERT INTO Currencies(id) VALUES('Ethereum');

-- TODO: Increase portoflio history size
CREATE TABLE currencyEntry (
    entry_id SERIAL PRIMARY KEY, 
    buy_price NUMERIC(10,6),
	quantity NUMERIC(10,6),
    coin_name VARCHAR(255) REFERENCES Currencies(id)
)

CREATE TABLE PortfolioHistory (
    portfolio_value NUMERIC(15, 6),
    ColumnDateTime timestamp DEFAULT now()
)

CREATE TABLE Users (
    Username VARCHAR(255) UNIQUE
)

ALTER TABLE currencyEntry
ADD user VARCHAR(255) REFERENCES Users(Username);

ALTER TABLE PortfolioHistory
ADD user VARCHAR(255) REFERENCES Users(Username;


