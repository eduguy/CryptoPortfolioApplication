import React, { Fragment, useState, useEffect } from "react"

const AllEntries = () => {

    const [entries, setEntries] = useState([]);
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
    }, []);

    console.log(entries);
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
                    </tr>
                </thead>
                <tbody>

                    {entries.map(entry => {
                        <tr>
                            {/* <td> {entry.coin_name}</td>
                            <td> {entry.buy_price} </td> */}
                            <td> Edit </td>
                            <td> delete</td>
                        </tr>

                    })}

                </tbody>
            </table>

        </Fragment>
    )
}

export default AllEntries;