import React, { useState, useEffect, Fragment, Children } from "react"

export const Context = React.createContext();

const Login = ({ children }) => {

    const [userBox, setUserBox] = useState("");
    const [registerBox, setRegisterBox] = useState("");
    const [displayedUser, setDisplayedUser] = useState("");
    const loginUser = async (e) => {
        e.preventDefault();
        setDisplayedUser(userBox);

    }
// TODO: Both of these need database calls
    const registerUser = async (e) => {
        e.preventDefault();
        setDisplayedUser(registerBox);
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

