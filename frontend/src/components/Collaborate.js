
import React, { useState, useEffect } from "react";
import PoemScroll from "./PoemScroll";
import Profile from "./Profile";
import axios from "axios";
import configData from "../config.json";

const Collaborate = () => {
    const allUsersRoute = configData.SERVER_URL + "/users/";
    const [currentUser, setCurrentUser] = useState(0);
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);

    const nextMatch = () => {
        if (currentUser < users.length - 1) {
            setCurrentUser(currentUser + 1);
        }
        else {
            setCurrentUser(0);
        }
    }

    const displayUser = (loading) => {
        if (loading) {
            return (
                <div/>
            )
        }
        else {
            console.log("here");
            return (
                <div>
                    {users[currentUser]}
                </div>
            )
        }
    }

    useEffect(() => {
        axios.get(allUsersRoute, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                setUsers(res.data.map(function(user){
                    return (<Profile username={user.username}/>)}));
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    return (
        <div class="flex flex-col py-5 h-screen overflow-auto gap-4 flex-1">
            <div>
            {displayUser(loading)}
            </div>
            <div class="flex justify-evenly">
                <button class="bg-green-100 rounded p-4 hover:bg-green-200">Yes</button>
                <button class="bg-red-100 rounded p-4 hover:bg-red-200" onClick={nextMatch}>No</button>
            </div>
        </div>
    )
}

export default Collaborate;