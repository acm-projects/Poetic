import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const [mostImportantItem] = ["boots", "tent", "headlamp"];
console.log(mostImportantItem);

ReactDOM.render(
  <>
  <App authorized={true}/>
  </>,
  document.getElementById('root')
);

