# Crypto App (Work In Progress)

### A CRUD app using the PERN stack to track your crypto portfolio.

![image](https://user-images.githubusercontent.com/34255728/162121825-b25ed1ce-eca5-43bd-9376-4efe74f02457.png)

## Features

- Graphing of portfolio value over time using Chartjs
- Realtime prices retrieved from the CoinMarketCap API

## Usage

You can try it out here! It is hosted on AWS at http://54.193.122.205/

There is a limit to the number of price API calls per day. If the price no longer updates, then the application has reached the limit.

To set up your own environment:

- In the server directory, use command `nodemon server`
- In the client/cryptoapp directory, use command `yarn start`
- Create `.env` in server directory with postgres server credentials
- If you want to see real price data, set `COINAPI` to your CoinMarketCap PRO API Keys in `.env` and set `NODE_ENV` to `production`, otherwise it will connect to the test API
