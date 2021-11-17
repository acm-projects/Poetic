import React, {useEffect, useState} from "react";
import Poem from "./Poem";
import {set} from "immutable";

const PoemScroll = (props) => {
    const [contentScroll, setContentScroll] = useState([]);

    useEffect(() => {
        const temp = [];
        props.poems.forEach(poem => {
            temp.push(<Poem content={poem.body} authors={poem.authors} title={poem.title} tags={poem.tags} key={poem.title}/>);
        });
        setContentScroll(temp);
    }, [props.poems]);

    const refreshPoems = () => {
        const temp = [...contentScroll].sort((a, b) => {
            return 0.5 - Math.random();
        });
        setContentScroll(temp);
    }

    const getPoems = () => {
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