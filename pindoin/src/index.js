import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TODOList from './App2';
import reportWebVitals from './reportWebVitals';
import List from './api/List'

const DATA = [];

//ReactDOM.render(<App tasks={DATA} />, document.getElementById("root"));
const list = new List()
list.setListId("abc123")
ReactDOM.render(<TODOList list={list}/>, document.getElementById("root"));
reportWebVitals();
