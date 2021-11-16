import React, {useContext, useEffect, useState} from 'react';
import { ContentState, EditorState, Editor, convertToRaw, convertFromRaw } from 'draft-js';
import {myContext} from "../Context";
import 'draft-js/dist/Draft.css';
import axios from 'axios';
import {useHistory, useLocation} from "react-router-dom";

import * as api from '../socket-api';

const poemCreateRoute = 'http://localhost:8081/api/poems/'
const poemUpdateRoute = 'http://localhost:8081/api/poems/update'
const poemByTitleRoute = 'http://localhost:8081/api/poems/title'

//get user names of two users (user 2 will be found using matching algorithm)
let username2 = "sample";
localStorage.setItem('title', "example title");

let workInProgress = false;

let exit = false;

const DocEditor = () => {
  const location = useLocation();
  const context = useContext(myContext);
  const history = useHistory()

  let previousTitle = "";
  let submitButton;

  const [socket, setSocket] = useState();
  const [editorState, setEditorState] = useState();

  const unlisten = history.listen((location, action) => {
    console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`);
    console.log(`The last navigation action was ${action}`);
    api.disconnectFromSocket(socket);
    unlisten();
  })

  const [values, setValues] = useState({
    title: previousTitle,
    authors: location.state ? [context.username, location.state.matchedUser] : [context.username],
    tags: [],
    body: "",
    inProgress: true
  });

  if (location.state) {
    username2 = location.state.matchedUser;
    workInProgress = location.state.inProgress;
    if (workInProgress) {
      previousTitle = location.state.previousTitle;
    }
  } else {
    username2 = "unknown";
    workInProgress = false;
  }

  useEffect(() => {
    if (!context) {
      window.location.href = "/";
    }
    if (previousTitle) {
      if (!socket) {
        const newSocket = api.connectToSocket(location.state.previousTitle, (err, data) => {
          console.log('data returned after socket creation= ', data);
          if (data) {
            console.log('received data on socket connection', data);
            setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(data.contentState))));
            setValues({...values, title: data.title});
          } else {
            console.log('about to make post request to poemByTitleRoute');
            axios.post(poemByTitleRoute, { title: location.state.previousTitle }, { withCredentials: true })
                .then(res => {
                  console.log('post received after call to poemByTitleRoute', res);
                  setValues({ title: res.data.title, body: res.data.body, tags: res.data.tags, authors: res.data.authors, inProgress: res.data.inProgress });
                  setEditorState(EditorState.createWithContent(ContentState.createFromText(res.data.body)));
                }).catch(err => {
                  console.log(err);
                });
          }
        });
        console.log('setting socket to ', newSocket);
        setSocket(newSocket);
      } else {
        console.log('there is a socket, so subscribing to the editor data');
        api.subscribeToEditorData(socket,(err, data) => {
          console.log('data from the editor change event=', data);
          setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(data))));
          setValues({...values, body: convertFromRaw(JSON.parse(data)).getPlainText()})
        });
        api.subscribeToTitleData(socket, (err, data) => {
          console.log('data from the title change event=', data);
          setValues({...values, title: data});
        })
      }
    } else {
      console.log('creating an empty editor state');
      setEditorState(EditorState.createEmpty());
      setValues({...values, body: ""});
    }
  }, [socket])

  useEffect(() => {
    window.addEventListener('beforeunload', beforeUnloadHandler);

    return function cleanup () {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
    }
  })

  const beforeUnloadHandler = e => {
    e.preventDefault();
    e.returnValue = '';
    console.log("leaving the doc editor");
  }

  const onChange = (editorState) => {
    console.log('editorState=', editorState);
    setEditorState(editorState);
    setValues({...values, body: editorState.getCurrentContent().getPlainText()});
    if (socket) {
      api.sendEditorDataChange(socket, JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    }
  }

  const handlePoemUpdate = () => {
    console.log("going to update this poem:");
    console.log("values=");
    console.log(values);
    axios.post(poemUpdateRoute, {
      previousTitle: previousTitle,
      newTitle: values.title,
      body: values.body,
    }, { withCredentials: true }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }

  const handlePoemSubmission = () => {
    console.log("going to submit this poem:");
    console.log("values=");
    console.log(values);

    axios.post(poemCreateRoute, {
      title: values.title,
      authors: values.authors,
      tags: values.tags,
      body: values.body,
      inProgress: true
    }, { withCredentials: true }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }

  const handleTitleChange = e => {
    setValues({...values, title: e.target.value});
    api.sendTitleDataChange(socket, e.target.value);
  }

  if (workInProgress) {
    submitButton = <button class="self-end w-1/4 h-10 rounded-md bg-pink-100 border-2 text-md hover:shadow hover:bg-red-100 hover:border-pink-700 hover:text-black"
                           onClick={handlePoemUpdate}>
                     Update Poem
                   </button>
  } else {
    submitButton = <button class="self-end w-1/4 h-10 rounded-md bg-pink-100 border-2 text-md hover:shadow hover:bg-red-100 hover:border-pink-700 hover:text-black"
                           onClick={handlePoemSubmission}>
                     Submit Poem
                   </button>
  }



  if (!editorState) {
    return (
        <h3 className="loading">Loading...</h3>
    );
  }

  let duo = false;
  if(location.state) {
    duo = location.state.duo
  }
  if(duo) {
    return (
  <div class="shadow-inner flex p-4 gap-10 justify-between bg-red-200 self-center min-h-screen">
    <body class="bg-fixed flex flex-wrap w-screen font-light justify-center min-h-screen px-12 py-2 text-gray-500 sm:px-6 md:px-12 lg:mt-0">
        <div class="bg-opacity-95 bg-white w-5/6 h-screen h-min-screen px-4 py-12 rounded rounded-bl-lg shadow-xl text-center sm:px-6 md:px-12 lg:w-8/12 xl:w-7/12">
            <header class="border-b border-opacity-20 border-secondary-600 mb-12 pb-4">
            <h1 class="font-bold mb-2 text-4xl text-secondary-500">            
              <div class="text-4x1 u-align-center u-text u-text-1">
                            <form>
                              <input className="rounded border border-white u-align-center" type="text" placeholder="Enter a Poem Title!"
                                     value={values.title}
                                     onChange={handleTitleChange}/>
                            </form>
              </div>
              </h1>
            </header>
            <main class = "">
                <hr class="bg-secondary-700 mb-12 opacity-100 w-3/12 md:w-2/12"/>
                <div class="flex-col -mx-6 flex flex-wrap space-y-12 py-2 md:space-y-2 justify-center">
                  <div class="px-6 w-full self-center rounded border border-pink-200"> 
          
                    <Editor
                                  editorState={editorState}
                                  onChange={onChange}
                                  placeholder = "Begin your poem here!"
                                  toolbarHidden
                                  wrapperClassName="wrapper-class"
                                  editorClassName="editor-class"
                                  toolbarClassName="toolbar-class"
                                  toolbar={{
                                    inline: {inDropdown: true},
                                    list: {inDropdown: true},
                                    textAlign: {inDropdown: true},
                                    link: {inDropdown: true},
                                    history: {inDropdown: true},
                                  }}
                              />
                    </div>
                    {submitButton}
                </div>
            </main>
        </div>
        <script src="pgia/lib/pgia.js"></script>
        <footer
      class="bg-pink-100
             text-sm text-black text-center
             border border-red-200
             bottom-0
             fixed
             w-full
             p-0
             align-text-top
             max-h-11"
             >
                      <div
        class="container flex flex-wrap items-center justify-center mx-auto  lg:justify-between"
      >
                  <h3 class="text-gray-800 text-base px-6 mb-5 hover:text-pink-500">Contributors: {context.username}, {username2}</h3>
                  <div class="u-border-3 u-border-grey-dark-1 u-line u-line-horizontal u-opacity u-opacity-60 u-line-1"></div>
                </div>
    </footer>
    </body>
  </div>
     
    );
  } 
else {
    return (
      <div class="shadow-inner flex p-4 gap-10 justify-between bg-red-200 self-center min-h-screen">
      <body class="bg-fixed flex flex-wrap w-screen font-light justify-center min-h-screen px-12 py-2 text-gray-500 sm:px-6 md:px-12 lg:mt-0">
          <div class="bg-opacity-95 bg-white w-5/6 h-screen h-min-screen px-4 py-12 rounded rounded-bl-lg shadow-xl text-center sm:px-6 md:px-12 lg:w-8/12 xl:w-7/12">
              <header class="border-b border-opacity-20 border-secondary-600 mb-12 pb-4">
              <h1 class="font-bold mb-2 text-4xl text-secondary-500">            
                <div class="text-4x1 u-align-center u-text u-text-1">
                              <form>
                                <input className="rounded border border-white u-align-center" type="text" placeholder="Enter a Poem Title!"
                                       value={values.title}
                                       onChange={handleTitleChange}/>
                              </form>
                </div>
                </h1>
              </header>
              <main class = "">
                  <hr class="bg-secondary-700 mb-12 opacity-100 w-3/12 md:w-2/12"/>
                  <div class="flex-col -mx-6 flex flex-wrap space-y-12 py-2 md:space-y-2 justify-center">
                    <div class="px-6 w-full self-center rounded border border-pink-200"> 
            
                      <Editor
                                    editorState={editorState}
                                    onChange={onChange}
                                    placeholder = "Begin your poem here!"
                                    toolbarHidden
                                    wrapperClassName="wrapper-class"
                                    editorClassName="editor-class"
                                    toolbarClassName="toolbar-class"
                                    toolbar={{
                                      inline: {inDropdown: true},
                                      list: {inDropdown: true},
                                      textAlign: {inDropdown: true},
                                      link: {inDropdown: true},
                                      history: {inDropdown: true},
                                    }}
                                />
                      </div>
                      {submitButton}
                  </div>
              </main>
          </div>
          <script src="pgia/lib/pgia.js"></script>
        </body>
      </div>

    );
  }

}

export default DocEditor;