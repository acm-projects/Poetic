import React from "react";
import Poem from "./Poem";

const PoemScroll = () => {
    const contentScroll = []
    const contentWords = ['one', 'two', 'three', 'four', 'five ']

    for (const [index, value] of contentWords.entries()) {
        contentScroll.push(<Poem content={value} author={index} />)
    }

    return (
        <div class="flex flex-col py-5 h-screen overflow-auto gap-4 flex-1">

            {contentScroll}

        </div>
    )
}

export default PoemScroll;