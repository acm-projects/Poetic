import React from 'react';
import PoemScroll from './PoemScroll';

const Main = () => {
    return (
        <div className="self-start flex flex-col gap-4 p-6 font-bold text-8xl flex-1 bg-white rounded">
        <div>
        Hello
        </div>
        <div className="bg-red-50 rounded p-4 font-normal text-6xl">
            Welcome to PoetTogether,
        </div>
        <div className="text-center text-left text-4xl font-light">
            &emsp; A webpage designed to allow collaboration between poets of all skill levels, regardless of location
        </div>
    </div>
        );
}

export default Main;