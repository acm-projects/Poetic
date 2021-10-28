import React, { useMemo, useState } from 'react'
import './index.css';
import "tailwindcss/tailwind.css";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { DocEditor, Navigation, Home, Collaborate, Profile} from "./components";

const App = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const handleLogInState = (user) => {
        setLoggedIn(true);
        setUsername(user);
    }

    const signOutHandler = () => {
        setLoggedIn(false);
        setUsername('');
    }

    return (
        <div className="App">
            <Router>
                <Navigation isLoggedIn={isLoggedIn} signOutHandler={signOutHandler} />
                <Switch>
                    <Route path="/" exact component={() => <Home handleLogInState={handleLogInState} isLoggedIn={isLoggedIn} />} />
                    <Route path="/collaborate" exact component={() => <Collaborate />} />
                    <Route path="/editor" exact component={() => <DocEditor />} />
                    <Route path="/profile" exact component={() => <Profile username={username} />} />
                </Switch>
            </Router>
        </div>
    )
}

export default App;