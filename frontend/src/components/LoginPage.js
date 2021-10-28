import React, { useState } from "react";
import Login from "./Login";
import Main from "./Main";

const LoginPage = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    const submitHandler = () => {
        setLoggedIn(true);
        console.log("hello")
        console.log(isLoggedIn)
    }

    const checkContent = (isLoggedIn) => {
        if (isLoggedIn) {
            return (
                <div class="shadow-inner flex p-4 gap-10 bg-red-200">
                    <Main />
                </div>
            )
        }
        else {
            return (
                <div class="shadow-inner flex p-4 gap-10 bg-red-200"> 
                    <Login handler={submitHandler}/>
                    <Main />
                </div>
            );
        }
    }

    return (
        <div>{checkContent(isLoggedIn)}</div>
    )
}

export default LoginPage;