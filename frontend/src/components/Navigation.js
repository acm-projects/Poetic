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
	<nav class="bg-blue-100 shadow-lg">
		<div class="max-w-6xl mx-auto px-4">
			<div class="flex justify-between">
				<div class="flex space-x-7">
					<div>
                    <Link to="/" class="flex items-center py-4 px-2">
                                    <img src = {Logo} class="h-16 w-45 mr-2"/>
                    </Link>
					</div>
                    
                    <div class="hidden md:flex items-center space-x-1">
						<Link
							to="/collaborate"
							class="py-4 px-2 text-gray-500 font-semibold hover:text-pink-500 transition duration-300"
							>Collaborate
                        </Link>
					
						<Link
							to="/editor"
							class="py-4 px-2 text-gray-500 font-semibold hover:text-pink-500 transition duration-300"
							>Editor
                        </Link>

						<Link
							to="/Profile"
							class="py-4 px-2 text-gray-500 font-semibold hover:text-pink-500 transition duration-300"
							>Profile
                        </Link>

						<Link onClick={() => logout()}
							to="/"
							class="py-4 px-2 text-gray-500 font-semibold hover:text-pink-500 transition duration-300">
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
	<nav class="bg-blue-100 shadow-lg">
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