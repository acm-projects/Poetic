import React, { Component, useMemo, useState } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { Editor } from 'slate-react'
import './index.css';
import "tailwindcss/tailwind.css";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { DocEditor, Navigation, Home, Login, Collaborate} from "./components";
import Profile from './components/Profile';

const App = () => {
  return (
    <div className="App">
    <Router>
    <Navigation />
      <Switch>
        <Route path="/" exact component={() => <Home />} />
        <Route path="/login" exact component={() => <Login />} />
        <Route path="/collaborate" exact component={() => <Collaborate />} />
        <Route path="/editor" exact component={() => <DocEditor/>} />
        <Route path="/profile" exact component={() => <Profile/>} />
      </Switch>
    </Router>
  </div>
  )
}

export default App;
