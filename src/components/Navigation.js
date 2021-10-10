import React from 'react';
import Home from './Home';
import Login from './Login';
import { Link, withRouter } from "react-router-dom";

const Navigation = (props) => {
    return (
    <div className="navigation">
        <nav class="bg-gray-300">
            <div  class="font-light flex flex-row mx-4 gap-4 text-lg bg-gray-300 justify-end">
                <div class="hover:underline ">
                    <Link to="/">Poetic</Link>
                </div>
                <div class="flex-grow"/>
                <div class="hover:underline ">
                    <Link class="nav-link" to="/">
                        Home
                        <span class="sr-only">(current)</span>
                    </Link>
                </div>
                <div class="hover:underline ">
                    <Link class="nav-link" to="/login">
                        Login
                    </Link>
                </div>
                <div class="hover:underline ">
                    <Link class="nav-link" to="/collaborate">
                        Collaborate
                    </Link>
                </div>
            </div>
        </nav>
    </div>
    
    );
}

export default withRouter(Navigation);