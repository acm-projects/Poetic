import React, {useContext, useEffect, useState} from "react";
import Tag from "./Tag";
import Poem from "./Poem";
import {myContext} from "../Context";
import axios from "axios";
import configData from "../config.json";
import image from "../resources/profileimage.png";
import Profile from "./Profile";

const ProfilePage = (props) => {
    const context = useContext(myContext);
    return (
        <div>
            <Profile noEditing={false} username={context.username} tags={context.tags} currentUser = {true}/>
        </div>
    );
}

export default ProfilePage;