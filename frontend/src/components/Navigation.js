import React, {useContext} from 'react';
import { Link, withRouter } from "react-router-dom";
import {myContext} from "../Context";
import axios from "axios";

const Navigation = () => {
    const context = useContext(myContext);

    const logout = () => {
        axios.get("http://localhost:8081/api/authentication/logout", { withCredentials: true })
            .then(res => {
                console.log(res);
                window.location.href = "/";
            });
    }

    return (
    <div className="navigation">
        <nav class="bg-gray-300">
            {
                context ? (
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
                            <Link onClick={() => logout()} class="nav-link" to="/">
                                Sign Out
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div class="font-light flex flex-row mx-4 gap-4 text-lg bg-gray-300 justify-end">
                        <div class="hover:underline ">
                            <Link to="/">Poetic</Link>
                        </div>
                        <div class="flex-grow"/>
                    </div>
                )
            }
        </nav>
    </div>
    
    );
}

export default withRouter(Navigation);