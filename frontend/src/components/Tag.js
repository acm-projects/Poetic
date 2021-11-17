import React from "react";

const Tag = (props) => {
    let c = '';

    if(props.content == "Developer") {
        c = "bg-yellow-100 focus:outline-black hover:bg-yellow-200 rounded p-4";
    } else if (props.content == "Expert") {
        c = "bg-red-200 focus:outline-black hover:bg-red-300 rounded p-4";
    } else if (props.content == "Sad") {
        c = "bg-blue-300 focus:outline-black hover:bg-blue-400 rounded p-4"
    } else if (props.content == "Happy") {
        c = "bg-yellow-400 focus:outline-black hover:bg-yellow-500 rounded p-4"
    } else if (props.content == "Sad") {
        c = "bg-blue-300 focus:outline-black hover:bg-blue-400 rounded p-4"
    } else if (props.content == "Experienced") {
        c = "bg-pink-200 focus:outline-black hover:bg-pink-300 rounded p-4"
    } else if (props.content == "Novice") {
        c = "bg-red-50 focus:outline-black hover:bg-red-100 rounded p-4"
    }
    else {
        c = "bg-gray-50 focus:outline-black hover:bg-green-50 rounded p-4"
    }
    return (
        <div>
            <button class= {c}>{props.content}</button>
        </div>
    )
}

export default Tag;