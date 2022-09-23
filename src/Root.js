import { Provider } from "react-redux";
import React from 'react';
import store from "./redux/store";
import 'bootstrap/dist/css/bootstrap.min.css';

const Root = ({ children, initialState = {} }) => (
    <React.Fragment>
        <Provider store={store(initialState)}>
            {children}

        </Provider>
    </React.Fragment>
);


export default Root;