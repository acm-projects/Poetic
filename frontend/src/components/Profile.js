import React, {useContext, useEffect, useState} from "react";
import Tag from "./Tag";
import Poem from "./Poem";
import {myContext} from "../Context";
import axios from "axios";
import configData from "../config.json";
import image from "../resources/profileimage.png";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Chip from '@mui/material/Chip';
import TagSelector from "./TagSelector";

const Profile = (props) => {
    const context = useContext(myContext);
    const location = useLocation();
    const tagList = [];

    const [isLoading, setLoading] = useState(true);
    const [poems, setPoems] = useState([]);

    const poemByUserRoute = configData.SERVER_URL + "/poems/user/" + props.username;

    for (const [index, value] of props.tags.entries()) {
        tagList.push(<Tag content={value} />)
    }

    useEffect(() => {
        axios.get(poemByUserRoute, { withCredentials: true })
            .then(res => {
                setPoems(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4 bg-pink-50 rounded-2xl">
            <div class="container flex justify-center py-10">
        <div class="p-3 bg-blue-100 rounded-xl max-h-sm w-max-lg hover:shadow">
            <div class="flex justify-between w-full">
                <div class="ml-2">
                    <div class="p-3">
                        <h3 class="text-2xl">{props.username}</h3>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-white rounded-lg">
                        <div class="mr-3"> <span class="text-gray-400 block">Tags</span> <span class="font-bold text-black text-xl">{props.tags.length}</span> </div>
                        <div class="mr-3"> <span class="text-gray-400 block">Poems</span> <span class="font-bold text-black text-xl">{poems.length}</span> </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <h2>Loading...</h2>
    </div>
        )
    }

    return (
        <div>
            <div className="flex flex-col gap-4 bg-pink-50 rounded-2xl">
            <div class="container flex justify-center self-center py-10">
        <div class="p-3 bg-blue-100 rounded-xl max-h-sm w-max-xl hover:shadow">
            <div class="flex justify-center w-full">
                <div class="ml-2">
                    <div class="p-3">
                        <h3 class="text-2xl hover:text-gray-500">{props.username}</h3>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-white rounded-lg">
                        <div class="mr-3"> <span class="text-gray-400 block">Tags</span> <span class="font-bold text-black text-xl">{props.tags.length}</span> </div>
                        <div class="mr-3"> <span class="text-gray-400 block">Poems</span> <span class="font-bold text-black text-xl">{poems.length}</span> </div>
                        
                    </div>
                </div>
            </div>
            <div class = "py-5 justify-center self-center"> {(context.tags) ? <div class = "container flex justify-center gap-1"> {tagList} </div> : <p>You do not have any tags</p>} </div>
        </div>
    </div>
                {
                (poems.length > 0) ?
                poems.map(function(poem){
                    return props.noEditing ? (<Poem content={poem.body} authors={poem.authors} title={poem.title} tags={poem.tags} inProgress={false} key={poem.title}/>) :
                                             (<Poem content={poem.body} authors={poem.authors} title={poem.title} tags={poem.tags} inProgress={poem.inProgress} key={poem.title}/>)
                })
                :   (props.currentUser) ?
                <div class = "self-center justify-center">
                <div class="hidden md:flex items-center space-x-1">
                <Link
                    to="/collaborate"
                    class="self-center py-4 px-2 text-gray-500 font-semibold hover:text-pink-500 transition duration-300"
                    ><h3>You have no poems! Click here to make one with a friend!</h3>
                </Link>
                </div>
                </div>
                :
                <h3>This user has no poems!</h3>
                }
            </div>
        </div>
    );
}

export default Profile;