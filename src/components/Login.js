import React from 'react';

const Login = () => {
    return (
        <div>
            <div class="flex flex-col gap-4 shadow-md rounded font-bold p-4 bg-red-400">
                <h2>Login</h2>
                <form class="flex flex-col gap-4">
                    <input class="rounded border border-white" type="text" placeholder="Name"/>
                    <input class="rounded" type="email" placeholder="Email"/>
                    <input class="rounded" type="password" placeholder="Password"/>
                    <button class="bg-red-900 text-white rounded focus:outline-black">Submit</button>
                </form>
            </div>
        </div>
        );
}

export default Login;