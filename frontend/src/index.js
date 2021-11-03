import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Context from "./Context";

ReactDOM.render(
  <>
    <Context>
      <App authorized={true}/>
    </Context>
  </>,
  document.getElementById('root')
);

