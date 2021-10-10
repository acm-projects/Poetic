import React, { useMemo, useState } from 'react'
import { createEditor } from 'slate'
import './index.css';
import "tailwindcss/tailwind.css";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navigation, Home, LoginPage, Collaborate, Create } from "./components";

const App = () => {

  return (
    <div className="App">
      <Router>
      <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/login" exact component={() => <LoginPage />} />
          <Route path="/collaborate" exact component={() => <Collaborate />} />
          <Route path="/create" exact component={() => <Create />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
