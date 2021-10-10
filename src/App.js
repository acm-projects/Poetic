import React, { useMemo, useState } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { Editor } from 'slate-react'
import './index.css';
import "tailwindcss/tailwind.css";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navigation, Home, Login, Collaborate } from "./components";

const App = () => {
  const editor = useMemo(() => withReact(createEditor()), [])

  const [value, setValue] = useState([
    {
      object: 'block',
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.'}],
    },
  ])

  return (
    <div className="App">
      <Router>
      <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/login" exact component={() => <Login />} />
          <Route path="/collaborate" exact component={() => <Collaborate />} />
        </Switch>
      </Router>
    </div>
    

/*
    <Slate
      editor ={editor}
      value={value}
      onChange={newValue => setValue(newValue)}
    >

    <Editable />
    </Slate>
    */
  );
}

export default App;
