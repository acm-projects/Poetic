import React, {useState, useEffect, useContext} from "react";
import Profile from "./Profile";
import axios from "axios";
import configData from "../config.json";
import {useHistory} from "react-router-dom";
import {myContext} from "../Context";

const Collaborate = () => {
    const allUsersRoute = configData.SERVER_URL + "/users/";
    const allUsersByCompatibilityRoute = configData.SERVER_URL + "/users/compatibility_all";
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
        axios.post(allUsersByCompatibilityRoute, { conditions: { proximityWeight: 1 } }, { withCredentials: true})
            .then(res => {
                console.log("response from the compatibility route call=", res);
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].username == context.username) {
                        res.data.splice(i, 1);
                        break;
                    }
                }
                setUsers(res.data);
                setUsersPoemTags(res.data.map(function(user){
                    return (<Profile noEditing={true} key={user.username} username={user.username} tags={user.tags}/>);
                }));
                setLoading(false);
            })
            .catch(err => {
                console.error("error response from the compatibility route call=", err);
            })

    }, []);

    function createWithUser() {
        console.log(users[currentUser]);
        history.push({
            pathname: "/editor",
            state: {
                matchedUser: users[currentUser].username,
                inProgress: false,
                duo: true
            },
        });
    }

    return (
        <div>
        <div class="self-start w-screen flex flex-col gap-4 shadow-md rounded font-bold p-4 bg-gray-50 flex-1">
        Currently logged in as:
        <div className="text-3xl text-black text-bold">
            {context.username}
        </div>
    </div>
        <div class="flex flex-col py-10 px-20 h-screen overflow-auto gap-4 flex-1">
            <div>
            {displayUser(loading)}
            </div>
            <div class="flex justify-between items-center mt-2"> 
                <button class="w-full h-12 rounded-md bg-pink-100 border-2 text-md hover:shadow hover:bg-red-100 hover:border-pink-700 hover:text-black" onClick = {createWithUser}>Match</button>
                <button class="w-full h-12 rounded-md bg-blue-100 text-black text-md hover:shadow hover:bg-blue-200 hover:border-gray-500" onClick = {nextMatch}>Decline</button> 
            </div>
        </div>
    </div>
    )
}

export default Collaborate;