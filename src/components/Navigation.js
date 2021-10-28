import React from 'react';
import Home from './Home';
import { Link, withRouter } from "react-router-dom";

const Navigation = (props) => {
    const handleLoginChanges = (isLoggedIn) => {
        if (isLoggedIn) {
            return (
            <div  class="font-light flex flex-row mx-4 gap-4 text-lg bg-gray-300 justify-end">
                <div class="hover:underline ">
                    <Link to="/">Poetic</Link>
                </div>
                <div class="flex-grow"/>
                <div class="hover:underline ">
                    <Link class="nav-link" to="/collaborate">
                        Collaborate
                    </Link>
                </div>
                    <div class="hover:underline ">
                        <Link class="nav-link" to="/editor">
                            Editor
                        </Link>
                    </div>
                    <div class="hover:underline ">
                        <Link class="nav-link" to="/profile">
                            Profile
                        </Link>
                    </div>
                    <div class="hover:underline ">
                        <Link onClick={props.signOutHandler} class="nav-link" to="/">
                            Sign Out
                        </Link>
                    </div>
            </div>
            );
        }
        else {
            return (
            <div class="font-light flex flex-row mx-4 gap-4 text-lg bg-gray-300 justify-end">
                <div class="hover:underline ">
                    <Link to="/">Poetic</Link>
                </div>
                <div class="flex-grow"/>
            </div>
            );
        }
    }

    return (
    <div className="navigation">
        <nav class="bg-gray-300">
            {handleLoginChanges(props.isLoggedIn)}
        </nav>
    </div>
    
    );
}

export default withRouter(Navigation);