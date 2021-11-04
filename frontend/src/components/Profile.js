import React, {useContext} from "react";
import Tag from "./Tag";
import Poem from "./Poem";
import {myContext} from "../Context";

const Profile = (props) => {
    const context = useContext(myContext);
    const tagList = []

    for (const [index, value] of context.tags.entries()) {
        tagList.push(<Tag content={value} />)
    }


    return (
        <div>
            <div class="flex flex-col gap-4 bg-red-50">
                <div class="flex">
                    <div class="bg-green-50 p-4">
                        image
                    </div>
                    <div class="bg-red-200 text-7xl p-4">
                        {props.username}
                    </div>
                    <div class="flex justify-evenly flex-1 bg-red-100 p-4">
                        {tagList}
                    </div>
                </div>
                <Poem content="user's content" author="username" />
            </div>
        </div>
    );
}

export default Profile;