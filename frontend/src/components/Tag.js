import React from "react";

const Tag = (props) => {
    return (
        (props.content == "Developer") ? 
        //special visuals for developer tag (no need to flex bro we get it!)    
        <div>
        <button class="bg-yellow-100 focus:outline-black hover:bg-yellow-200 rounded p-4">{props.content}</button>
        </div>
    :
        <div>
            <button class="bg-green-50 focus:outline-black hover:bg-green-100 rounded p-4">{props.content}</button>
        </div>
    )
}

export default Tag;