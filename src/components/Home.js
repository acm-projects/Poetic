import React, { useMemo, useState } from 'react'
import PoemScroll from './PoemScroll';
import axios from 'axios';

export default function Home() {
    const [values, setValues] = useState({
        username: '',
        password: '',
    });
    const signupRoute = 'http://localhost:8080/api/authentication/register'

    const handleSubmit = async (e) => {
        e.preventDefault(); //prevents screen from reloading

        const { username, password } = values;
        const user = {username: username, password: password};

        axios.post(signupRoute, user)
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
        <div class="flex gap-4 p-4 bg-red-400 shadow-inner">
            <div class="text-6xl rounded bg-white p-4 shadow w-1/5">
                Hello
                <div className="self-start flex flex-col gap-4 shadow-md rounded font-bold p-4 bg-red-400">
                <h2>Sign Up</h2>
                <form className="flex flex-col gap-4 ">
                    <input className="rounded border border-white" type="username" placeholder="Name" class = "text-base"
                           onChange={handleChange('username')}/>
                    <input className="rounded" type="password" placeholder="Password" class = "text-base"
                           onChange={handleChange('password')}/>
                    <button onClick={handleSubmit} type='submit'
                    className="text-4xl bg-red-900 text-white rounded focus:outline-black">Submit
                    </button>
                </form>
            </div>
            </div>
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