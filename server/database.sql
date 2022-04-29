CREATE DATABASE CryptoApp;

CREATE TABLE Currencies (
    id VARCHAR(255) PRIMARY KEY 
)

INSERT INTO Currencies(id) VALUES('Bitcoin');
INSERT INTO Currencies(id) VALUES('Ethereum');

CREATE TABLE currencyEntry (
    entry_id SERIAL PRIMARY KEY, 
    buy_price NUMERIC(12,6),
	quantity NUMERIC(10,6),
    coin_name VARCHAR(255) REFERENCES Currencies(id),
    Username VARCHAR(255) REFERENCES Users(Username)
)

CREATE TABLE PortfolioHistory (
    portfolio_value NUMERIC(17, 6),
    ColumnDateTime timestamp DEFAULT now(),
    Username VARCHAR(255) REFERENCES Users(Username)

)

CREATE TABLE Users (
    Username VARCHAR(255) UNIQUE
)


