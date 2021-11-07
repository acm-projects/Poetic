import React from "react";
import Poem from "./Poem";

const PoemScroll = (props) => {
    const contentScroll = [];

    props.poems.forEach(poem => {
        contentScroll.push(<Poem content={poem.body} authors={poem.authors} />);
    });

    return (
        <div class="flex flex-col py-5 h-screen overflow-auto gap-4 flex-1">

            {contentScroll}

        </div>
    )
}

export default PoemScroll;