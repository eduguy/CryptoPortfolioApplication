import React, { Fragment, useState, useEffect, useContext } from "react"
import baseURL from "../conn";
import { Context } from "./Login";

const InputEntry = () => {
    const [buy_price, setCost] = useState(0);
    const [coin_name, setcoinName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [currencies, setCurrencies] = useState([]);
    const [user, setUser] = useContext(Context);
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            if (buy_price <= 0 || quantity <= 0 || isNaN(buy_price) || isNaN(quantity) ) {
                throw "There is an issue with your buy price or quantity inputs";
            }
            const reqBody = { buy_price, coin_name, quantity, user };
            let req = await fetch(baseURL + "entries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reqBody)
            });
            if (req.status == 400) {
                throw 'There was an error, possibly on the server';
            }
            window.location = "/";
        } catch (err) {
            alert (err);
        }
    }
    useEffect(() => {
        getCurrencyRows();
    }, []);
    const getCurrencyRows = async () => {
        const currencyRows = await fetch(baseURL + "currencies");
        const data = await currencyRows.json();
        setCurrencies(data);
        setcoinName(data[0].id);
    }

    return (
        <Fragment>
            {
                user && <Fragment>
                    {" "}
                    <form className="d-flex" className="text-center" onSubmit={onSubmitForm}>
                        <label>Buy Price</label>
                        <input type="text" value={buy_price} onChange={e => setCost(e.target.value)} />
                        <label>Quantity (Decimal allowed) </label>
                        <input type="text" value={quantity} onChange={e => setQuantity(e.target.value)} />

                        {/* <input type="text" value={coin_name} onChange={e => setcoinName(e.target.value)}></input> */}
                        <select id="select-coin" onChange={e => setcoinName(e.target.value)}>
                            {/* <option selected="selected" value="courses">Courses</option> */}
                            {
                                currencies.map(currency => (
                                    <option id={currency.id} value={currency.id}>{currency.id}</option>
                                ))
                            }
                        </select>
                        <button className="btn btn-success">
                            Add
                        </button>
                    </form>
                </Fragment>
            }
        </Fragment>

    )
}

export default InputEntry;