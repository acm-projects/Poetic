import React, {useContext} from 'react';
import { Link, withRouter } from "react-router-dom";
import {myContext} from "../Context";
import axios from "axios";
import configData from "../config.json";
import Logo from "../resources/PoeticLogo.png"

const Navigation = () => {
    const context = useContext(myContext);

    const logout = () => {
        axios.get(configData.SERVER_URL + "/authentication/logout", { withCredentials: true })
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
                        <div  class="font-light flex flex-row mx-4 gap-4 text-lg bg-gray-300 justify-end align-bottom">
                            <div class="hover:underline w-1/12">
                                <Link to="/">
                                    <img src = {Logo}/>
                                </Link>
                            </div>
                            <div class="flex-grow"/>
                            <div class="hover:underline">
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
                        <div  class="font-light flex flex-row mx-4 gap-4 text-lg bg-gray-300 justify-end align-bottom">
                            <div class="hover:underline w-1/12">
                            <Link to="/">
                                <img src = {Logo}/>
                            </Link>
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