import React, {createContext, useEffect, useState} from "react";
import axios from "axios";

export const myContext = createContext({})
export default function Context(props) {
    const [user, setUser] = useState();
    useEffect(() => {
        axios.get("http://localhost:8081/user", { withCredentials: true }).then(res => {
            console.log("Getting /user and setting the user.");
            console.log(res.data);
            setUser(res.data);
        });
    }, []);
    return (
        <myContext.Provider value={user}>{props.children}</myContext.Provider>
    )
}