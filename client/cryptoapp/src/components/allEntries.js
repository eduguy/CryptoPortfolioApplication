import React, { Fragment, useState, useEffect } from "react"
import EditEntry from "./editEntry";

const AllEntries = () => {

    const [entries, setEntries] = useState([]);
    const [prices, setPrices] = useState({
        "Bitcoin": 0,
        "Ethereum": 0
    });
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
    useEffect(() => {
        getEntries();
        getPrices();
    }, []);

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
                "Bitcoin":  Math.round(k[0].quote.USD.price * decimalPlaces) / decimalPlaces,
                "Ethereum": Math.round(k[1].quote.USD.price * decimalPlaces) / decimalPlaces
            });
        } catch (err0) {
            
        }
    }
    //TODO: add a new column for quantity
    return (
        <Fragment>
            {" "}
            <h2 className="text-center">
                Your coins:
            </h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Coin Name</th>
                        <th>Buy Price</th>
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
                            <td> <EditEntry entry={entry}/> </td>
                            <td><button onClick={() => remove(entry.entry_id)} className="btn btn-danger"> Delete </button></td>
                            <td><button onClick={() => getPrices()} className="btn btn-warning">
                                {prices[entry.coin_name]}
                            </button></td>
                            {/* // TODO: improve math here */}
                            <td> {prices[entry.coin_name]/entry.buy_price} </td>
                        </tr>

                    ))}


                </tbody>
            </table>

        </Fragment>
    )
}

export default AllEntries;