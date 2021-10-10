import React from "react";
import Login from "./Login";
import Main from "./Main";

const LoginPage = () => {
    return (
        <div class="shadow-inner flex p-4 gap-10 bg-red-200">
            <Login />
            <Main />
        </div>
    )
}

export default LoginPage;