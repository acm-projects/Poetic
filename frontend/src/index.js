import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Context from "./Context";
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from "react-alert-template-basic";

const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE
}

ReactDOM.render(
  <>
    <Context>
        <AlertProvider template={AlertTemplate} position={options.position} timeout={options.timeout} offset={options.offset} transition={options.transition}>
            <App/>
        </AlertProvider>
    </Context>
  </>,
  document.getElementById('root')
);

