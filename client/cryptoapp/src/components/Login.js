import React, { useState, useEffect, Fragment, Children } from "react"
import baseURL from "../conn";
export const Context = React.createContext();

const Login = ({ children }) => {

    const [userBox, setUserBox] = useState("");
    const [registerBox, setRegisterBox] = useState("");
    const [displayedUser, setDisplayedUser] = useState("");
    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const req = await fetch(baseURL + "users");
            const data = await req.json();

            if (data.filter(obj => obj.username === userBox).length > 0) {
                setDisplayedUser(userBox);
            } else {
                alert("This username wasn't found");
            }

        } catch (err) {
            //TODO: Show some error here on the screen
            console.error(err);
        }

    }
    // TODO: Both of these need database calls
    const registerUser = async (e) => {
        e.preventDefault();
        try {
            const body = { user: registerBox };
            const req = await fetch(baseURL + "users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }).then((res) => {
                if (res.status === 400) {
                    alert("There was an error, likely duplicate username");
                }
            });
            setDisplayedUser(registerBox);

        } catch (err) {
            //TODO: Show some error here on the screen
            console.error(err);
        }



    }

    useEffect(() => {
        setDisplayedUser(window.sessionStorage.getItem('user'));
    }, []);

    useEffect(() => {
        window.sessionStorage.setItem('user', displayedUser);
    }, [displayedUser]);

    return (
        <Fragment>
            <form onSubmit={loginUser}>
                <input type="text" onChange={e => setUserBox(e.target.value)}>
                </input>
                <button >
                    Login
                </button>
            </form>
            <form onSubmit={registerUser}>
                <input type="text" onChange={e => setRegisterBox(e.target.value)}>
                </input>
                <button >
                    Register
                </button>
            </form>
            <label> Currently signed in: {displayedUser}</label>


            <Context.Provider value={[displayedUser, setDisplayedUser]}>{children}</Context.Provider>
        </Fragment>
    )

}

export default Login;

