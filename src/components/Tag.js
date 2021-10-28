import React from "react";

const Tag = (props) => {
    return (
        <div>
            <button class="bg-green-50 focus:outline-black hover:bg-green-100 rounded p-4">{props.content}</button>
        </div>
    )
}

export default Tag;