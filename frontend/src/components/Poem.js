import React, {useContext} from "react";
import {myContext} from "../Context";
import {useHistory} from "react-router-dom";

const Poem = (props) => {

    const context = useContext(myContext);
    const history = useHistory();

    let authorsProcessed = "";

    for (const author of props.authors) {
        authorsProcessed += author + ", ";
    }

    authorsProcessed = authorsProcessed.substr(0, authorsProcessed.length-2);

    function createWithUser() {
        if (props.authors[0] === context.username) {
            console.log(props.authors[1]);
            history.push({
                pathname: "/editor",
                state: {
                    matchedUser: props.authors[1],
                    previousTitle: props.title,
                    inProgress: true
                },
            });
        } else {
            console.log(props.authors[0]);
            history.push({
                pathname: "/editor",
                state: {
                    matchedUser: props.authors[0],
                    previousTitle: props.title,
                    inProgress: true
                },
            });
        }

    }

    if (props.inProgress) {
        return (
            <div class="flex flex-col justify-between text-center hover:bg-gray-100 font-light bg-white h-38 w-25 rounded">
                <div class="flex-1 py-10 hover:underline">
                    {props.content}
                    <button
                        className="bg-green-50 focus:outline-black hover:bg-green-100 rounded p-4"
                        onClick={createWithUser}>
                        Edit
                    </button>
                </div>
                <div class="rounded bg-blue-50 flex justify-end px-4">
                    <div>
                        {authorsProcessed}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div class="flex flex-col justify-between text-center hover:bg-gray-100 font-light bg-white h-38 w-25 rounded">
            <div class="flex-1 py-10 hover:underline">
                {props.content}
            </div>
            <div class="rounded bg-blue-50 flex justify-end px-4">
                <div>
                    {authorsProcessed}
                </div>
            </div>
        </div>
    );
}

export default Poem;