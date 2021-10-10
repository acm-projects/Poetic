import React from "react";
import Poem from "./Poem";

const PoemScroll = () => {
    return (
        <div class="flex flex-col py-5 h-screen overflow-auto gap-4 flex-1">
                <Poem />
                <Poem />
                <Poem />
                <Poem />
                <Poem />
                <Poem />
                <Poem />
            </div>
    )
}

export default PoemScroll;