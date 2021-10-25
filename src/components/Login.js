import React, { useState } from 'react';
import PoemScroll from './PoemScroll';
import axios from 'axios';

export default function Login () {
    const [values, setValues] = useState({
        username: '',
        password: '',
    });
    const loginRoute = 'http://localhost:8080/api/authentication/login'

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password } = values;
        const user = {username: username, password: password};

        axios.post(loginRoute, user)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err);
            });
    };

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });
    };

    return (
        <div className="shadow-inner flex p-4 gap-10 justify-between bg-red-200">
            <div className="self-start flex flex-col gap-4 shadow-md rounded font-bold p-4 bg-red-400">
                <h2>Login</h2>
                <form className="flex flex-col gap-4">
                    <input className="rounded border border-white" type="username" placeholder="Name"
                           onChange={handleChange('username')}/>
                    <input className="rounded" type="password" placeholder="Password"
                           onChange={handleChange('password')}/>
                    <button onClick={handleSubmit} type='submit'
                            className="bg-red-900 text-white rounded focus:outline-black">Submit
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
    );
}