import React, {useContext} from "react";
import {myContext} from "../Context";
import {useHistory} from "react-router-dom";
import Tag from "./Tag";
import { Chip } from "@mui/material";

const Poem = (props) => {

    const context = useContext(myContext);
    const history = useHistory();

    let authorsProcessed = "";
    let duo = false;
    for (const author of props.authors) {
        authorsProcessed += author + ", ";
    }

    const tagsList = [];
    props.tags.forEach(tag => {
        tagsList.push(<Chip label={tag}/>);
    })

    authorsProcessed = authorsProcessed.substr(0, authorsProcessed.length-2);

    if(authorsProcessed.includes(',')) { console.log('matched with user'); duo = true }
    function createWithUser() {
        if (props.authors[0] === context.username) {
            console.log(props.authors[1]);
            history.push({
                pathname: "/editor",
                state: {
                    matchedUser: props.authors[1],
                    previousTitle: props.title,
                    inProgress: true,
                    duo: duo
                },
            });
        } else {
            console.log(props.authors[0]);
            history.push({
                pathname: "/editor",
                state: {
                    matchedUser: props.authors[0],
                    previousTitle: props.title,
                    inProgress: true,
                    duo: duo
                },
            });
        }

    }

    if (props.inProgress) {
        return (
            <div class="flex flex-col justify-between text-center hover:bg-gray-50 py-5 font-light bg-white h-38 w-25 rounded-md">
                <div class="rounded bg-secondary flex justify-start px-4">
                    <h3 class = "transform transition-all duration-300 hover:scale-105" >{props.title}</h3>
                </div>
                <div class="flex-1 py-10 hover:text-gray-500">
                    {props.content.substr(0, 500) + "..."}
                </div>
                <div class="flex p-2 gap-2"> 
                {tagsList}
                </div>
                <div class="rounded bg-primary flex justify-end px-4">
                    <div>
                        {authorsProcessed}
                    </div>
                </div>
                <button
                        class= "btn btn-1 w-full self-center h-12 rounded-md bg-pink-100 border-2 max-w-lg text-md hover:shadow hover:bg-red-100 hover:border-pink-700 hover:text-black"
                        onClick={createWithUser}>
                        Edit
                </button>
            </div>
        );
    }

    return (
        <div class="flex flex-col justify-between text-center hover:bg-gray-50 py-5 font-light bg-white h-38 w-25 rounded-md">
        <div class="rounded bg-secondary flex justify-start px-4">
            <h3 class = "transform transition-all duration-300 hover:scale-105" >{props.title}</h3>
        </div>
        <div class="flex-1 py-10 hover:text-gray-500">
            {props.content.substr(0, 500) + "..."}
        </div>
        <div class="flex p-2 gap-2"> 
                {tagsList}
        </div>
        <div class="rounded bg-primary flex justify-end px-4">
            <div>
                {authorsProcessed}
            </div>
        </div>
    </div>
    );
}

export default Poem;