import React, { useMemo, useState } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { Editor } from 'slate-react'

const Home = () => {
    const editor = useMemo(() => withReact(createEditor()), [])

    const [value, setValue] = useState([
        {
        object: 'block',
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.'}],
        },
    ])

    return (
    <div>
        <h2>Home</h2>
        <div class="flex">
            <div class="flex-1 flex box-content h-32 w-32 p-4 bg-blue-300 hover:bg-blue-500">
                <Slate
                    editor ={editor}
                    value={value}
                    onChange={newValue => setValue(newValue)}
                    >
                    <Editable />
                </Slate>
            </div>
        </div>
     </div>);
}

export default Home;