import React, { useMemo, useState } from 'react'
import PoemScroll from './PoemScroll';

const Home = () => {
    return (
        <div class="flex gap-8 p-4 bg-red-200 shadow-inner">
            <div class="text-6xl rounded bg-white p-4 shadow">
                Hello
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
    )
}

export default Home;