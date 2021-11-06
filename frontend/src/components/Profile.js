import React, {useContext, useEffect, useState} from "react";
import Tag from "./Tag";
import Poem from "./Poem";
import {myContext} from "../Context";
import axios from "axios";
import configData from "../config.json";
import image from "../resources/profileimage.png";

const Profile = (props) => {
    const context = useContext(myContext);
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
            <div>
                <div className="flex flex-col gap-4 bg-red-50">
                    <div className="flex">
                        <div>
                            <img src={image} alt="Profile logo of pen"/>
                        </div>
                        <div className="bg-red-200 text-7xl p-4">
                            {props.username}
                        </div>
                        <div className="flex justify-evenly flex-1 bg-red-100 p-4">
                            {tagList}
                        </div>
                    </div>
                    <div>Loading Poems...</div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="flex flex-col gap-4 bg-blue-50">
                <div className="flex">
                    <div>
                    <img src={image} alt="Profile logo of pen"/>
                    </div>
                    <div className="bg-blue-200 text-7xl p-4">
                        {props.username}
                    </div>
                    <div className="flex justify-evenly flex-1 bg-blue-100 p-4">
                        {tagList}
                    </div>
                </div>
                {poems.map(function(poem){
                    return (<Poem content={poem.body} author={props.username}/>)
                })}
            </div>
        </div>
    );
}

export default Profile;