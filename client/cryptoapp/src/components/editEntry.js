import React, { Fragment, useState } from "react";
import baseURL from "../conn";
const EditEntry = ({ entry }) => {

    const [price, setPrice] = useState(entry.buy_price);

    const updatePrice = async (e) => {
        e.preventDefault();
        try {
            const body = { price };

            const req = await fetch(baseURL + "entries/" + entry.entry_id, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            console.log(req);
            window.location = "/";
        } catch (err) {
            console.error(err);
        }
    }
    return <Fragment>

        <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#${entry.entry_id}`}>
            Edit
        </button>

        <div onClick={(e) => setPrice(entry.buy_price)} className="modal" id={entry.entry_id}>
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">Edit Currency Entry</h4>
                        <button type="button" onClick={(e) => setPrice(entry.buy_price)} className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <input type="text" onChange={(e) => setPrice(parseInt(e.target.value))} value={price} className="form-control" />
                    </div>

                    <div className="modal-footer">
                        <button type="button" onClick={e => updatePrice(e)} className="btn btn-warning"> Edit</button>
                        <button type="button" onClick={(e) => setPrice(entry.buy_price)} className="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>

                </div>
            </div>
        </div>

    </Fragment>;



}

export default EditEntry