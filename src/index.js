import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppStore from './stores/appStore';
import {
    BrowserRouter as Router,
} from "react-router-dom";
import {Provider} from "mobx-react";

const store = new AppStore();

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App/>
        </Provider>
    </Router>,
    document.getElementById('root')
);
