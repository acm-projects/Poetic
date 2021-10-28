import React from 'react';
import PoemScroll from './PoemScroll';

const Main = () => {
    return (
        <div class="flex p-4 gap-10 justify-between bg-red-200 flex-grow">
            <div class="flex flex-col gap-4 p-6 font-bold text-8xl flex-1 bg-white rounded">
                <div>
                Hello
                </div>
                <div class="bg-red-50 rounded p-4 font-normal text-6xl">
                    Welcome to Poet.
                </div>
                <div class="text-left text-4xl font-light">
                    The first app designed solely for the purpose 
                </div>
            </div>
            
            <PoemScroll />
        </div>
        );
}

export default Main;