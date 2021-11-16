import React, {useContext} from 'react';
import { Link, withRouter } from "react-router-dom";
import {myContext} from "../Context";
import axios from "axios";
import configData from "../config.json";
import Logo from "../resources/PoeticLogo.png"

const Navigation = () => {
    const context = useContext(myContext);

    const logout = () => {
        axios.get(configData.SERVER_URL + "/authentication/logout", { withCredentials: true })
            .then(res => {
                console.log(res);
                window.location.href = "/";
            });
    }

    return ( 
        
        context ? (
<body>
	<nav class="bg-pink-100 shadow-lg flex w-screen">
		<div class="max-w-6xl mx-auto px-4">
			<div class="flex justify-between">
				<div class="flex space-x-7">
					<div>
                    <Link to="/" class="flex-start items-center py-4 px-2">
                                    <img src = {Logo} class="h-10 w-25 mr-2 transform transition-all duration-300 hover:scale-110 "/>
                    </Link>
					</div>
                    
                    <div class="hidden md:flex items-center space-x-1">
						<Link
							to="/collaborate"
							class="py-4 px-2 text-gray-500 font-semibold transform transition-all hover:-translate-y-1 duration-300 hover:text-pink-500 transition duration-300"
							>Collaborate
                        </Link>
					
						<Link
							to="/editor"
							class="py-4 px-2 text-gray-500 font-semibold transform transition-all hover:-translate-y-1 hover:text-pink-500 transition duration-300"
							>Editor
                        </Link>

						<Link
							to="/Profile"
							class="py-4 px-2 text-gray-500 font-semibold transform transition-all hover:-translate-y-1 hover:text-pink-500 transition duration-300"
							>Profile
                        </Link>

						<Link onClick={() => logout()}
							to="/"
							class="py-4 px-2 text-gray-500 font-semibold transform transition-all hover:-translate-y-1 hover:text-pink-500 transition duration-300">
                                Sign Out
                        </Link>
					</div>
				</div>
			</div>
		</div>
	</nav>
</body>
) : (
    <body>
	<nav class="bg-pink-100 shadow-lg w-screen">
		<div class="max-w-6xl mx-auto px-4">
			<div class="flex justify-between">
				<div class="flex space-x-7">
					<div>
                    <Link to="/" class="flex items-center py-4 px-2">
                                    <img src = {Logo} class="h-16 w-45 mr-2"/>
                    </Link>
					</div>
                    </div>
			</div>
		</div>
	</nav>
</body>
    )
)
}

export default withRouter(Navigation);