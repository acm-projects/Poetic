
import React, { useState } from "react";
import PoemScroll from "./PoemScroll";
import Profile from "./Profile";

const Collaborate = () => {
    // const allUsersRoute = 'http://localhost:8080/api/users/'
    // const userWords = axios.get(allUsersRoute);
    const userScroll = []
    const userWords = ['one', 'two', 'three', 'four', 'five ']
    const [currentUser, setCurrentUser] = useState(0);

    for (const [index, value] of userWords.entries()) {
        userScroll.push(<Profile username={value} />)
    }

    const nextMatch = () => {
        if (currentUser < userWords.length - 1) {
            setCurrentUser(currentUser + 1);
        }
        else {
            setCurrentUser(0);
        }
    }

    return (
        <div class="flex flex-col py-5 h-screen overflow-auto gap-4 flex-1">

            {userScroll[currentUser]}
            <div class="flex justify-evenly">
                <button class="bg-green-100 rounded p-4 hover:bg-green-200">Yes</button>
                <button class="bg-red-100 rounded p-4 hover:bg-red-200" onClick={nextMatch}>No</button>
            </div>
        </div>
    )
}

export default Collaborate;