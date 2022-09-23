/* eslint-disable import/no-anonymous-default-export */

import {

    GET_ALL_USERS,
} from "./actionType";


const initialState = {
    user: [],
};

export default function (state = initialState, action) {
    switch (action.type) {


        case GET_ALL_USERS:
            return { ...state, user: action.payload }
        default:
            return state;
    }
}