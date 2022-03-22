import React, {Fragment, useState} from "react"

const InputEntry = () => {
    const [buy_price, setCost] = useState(0);
    const [coin_name, setcoinName] = useState("Coin");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
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

    return (
        <Fragment>
            <h1 className="text-center">
                Crypto Portfolio Tracker
            </h1>
            <form className="d-flex" className = "text-center" onSubmit={onSubmitForm}>
                <input type="text" value={buy_price} onChange={e => setCost(e.target.value)}/>
                <input type="text" value={coin_name} onChange={e => setcoinName(e.target.value)}></input>
                    <button className="btn btn-success">
                        Add
                    </button>
            </form>
        </Fragment>
    )
} 

export default InputEntry;