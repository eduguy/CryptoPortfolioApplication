import React, { useState, useEffect, Fragment, Children } from "react"
import baseURL from "../conn";
export const Context = React.createContext();

const Login = ({ children }) => {

    const [userBox, setUserBox] = useState("");
    const [registerBox, setRegisterBox] = useState("");
    const [displayedUser, setDisplayedUser] = useState("");
    const loginUser = async (e) => {
        if (displayedUser) {
            alert("Sign out of the current user first");
            return;
        }
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
            console.error(err);
            alert("There was an error.")

        }

    }
    const registerUser = async (e) => {
        if (displayedUser) {
            alert("Sign out of the current user first");
            return;

        }
        e.preventDefault();
        try {
            const body = { user: registerBox };
            const req = await fetch(baseURL + "users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (req.status === 400) {
                alert("There was an error, likely duplicate username");
                return;
            }

            setDisplayedUser(registerBox);

        } catch (err) {
            console.error(err);
            alert("There was an error.")
        }
    }

    const signOut = async (e) => {
        window.sessionStorage.clear();
        window.location = "/";
    }

    useEffect(() => {
        let savedUser = window.sessionStorage.getItem('user');
        if (savedUser) {
            setDisplayedUser(savedUser);
        }
    }, []);

    useEffect(() => {
        window.sessionStorage.setItem('user', displayedUser);
    }, [displayedUser]);
    return (
        <Fragment>
            <div className={!displayedUser ? 'loginDiv' : null}>
                {
                    !displayedUser &&
                    <Fragment>
                        <label className="label label-default"> Please register or login to your account: </label>
                        <div className="form-group">
                            <form className="form" onSubmit={loginUser}>
                                <input type="text" onChange={e => setUserBox(e.target.value)}>
                                </input>
                                <button className="btn btn-success">
                                    Login
                                </button>
                            </form>
                        </div>
                        <div className="form-group">

                            <form className="form" onSubmit={registerUser}>
                                <input type="text" onChange={e => setRegisterBox(e.target.value)}>
                                </input>
                                <button className="btn btn-success" >
                                    Register
                                </button>
                            </form>
                        </div>
                    </Fragment>
                }
                {
                    displayedUser &&
                    <Fragment>
                        <label className="label label-default"> Currently signed in: {displayedUser}</label>
                        <button className="btn btn-warning" onClick={signOut}> Sign out </button>

                    </Fragment>
                }

            </div>


            <Context.Provider value={[displayedUser, setDisplayedUser]}>{children}</Context.Provider>
        </Fragment>
    )

}

export default Login;

