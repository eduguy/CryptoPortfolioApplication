import React, { Fragment, useState, useEffect } from "react"
import EditEntry from "./editEntry";
import Graph from './Graph';

const AllEntries = () => {

    const [entries, setEntries] = useState([]);
    const [prices, setPrices] = useState({
        "Bitcoin": 0,
        "Ethereum": 0
    });
    const [sumData, setSumData] = useState(0);
    const getEntries = async () => {
        try {
            const response = await fetch("http://localhost:5000/entries");
            const data = await response.json();
            // console.log(data);
            setEntries(data);
        }
        catch (err) {
            console.error(err.message);
        }

    }

    const updateHistory = async () => {
        try {
            let sum = 0;
            for (let en of entries) {
                sum += prices[en.coin_name] * en.quantity;
            }

            //TODO: WAY TOO MUCH DATA, need to reduce it somehow
            console.log(sum);

            //TODO: On fresh refresh, value is going down to 0 because prices is not ready?
            let reqBody = {sum};
            await fetch("http://localhost:5000/history", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(reqBody)
            });
            setSumData(sum);
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        getEntries();
        getPrices();
    }, []); 

    useEffect(() => {
        updateHistory();
    }, [entries, prices]);

    const remove = async (id) => {
        try {
            const response = await fetch("http://localhost:5000/entries/" + id, {
                method:"DELETE"
            });
            console.log(response);
        } catch (err) {
            console.error(err.message);
        }
        setEntries(entries.filter(entry => entry.entry_id !== id));
    }

    const getPrices = async(id) => {
        try {
            const response = await fetch("http://localhost:5000/prices/");
            let data = await response.json();
            let k = data.data;
            const decimalPlaces = 100000;
            setPrices({
                "Bitcoin":  Math.round(k.bitcoin.quote.USD.price * decimalPlaces) / decimalPlaces,
                "Ethereum": Math.round(k.ethereum.quote.USD.price * decimalPlaces) / decimalPlaces
            });
        } catch (err0) {
            
        }
    }
    return (
        <Fragment>
            {" "}
            <Graph data={sumData}/>
            <h2 className="text-center">
                Your coins:
            </h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Coin Name</th>
                        <th>Buy Price</th>
                        <th>Quantity</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>Current Price</th>
                        <th>+/-</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map(entry => (
                        <tr key={entry.entry_id}>
                            <td > {entry.coin_name}</td>
                            <td> {entry.buy_price} </td>
                            <td> {entry.quantity}</td>
                            <td> <EditEntry entry={entry}/> </td>
                            <td><button onClick={() => remove(entry.entry_id)} className="btn btn-danger"> Delete </button></td>
                            <td><button onClick={() => getPrices()} className="btn btn-warning">
                                {prices[entry.coin_name]}
                            </button></td>
                            {/* TODO: maybe add some color? */}
                            <td> {Math.round(((prices[entry.coin_name] - entry.buy_price)/entry.buy_price) * 100 * 1000)/1000}% </td>
                        </tr>

                    ))}


                </tbody>
            </table>

        </Fragment>
    )
}

export default AllEntries;