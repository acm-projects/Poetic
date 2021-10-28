import React, { useMemo, useState } from 'react'
import PoemScroll from './PoemScroll';
import axios from 'axios';

export default function Home(props) {
    const [values, setValues] = useState({
        username: '',
        password: '',
    });
    const loginRoute = 'http://localhost:8080/api/authentication/login'
    const signupRoute = 'http://localhost:8080/api/authentication/register'

    
    const handleLogin = async (e) => {
        e.preventDefault();

        const { username, password } = values;
        const user = {username: username, password: password};

        axios.post(loginRoute, user)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                props.handleLogInState();
                console.error(err);
            });
    };

    const handleSignUp = async (e) => {
        e.preventDefault(); //prevents screen from reloading

        const { username, password } = values;
        const user = {username: username, password: password};

        axios.post(signupRoute, user)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                props.handleLogInState();
                console.error(err);
            });
    }

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });
    };

    const handleLoginChanges = (isLoggedIn) => {
        if (isLoggedIn) {
            return (
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
            <div className="self-start flex flex-col gap-4 p-6 font-bold text-8xl flex-1 bg-white rounded">
                <div>
                Hello
                </div>
                <div className="bg-red-50 rounded p-4 font-normal text-6xl">
                    Here are some words.
                </div>
                <div className="text-left text-4xl font-light">
                    &emsp;These words describe what poetic is blah blah blah
                </div>
            </div>

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
