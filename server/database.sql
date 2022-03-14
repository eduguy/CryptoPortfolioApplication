CREATE DATABASE CryptoApp;

CREATE TABLE currencyEntry (
    entry_id SERIAL PRIMARY KEY, 
    buy_price INTEGER(),
    coin_name VARCHAR(255) REFERENCES Currencies(id)
)

CREATE TABLE Currencies (
    id VARCHAR(255) PRIMARY KEY 
)

INSERT INTO Currencies(id) VALUES(Bitcoin);
INSERT INTO Currencies(id) VALUES(Ethereum);
