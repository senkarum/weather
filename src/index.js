import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppStore from './stores/appStore';
import {
    BrowserRouter as Router,
} from "react-router-dom";

const store = new AppStore();

ReactDOM.render(
    <Router>
        <App store={store}/></Router>,
    document.getElementById('root')
);
