import React, { useState } from 'react';
import Poem from './Poem';
import Form from 'semantic-ui-react'
import PoemScroll from './PoemScroll';
import axios from 'axios';

export default function Login () {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState(false);
    const client = 'https://localhost:8080/api/authentication/login'

    const postData = () => {
        console.log("reached post");
        axios.post(client, {
            username,
            password
        })
    }
    return (
        <div class="shadow-inner flex p-4 gap-10 justify-between bg-red-200">
            <div class="self-start flex flex-col gap-4 shadow-md rounded font-bold p-4 bg-red-400">
                <h2>Login</h2>
                <form class="flex flex-col gap-4">
                    <input class="rounded border border-white" type="username" placeholder="Name" onChange={(e) => setUserName(e.target.value)}/>
                    <input class="rounded" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    <button onClick={postData} type = 'submit' class="bg-red-900 text-white rounded focus:outline-black">Submit</button>
                </form>
            </div>
            <div class="self-start flex flex-col gap-4 p-6 font-bold text-8xl flex-1 bg-white rounded">
                <div>
                Hello
                </div>
                <div class="bg-red-50 rounded p-4 font-normal text-6xl">
                    Here are some words.
                </div>
                <div class="text-left text-4xl font-light">
                    &emsp;These words describe what poetic is blah blah blah
                </div>
            </div>
            
            <PoemScroll />
        </div>
        );
}