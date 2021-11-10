import React, {useContext, useEffect, useState} from 'react';
import { EditorState, Editor, convertToRaw, convertFromRaw } from 'draft-js';
import {myContext} from "../Context";
import 'draft-js/dist/Draft.css';
import axios from 'axios';
import {useLocation} from "react-router-dom";

/*
function myBlockStyleFn(contentBlock) {
  const type = contentBlock.getType();
  if (type === 'blockquote') {
    return 'customEditor';
  }
}
Strech Goal: change doc editor visuals when it is available
*/

const poemCreateRoute = 'http://localhost:8081/api/poems/'
const poemUpdateRoute = 'http://localhost:8081/api/poems/update'

//get user names of two users (user 2 will be found using matching algorithm)
let username2 = "sample";
localStorage.setItem('title', "example title");

let workInProgress = false;

let exit = false;

const BlockEditor = (props) => {
  const [editorState, setEditorState] = useState();

  useEffect(() => {
    if (window.localStorage.getItem('message')) {
      handleEditorStateChange(EditorState.createWithContent(convertFromRaw(JSON.parse(window.localStorage.getItem('message')))));
    } else {
      handleEditorStateChange(EditorState.createEmpty());
    }
  }, []);

  const handleEditorStateChange = (state) => {
    setEditorState(state);
  }

  const onChange = (editorState) => {
    setEditorState(editorState);
    console.log('editor state', editorState);
    const contentState = editorState.getCurrentContent();
    console.log('content state', convertToRaw(contentState));
    console.log('message', JSON.stringify(convertToRaw(contentState)));
    let fullText = "";
    convertToRaw(contentState).blocks.forEach(block => {
      fullText += block.text + '\n';
    });
    props.onChange(fullText);
    console.log(fullText);
    window.localStorage.setItem('message', JSON.stringify(convertToRaw(contentState)));
  }

  if (!editorState) {
    return (
        <h3 className="loading">Loading...</h3>
    );
  }

  //handles the end turn button
  const handleTurn = (e) => {
    console.log("You clicked submit.");
    console.log(localStorage.getItem('title'))
    const content = editorState.getCurrentContent().getPlainText()
    window.localStorage.setItem('poemContent', content);

    console.log(content)

    axios.post(poemUpdateRoute, {
      title: localStorage.getItem('title'),
      newBody: (content) ?  content : "needs some text!",
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
    //WIP
  }

  let button;
  if (username2 != "unknown") {
    button = <button class="place-self-auto u-border-2 u-border-hover-palette-1-base u-border-palette-1-base u-btn u-btn-round u-button-style u-hover-palette-1-base u-none u-radius-50 u-text-active-palette-1-light-2 u-text-custom-color-1 u-text-hover-white u-btn-1" onClick={() => handleTurn()}>End Turn</button>
  } else {
    //return nothing
  }

  return (
      <div class="u-border-1 u-border-custom-color-2 u-container-style u-group u-radius-6 u-shape-round u-group-1" data-animation-name="zoomIn" data-animation-duration="1000" data-animation-delay="1500" data-animation-direction="">
        <div class="u-container-layout u-container-layout-2 h-3/6">
          <Editor
              editorState ={editorState}
              onChange={onChange}
              toolbarHidden
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
              toolbar={{
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
              }}
          />
        </div>
        {button}
      </div>
  )
}

const DocEditor = () => {
  const location = useLocation();
  const context = useContext(myContext);

  let previousTitle = "";

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

  let submitButton;

  const [editorState, setEditorState] = useState();

  const [title, setTitle] = useState(previousTitle);

  const [values, setValues] = useState({
    title: "",
    authors: [context.username, ""],
    tags: [],
    body: "",
    inProgress: true
  });

  const handleValueChange = (e) => {
    setValues({ [e.target.name]: e.target.value });
  };

  const handleEditorStateChange = (state) => {
    setEditorState(state);
  }

  useEffect(() => {
    if (!context) {
      window.location.href = "/";
    }
    if (window.localStorage.getItem('content')) {
      handleEditorStateChange(EditorState.createWithContent(convertFromRaw(JSON.parse(window.localStorage.getItem('content')))));
    } else {
      handleEditorStateChange(EditorState.createEmpty());
    }
  }, []);


  const onChange = (editorState) => {
    setEditorState(editorState);
    console.log('editor state', editorState);
    const contentState = editorState.getCurrentContent();
    console.log('content state', convertToRaw(contentState));
    window.localStorage.setItem('content', JSON.stringify(convertToRaw(contentState)))
  }

  //Function that handles the exit page button
  const handleClick = (e) => {
    console.log("You clicked final submit.");
    console.log(localStorage.getItem('title'))
    const content = localStorage.getItem('poemContent');
    console.log(content)


    //need to update call to finalize poem. Also it saves the message contents and not the poem contents
    axios.post(poemUpdateRoute, {
      title: localStorage.getItem('title'),
      newBody: (content) ?  content : "needs some text!",
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })

    exit = true;
    //WIP
  }

  const handleSubmit = (event) => {
    console.log(localStorage.getItem('title'))
    alert('Title was submitted: ' + localStorage.getItem('title'));
    event.preventDefault();
  }

  const handlePoemUpdate = () => {
    console.log("going to update this poem:");
    console.log("title=" + title);
    console.log("values=");
    console.log(values);
  }

  const handlePoemSubmission = () => {
    console.log("going to submit this poem:");
    console.log("title=" + title);
    console.log("values=");
    console.log(values);
  }

  const handleBlockEditorChange = (textOutput) => {
    setValues({ ...values, body: textOutput });
  }

  if (workInProgress) {
    submitButton = <button class="u-active-custom-color-5 u-border-2 u-border-hover-palette-1-base u-border-palette-1-base u-btn u-btn-round u-button-style u-hover-palette-1-base u-radius-50 u-text-active-palette-1-light-2 u-text-custom-color-1 u-text-hover-white u-white u-btn-2 u-button-style u-hover-palette-1-base u-none u-radius-50 u-text-active-palette-1-light-2 u-text-custom-color-1 u-text-hover-white u-btn-1"
                           onClick={handlePoemUpdate}>
                     Update Poem
                   </button>
  } else {
    submitButton = <button class="u-active-custom-color-5 u-border-2 u-border-hover-palette-1-base u-border-palette-1-base u-btn u-btn-round u-button-style u-hover-palette-1-base u-radius-50 u-text-active-palette-1-light-2 u-text-custom-color-1 u-text-hover-white u-white u-btn-2 u-button-style u-hover-palette-1-base u-none u-radius-50 u-text-active-palette-1-light-2 u-text-custom-color-1 u-text-hover-white u-btn-1"
                           onClick={handlePoemSubmission}>
                     Submit Poem
                   </button>
  }



  // if(username2 != "unknown") {
  //   if(exit) {
  //     submitButton = <button class="u-active-custom-color-5 u-border-2 u-border-hover-palette-1-base u-border-palette-1-base u-btn u-btn-round u-button-style u-hover-palette-1-base u-radius-50 u-text-active-palette-1-light-2 u-text-custom-color-1 u-text-hover-white u-white u-btn-2 u-button-style u-hover-palette-1-base u-none u-radius-50 u-text-active-palette-1-light-2 u-text-custom-color-1 u-text-hover-white u-btn-1" onClick={() => handleClick()}>Submit Poem &lt;1/2&gt;</button>
  //   }
  //   else {
  //     submitButton = <button class="u-active-custom-color-5 u-border-2 u-border-hover-palette-1-base u-border-palette-1-base u-btn u-btn-round u-button-style u-hover-palette-1-base u-radius-50 u-text-active-palette-1-light-2 u-text-custom-color-1 u-text-hover-white u-white u-btn-2 u-button-style u-hover-palette-1-base u-none u-radius-50 u-text-active-palette-1-light-2 u-text-custom-color-1 u-text-hover-white u-btn-1" onClick={() => handleClick()}>Submit Poem &lt;0/2&gt;</button>
  //   }
  // }
  // else {
  //   submitButton = <button class="u-active-custom-color-5 u-border-2 u-border-hover-palette-1-base u-border-palette-1-base u-btn u-btn-round u-button-style u-hover-palette-1-base u-radius-50 u-text-active-palette-1-light-2 u-text-custom-color-1 u-text-hover-white u-white u-btn-2 u-button-style u-hover-palette-1-base u-none u-radius-50 u-text-active-palette-1-light-2 u-text-custom-color-1 u-text-hover-white u-btn-1" onClick={() => handleClick()}>Submit Poem</button>
  // }

  if (!editorState) {
    return (
        <h3 className="loading">Loading...</h3>
    );
  }

  if(username2 !== "unknown") {
    return (
        <div class="shadow-inner flex p-4 gap-10 justify-between bg-red-200">
          <div class="u-align-left u-clearfix u-sheet u-valign-middle u-sheet-1">
            <nav class="u-menu u-menu-dropdown u-offcanvas u-menu-1">
              <div class="menu-collapse">
                <a class="place-self-auto u-button-style u-custom-left-right-menu-spacing u-custom-padding-bottom u-custom-text-active-color u-custom-text-hover-color u-custom-top-bottom-menu-spacing u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" href="#">
                  <defs><symbol id="menu-hamburger" viewBox="0 0 16 16"><rect y="1" width="16" height="2"></rect><rect y="7" width="16" height="2"></rect><rect y="13" width="16" height="2"></rect>
                  </symbol>
                  </defs>
                </a>
              </div>
              <div class="u-nav container">
                <ul class="u-nav u-unstyled u-nav-1"><li class="u-nav-item"><a class="u-button-style u-nav-link u-text-active-custom-color-7 u-text-hover-custom-color-2" href="Home.html">Home</a>
                </li><li class="u-nav-item"><a class="u-button-style u-nav-link u-text-active-custom-color-7 u-text-hover-custom-color-2" href="Create-Poem.html">Create Poem</a>
                </li><li class="u-nav-item"><a class="u-button-style u-nav-link u-text-active-custom-color-7 u-text-hover-custom-color-2" href="Collaborate.html">Collaborate</a>
                </li><li class="u-nav-item"><a class="u-button-style u-nav-link u-text-active-custom-color-7 u-text-hover-custom-color-2" href="Profile.html">Profile</a>
                </li></ul>
              </div>
              <div class="u-custom-menu u-nav-container-collapse">
                <div class="u-black u-container-style u-inner-container-layout u-opacity u-opacity-95 u-sidenav">
                  <div class="u-inner-container-layout u-sidenav-overflow">
                    <div class="u-menu-close"></div>
                    <ul class="u-align-center u-nav u-popupmenu-items u-unstyled u-nav-2 p-px"><li class="u-nav-item"><a class="u-button-style u-nav-link" href="Home.html">Home</a>
                    </li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="Create-Poem.html">Create Poem</a>
                    </li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="Collaborate.html">Collaborate</a>
                    </li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="Profile.html">Profile</a>
                    </li></ul>
                  </div>
                </div>
                <div class="u-black u-menu-overlay u-opacity u-opacity-70"></div>
              </div>
            </nav>
          </div>


          <div class="place-self-auto u-align-center">
            <section class="u-clearfix u-section-1" id="sec-05a1">
              <div class="u-clearfix u-sheet u-sheet-1">
                <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
                  <div class="u-layout">
                    <div class="u-layout-row">
                      <div class="u-container-style u-layout-cell u-center-cell u-radius-18 u-shape-round u-size-43 u-size-xs-60 u-white u-layout-cell-1">
                        <div class="u-container-layout u-container-layout-1">
                          <div class="u-align-center u-text u-text-1">
                            <form onSubmit ={e => handleSubmit(e)}>
                              <input className="rounded border border-white u-align-center" type="text" placeholder="Enter a Poem Title!"
                                     onChange={handleValueChange('title')}/>
                            </form>
                          </div>
                          <p class="u-align-center u-text u-text-2">Feel free to type below. The color you are assigned to is:<br/>
                            <span class="u-text-custom-color-2"></span>
                          </p>
                          <h5 class="u-align-center u-text u-text-custom-color-2 u-text-3" data-animation-name="pulse" data-animation-duration="1000" data-animation-delay="0" data-animation-direction=""> &lt;color&gt;</h5>
                          <div class="u-border-5 u-border-custom-color-5 u-custom-color-3 u-radius-15 u-shape u-shape-round u-shape-1" data-animation-name="zoomIn" data-animation-duration="1000" data-animation-delay="0" data-animation-direction="">
                            <Editor
                                editorState ={editorState}
                                onChange={onChange}
                                toolbarHidden
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class"
                                toolbarClassName="toolbar-class"
                                toolbar={{
                                  inline: { inDropdown: true },
                                  list: { inDropdown: true },
                                  textAlign: { inDropdown: true },
                                  link: { inDropdown: true },
                                  history: { inDropdown: true },
                                }}
                            />
                          </div>
                          <div class="u-border-5 u-border-custom-color-2 u-custom-color-6 u-radius-15 u-shape u-shape-round u-shape-2" data-animation-name="zoomIn" data-animation-duration="1000" data-animation-delay="1000" data-animation-direction="">
                            <Editor
                                editorState ={editorState}
                                onChange={onChange}
                                toolbarHidden
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class"
                                toolbarClassName="toolbar-class"
                                toolbar={{
                                  inline: { inDropdown: true },
                                  list: { inDropdown: true },
                                  textAlign: { inDropdown: true },
                                  link: { inDropdown: true },
                                  history: { inDropdown: true },
                                }}
                            />
                            <BlockEditor onChange={handleBlockEditorChange}/>
                          </div>
                        </div>
                      </div>
                      <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-17 u-size-xs-60 u-layout-cell-2" src="">
                        <div class="u-container-layout u-valign-top u-container-layout-3" src="">
                          <div class="u-container-style u-custom-color-4 u-group u-radius-15 u-shape-round u-group-2">
                            <div class="u-container-layout u-container-layout-4">
                              <h2 class="u-align-center u-text u-text-default u-text-5">Contributors</h2>
                              <div class="u-border-3 u-border-grey-dark-1 u-line u-line-horizontal u-opacity u-opacity-60 u-line-1"></div>
                              <h4 class="u-align-center u-text u-text-default u-text-6">Contributor 1:</h4><span class="u-icon u-icon-circle u-text-palette-1-base u-icon-1" data-animation-name="bounceIn" data-animation-duration="1000" data-animation-delay="1000" data-animation-direction=""><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 55 55"><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-f187"></use></svg><svg class="u-svg-content" viewBox="0 0 55 55" x="0px" y="0px" id="svg-f187"><path d="M55,27.5C55,12.337,42.663,0,27.5,0S0,12.337,0,27.5c0,8.009,3.444,15.228,8.926,20.258l-0.026,0.023l0.892,0.752
	c0.058,0.049,0.121,0.089,0.179,0.137c0.474,0.393,0.965,0.766,1.465,1.127c0.162,0.117,0.324,0.234,0.489,0.348
	c0.534,0.368,1.082,0.717,1.642,1.048c0.122,0.072,0.245,0.142,0.368,0.212c0.613,0.349,1.239,0.678,1.88,0.98
	c0.047,0.022,0.095,0.042,0.142,0.064c2.089,0.971,4.319,1.684,6.651,2.105c0.061,0.011,0.122,0.022,0.184,0.033
	c0.724,0.125,1.456,0.225,2.197,0.292c0.09,0.008,0.18,0.013,0.271,0.021C25.998,54.961,26.744,55,27.5,55
	c0.749,0,1.488-0.039,2.222-0.098c0.093-0.008,0.186-0.013,0.279-0.021c0.735-0.067,1.461-0.164,2.178-0.287
	c0.062-0.011,0.125-0.022,0.187-0.034c2.297-0.412,4.495-1.109,6.557-2.055c0.076-0.035,0.153-0.068,0.229-0.104
	c0.617-0.29,1.22-0.603,1.811-0.936c0.147-0.083,0.293-0.167,0.439-0.253c0.538-0.317,1.067-0.648,1.581-1
	c0.185-0.126,0.366-0.259,0.549-0.391c0.439-0.316,0.87-0.642,1.289-0.983c0.093-0.075,0.193-0.14,0.284-0.217l0.915-0.764
	l-0.027-0.023C51.523,42.802,55,35.55,55,27.5z M2,27.5C2,13.439,13.439,2,27.5,2S53,13.439,53,27.5
	c0,7.577-3.325,14.389-8.589,19.063c-0.294-0.203-0.59-0.385-0.893-0.537l-8.467-4.233c-0.76-0.38-1.232-1.144-1.232-1.993v-2.957
	c0.196-0.242,0.403-0.516,0.617-0.817c1.096-1.548,1.975-3.27,2.616-5.123c1.267-0.602,2.085-1.864,2.085-3.289v-3.545
	c0-0.867-0.318-1.708-0.887-2.369v-4.667c0.052-0.52,0.236-3.448-1.883-5.864C34.524,9.065,31.541,8,27.5,8
	s-7.024,1.065-8.867,3.168c-2.119,2.416-1.935,5.346-1.883,5.864v4.667c-0.568,0.661-0.887,1.502-0.887,2.369v3.545
	c0,1.101,0.494,2.128,1.34,2.821c0.81,3.173,2.477,5.575,3.093,6.389v2.894c0,0.816-0.445,1.566-1.162,1.958l-7.907,4.313
	c-0.252,0.137-0.502,0.297-0.752,0.476C5.276,41.792,2,35.022,2,27.5z"></path></svg></span>
                              <h5 class="u-text u-text-default u-text-7">{context.username}</h5>
                              <br/>
                              <h4 class="u-align-center u-text u-text-default u-text-9">Contributor 2:</h4><span class="u-icon u-icon-circle u-text-palette-1-base u-icon-2" data-animation-name="bounceIn" data-animation-duration="1000" data-animation-delay="1000" data-animation-direction=""><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 55 55"><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-77f6"></use></svg><svg class="u-svg-content" viewBox="0 0 55 55" x="0px" y="0px" id="svg-77f6"><path d="M55,27.5C55,12.337,42.663,0,27.5,0S0,12.337,0,27.5c0,8.009,3.444,15.228,8.926,20.258l-0.026,0.023l0.892,0.752
	c0.058,0.049,0.121,0.089,0.179,0.137c0.474,0.393,0.965,0.766,1.465,1.127c0.162,0.117,0.324,0.234,0.489,0.348
	c0.534,0.368,1.082,0.717,1.642,1.048c0.122,0.072,0.245,0.142,0.368,0.212c0.613,0.349,1.239,0.678,1.88,0.98
	c0.047,0.022,0.095,0.042,0.142,0.064c2.089,0.971,4.319,1.684,6.651,2.105c0.061,0.011,0.122,0.022,0.184,0.033
	c0.724,0.125,1.456,0.225,2.197,0.292c0.09,0.008,0.18,0.013,0.271,0.021C25.998,54.961,26.744,55,27.5,55
	c0.749,0,1.488-0.039,2.222-0.098c0.093-0.008,0.186-0.013,0.279-0.021c0.735-0.067,1.461-0.164,2.178-0.287
	c0.062-0.011,0.125-0.022,0.187-0.034c2.297-0.412,4.495-1.109,6.557-2.055c0.076-0.035,0.153-0.068,0.229-0.104
	c0.617-0.29,1.22-0.603,1.811-0.936c0.147-0.083,0.293-0.167,0.439-0.253c0.538-0.317,1.067-0.648,1.581-1
	c0.185-0.126,0.366-0.259,0.549-0.391c0.439-0.316,0.87-0.642,1.289-0.983c0.093-0.075,0.193-0.14,0.284-0.217l0.915-0.764
	l-0.027-0.023C51.523,42.802,55,35.55,55,27.5z M2,27.5C2,13.439,13.439,2,27.5,2S53,13.439,53,27.5
	c0,7.577-3.325,14.389-8.589,19.063c-0.294-0.203-0.59-0.385-0.893-0.537l-8.467-4.233c-0.76-0.38-1.232-1.144-1.232-1.993v-2.957
	c0.196-0.242,0.403-0.516,0.617-0.817c1.096-1.548,1.975-3.27,2.616-5.123c1.267-0.602,2.085-1.864,2.085-3.289v-3.545
	c0-0.867-0.318-1.708-0.887-2.369v-4.667c0.052-0.52,0.236-3.448-1.883-5.864C34.524,9.065,31.541,8,27.5,8
	s-7.024,1.065-8.867,3.168c-2.119,2.416-1.935,5.346-1.883,5.864v4.667c-0.568,0.661-0.887,1.502-0.887,2.369v3.545
	c0,1.101,0.494,2.128,1.34,2.821c0.81,3.173,2.477,5.575,3.093,6.389v2.894c0,0.816-0.445,1.566-1.162,1.958l-7.907,4.313
	c-0.252,0.137-0.502,0.297-0.752,0.476C5.276,41.792,2,35.022,2,27.5z"></path></svg></span>
                              <h5 class="u-text u-text-default u-text-10">{username2}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>
            {submitButton}
          </div>
        </div>
    );
  } else {
    return (
        <div class="shadow-inner flex p-4 gap-10 justify-between bg-red-200">
          <div class="u-align-left u-clearfix u-sheet u-valign-middle u-sheet-1">
            <nav class="u-menu u-menu-dropdown u-offcanvas u-menu-1">
              <div class="menu-collapse">
                <a class="place-self-auto u-button-style u-custom-left-right-menu-spacing u-custom-padding-bottom u-custom-text-active-color u-custom-text-hover-color u-custom-top-bottom-menu-spacing u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" href="#">
                  <defs><symbol id="menu-hamburger" viewBox="0 0 16 16"><rect y="1" width="16" height="2"></rect><rect y="7" width="16" height="2"></rect><rect y="13" width="16" height="2"></rect>
                  </symbol>
                  </defs>
                </a>
              </div>
              <div class="u-nav container">
                <ul class="u-nav u-unstyled u-nav-1"><li class="u-nav-item"><a class="u-button-style u-nav-link u-text-active-custom-color-7 u-text-hover-custom-color-2" href="Home.html">Home</a>
                </li><li class="u-nav-item"><a class="u-button-style u-nav-link u-text-active-custom-color-7 u-text-hover-custom-color-2" href="Create-Poem.html">Create Poem</a>
                </li><li class="u-nav-item"><a class="u-button-style u-nav-link u-text-active-custom-color-7 u-text-hover-custom-color-2" href="Collaborate.html">Collaborate</a>
                </li><li class="u-nav-item"><a class="u-button-style u-nav-link u-text-active-custom-color-7 u-text-hover-custom-color-2" href="Profile.html">Profile</a>
                </li></ul>
              </div>
              <div class="u-custom-menu u-nav-container-collapse">
                <div class="u-black u-container-style u-inner-container-layout u-opacity u-opacity-95 u-sidenav">
                  <div class="u-inner-container-layout u-sidenav-overflow">
                    <div class="u-menu-close"></div>
                    <ul class="u-align-center u-nav u-popupmenu-items u-unstyled u-nav-2 p-px"><li class="u-nav-item"><a class="u-button-style u-nav-link" href="Home.html">Home</a>
                    </li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="Create-Poem.html">Create Poem</a>
                    </li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="Collaborate.html">Collaborate</a>
                    </li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="Profile.html">Profile</a>
                    </li></ul>
                  </div>
                </div>
                <div class="u-black u-menu-overlay u-opacity u-opacity-70"></div>
              </div>
            </nav>
          </div>

          <div class="place-self-auto u-align-center">
            <section class="u-clearfix u-section-1" id="sec-05a1">
              <div class="u-clearfix u-sheet u-sheet-1 u-align-center" >
                <div class="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
                  <div class="u-layout">
                    <div class="u-layout-row">
                      <div class="u-container-style u-layout-cell u-center-cell u-radius-18 u-shape-round u-size-43 u-size-xs-60 u-white u-layout-cell-1">
                        <div class="u-container-layout u-container-layout-1">
                          <div class="u-align-center u-text u-text-1">
                            <form onSubmit ={handleSubmit}>
                              <input className="rounded border border-white u-align-center" type="text" placeholder="Enter a Poem Title!"
                                     onChange={handleValueChange('title')}/>
                            </form>
                          </div>
                          <p class="u-align-center u-text u-text-2">Feel free to type below! You are currently editing solo<br/>
                            <span class="u-text-custom-color-2"></span>
                          </p>
                          <BlockEditor onChange={handleBlockEditorChange}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {submitButton}
          </div>
        </div>

    );
  }

}

export default DocEditor;