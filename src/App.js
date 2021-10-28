import React, { useMemo, useState } from 'react'
import { createEditor } from 'slate'
import './index.css';
import "tailwindcss/tailwind.css";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { DocEditor, Navigation, Home, Collaborate} from "./components";
import Profile from './components/Profile';


const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogInState = () => {
    setLoggedIn(true);
  }

  const signOutHandler = () => {
    setLoggedIn(false);
  }

  return (
    <div className="App">
    <Router>
    <Navigation isLoggedIn={isLoggedIn} signOutHandler={signOutHandler}/>
      <Switch>
        <Route path="/" exact component={() => <Home handleLogInState={handleLogInState} isLoggedIn={isLoggedIn} />} />
        <Route path="/collaborate" exact component={() => <Collaborate />} />
        <Route path="/editor" exact component={() => <DocEditor/>} />
        <Route path="/profile" exact component={() => <Profile username="Username"/>} />
      </Switch>
    </Router>
  </div>
  )
}

export default App;
