import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import configData from "./config.json";

export const myContext = createContext({})
export default function Context(props) {
    const [user, setUser] = useState();
    useEffect(() => {
        axios.get(configData.SERVER_URL + "/authentication/user", { withCredentials: true }).then(res => {
            console.log("Getting api/authentication/user and setting the user.");
            console.log(res.data);
            setUser(res.data);
        });
    }, []);
    return (
        <myContext.Provider value={user}>{props.children}</myContext.Provider>
    )
}