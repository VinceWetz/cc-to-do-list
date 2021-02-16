import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const DATA = [];

ReactDOM.render(<App tasks={DATA} />, document.getElementById("root"));

reportWebVitals();
