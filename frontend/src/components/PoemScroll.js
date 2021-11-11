import React, { useState } from "react";
import Poem from "./Poem";

const PoemScroll = (props) => {
    const [contentScroll, setContentScroll] = useState([]);

    props.poems.forEach(poem => {
        contentScroll.push(<Poem content={poem.body} authors={poem.authors} title={poem.title}/>);
    });

    function refreshPoems() {
        const temp = [...contentScroll];
        temp.sort(() => 0.5 - Math.random());
        setContentScroll(temp);
    }

    function getPoems() {
        if (contentScroll.length > 6) {
            return contentScroll.slice(0,6);
        }
        else return contentScroll;
    }

    return (
        <div class="flex flex-col py-5 h-screen overflow-auto gap-4 flex-1">

            {getPoems()}
            <button class="bg-red-100 rounded p-4 hover:bg-red-300" onClick={refreshPoems}>Load More</button>

        </div>
    )
}

export default PoemScroll;