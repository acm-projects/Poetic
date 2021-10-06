import React, { Component, useMemo, useState } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { Editor } from 'slate-react'
import './index.css';
import "tailwindcss/tailwind.css";
import './App.css';


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
    <Slate
      editor ={editor}
      value={value}
      onChange={newValue => setValue(newValue)}
    >

    <Editable />
    </Slate>
  )
}

export default App;
