import React, {useContext} from 'react'
import './index.css';
import "tailwindcss/tailwind.css";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { DocEditor, Navigation, Home, Collaborate, Profile} from "./components";
import {myContext} from "./Context";

const App = () => {
    const context = useContext(myContext);

    return (
        <div className="App">
            <Router>
                <Navigation/>
                <Switch>
                    <Route path="/" exact component={() => <Home/>} />
                    { context ? (
                        <>
                        <Route path="/collaborate" exact component={() => <Collaborate />} />
                        <Route path="/editor" exact component={() => <DocEditor/>} />
                        <Route path="/profile" exact component={() => <Profile/>} />
                        </>
                        ) : null
                    }
                </Switch>
            </Router>
        </div>
    )
}

export default App;