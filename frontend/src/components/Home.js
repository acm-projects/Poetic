import React, { useState } from 'react'
import PoemScroll from './PoemScroll';
import axios from 'axios';
import Main from './Main'

export default function Home(props) {
    const [values, setValues] = useState({
        username: '',
        password: '',
    });

    const loginRoute = 'http://localhost:8081/api/authentication/login'
    const signupRoute = 'http://localhost:8081/api/authentication/register'


    const handleLogin = async (e) => {
        e.preventDefault();

        const { username, password } = values;
        const user = {username: username, password: password};

        axios.post(loginRoute, user)
            .then(res => {
                console.log(res);
                props.handleLogInState(true);
            })
            .catch(err => {
                console.error(err);
            });
        
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
    };

    const handleSignUp = async (e) => {
        e.preventDefault(); //prevents screen from reloading

        const { username, password } = values;
        const user = {username: username, password: password};

        axios.post(signupRoute, user)
            .then(res => {
                console.log(res);
                props.handleLogInState(true);
            })
            .catch(err => {
                console.error(err);
            });

        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
    }

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });
    };

    const handleLoginChanges = (isLoggedIn) => {
        const username = localStorage.getItem('username'); //needs to be stored to get the local users data later

        if (isLoggedIn) {
            return (
            <div className="self-start flex flex-col gap-4 shadow-md rounded font-bold p-4 bg-red-200">
                    Currently logged in as:
                    <div class = "text-5xl text-black text-bold"> 
                    {username} 
                    </div>
            <div class="flex gap-4 p-4 bg-red-400 shadow-inner">
            <div class="flex flex-col flex-1">
                <div class="bg-blue-100 rounded p-2">
                    Popular
                </div>
                <PoemScroll />
            </div>
            <div class="flex flex-col flex-1">
                <div class="bg-green-100 rounded p-2">
                    Based on tags
                </div>
                <PoemScroll />
                </div>
            </div>
        </div>
            );
        }
        else {
            return (
                <div className="shadow-inner flex p-4 gap-10 justify-between bg-red-200">
            <div className="self-start flex flex-col gap-4 shadow-md rounded font-bold p-4 bg-red-400">
                <h2>Login</h2>
                <form className="flex flex-col gap-4">
                    <input className="rounded border border-white" type="username" placeholder="Name"
                           onChange={handleChange('username')}/>
                    <input className="rounded" type="password" placeholder="Password"
                           onChange={handleChange('password')}/>
                    <button onClick={handleSignUp} type='signup'
                            className="bg-red-900 text-white rounded focus:outline-black">Sign Up
                    </button>
                    <button onClick={handleLogin} type='login' className="bg-red-900 text-white rounded focus:outline-black">
                        Log In
                    </button>
                </form>
            </div>

            <Main/>

            <PoemScroll/>
        </div>
            )
        }
    }

    return (
        <div>
        {handleLoginChanges(props.isLoggedIn)}
        </div>
    );
}
