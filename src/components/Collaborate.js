import React, { useState } from "react";
import PoemScroll from "./PoemScroll";
import Profile from "./Profile";

const Collaborate = () => {
    const userScroll = []
    const userWords = ['one', 'two', 'three', 'four', 'five ']
    const [currentUser, setCurrentUser] = useState(0);

    for (const [index, value] of userWords.entries()) {
        userScroll.push(<Profile username={value} />)
    }
    
    const nextMatch = () => {
        if (currentUser < userWords.length - 1) {
            setCurrentUser(currentUser+1);
        }
        else {
            setCurrentUser(0);
        }
    }

    return (
        <div class="flex flex-col py-5 h-screen overflow-auto gap-4 flex-1">
                
                {userScroll[currentUser]}
                <button onClick={nextMatch}>No</button>
                
            </div>
    )
}

export default Collaborate;