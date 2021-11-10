import React, {useState, useEffect, useContext} from "react";
import Profile from "./Profile";
import axios from "axios";
import configData from "../config.json";
import {useHistory} from "react-router-dom";
import {myContext} from "../Context";

const Collaborate = () => {
    const allUsersRoute = configData.SERVER_URL + "/users/";
    const [currentUser, setCurrentUser] = useState(0);
    const [users, setUsers] = useState([]);
    const [usersPoemTags, setUsersPoemTags] = useState(null);
    const [loading, setLoading] = useState(true);

    const context = useContext(myContext);

    const history = useHistory();

    const nextMatch = () => {
        if (currentUser < usersPoemTags.length - 1) {
            setCurrentUser(currentUser + 1);
        }
        else {
            setCurrentUser(0);
        }
    }

    const displayUser = (loading) => {
        if (loading) {
            return (
                <div/>
            )
        }
        else {
            return (
                <div>
                    {usersPoemTags[currentUser]}
                </div>
            )
        }
    }

    useEffect(() => {
        axios.get(allUsersRoute, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].username == context.username) {
                        res.data.splice(i, 1);
                        break;
                    }
                }
                setUsers(res.data);
                setUsersPoemTags(res.data.map(function(user){
                    return (<Profile key={user.username} username={user.username} tags={user.tags}/>)}));
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    function createWithUser() {
        console.log(users[currentUser]);
        history.push({
            pathname: "/editor",
            state: {
                matchedUser: users[currentUser].username,
            },
        });
    }

    return (
        <div class="flex flex-col py-5 h-screen overflow-auto gap-4 flex-1">
            <div>
            {displayUser(loading)}
            </div>
            <div class="flex justify-evenly">
                <button class="bg-green-100 rounded p-4 hover:bg-green-200" onClick={createWithUser}>Yes</button>
                <button class="bg-red-100 rounded p-4 hover:bg-red-200" onClick={nextMatch}>No</button>
            </div>
        </div>
    )
}

export default Collaborate;