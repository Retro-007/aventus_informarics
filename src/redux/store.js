import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

// eslint-disable-next-line import/no-anonymous-default-export
export default (initialState) => {
    initialState = JSON.parse(window.localStorage.getItem("state")) || initialState;
    const middleware = [thunk];

    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middleware)
            // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );

    store.subscribe(() => {
        const state = store.getState();


        const persist = {
            user: state.user,

        };
        localStorage.setItem("state", JSON.stringify(persist));

        if (window.ReactNativeWebView) {
            const response = {
                type: 'state',
                data: persist
            };
            window.ReactNativeWebView.postMessage(JSON.stringify(response));
        }
        // const user = {
        //     user: state.user
        // };
        // window.localStorage.setItem("user", JSON.stringify(user.user));
    });

    return store;
};