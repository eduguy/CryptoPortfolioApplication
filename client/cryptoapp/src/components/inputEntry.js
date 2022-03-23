import React, {Fragment, useState, useEffect} from "react"

const InputEntry = () => {
    const [buy_price, setCost] = useState(0);
    const [coin_name, setcoinName] = useState("");
    const [currencies, setCurrencies] = useState([]);

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            // TODO: do some basic client side validation of inputs
            const reqBody = {buy_price, coin_name};
            const response = await fetch("http://localhost:5000/entries", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(reqBody)
            });
            window.location="/";
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getCurrencyRows();
    }, []);    
    const getCurrencyRows = async () => {
            const currencyRows = await fetch("http://localhost:5000/currencies");
            // window.location="/";
            const data = await currencyRows.json();
        setCurrencies(data);
        console.log('a');

    }

    return (
        <Fragment>
            {" "}
            <h1 className="text-center">
                Crypto Portfolio Tracker
            </h1>
            <form className="d-flex" className = "text-center" onSubmit={onSubmitForm}>
                <input type="text" value={buy_price} onChange={e => setCost(e.target.value)}/>
                {/* <input type="text" value={coin_name} onChange={e => setcoinName(e.target.value)}></input> */}
                <select id="select-coin" onChange={e => setcoinName(e.target.value)}>
                {/* <option selected="selected" value="courses">Courses</option> */}
                {
                    currencies.map(currency => (
                        <option id ={currency.id} value={currency.id}>{currency.id}</option>
                    ))
                }
                </select>
                    <button className="btn btn-success">
                        Add
                    </button>
            </form>
        </Fragment>
    )
} 

export default InputEntry;