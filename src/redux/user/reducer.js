/* eslint-disable import/no-anonymous-default-export */

import {

    CREATE_USER,
    EDIT_USER,
    GET_ALL_USERS,
} from "./actionType";


const initialState = {
    user: [],
};

export default function (state = initialState, action) {
    switch (action.type) {


        case GET_ALL_USERS:
            return { ...state, user: action.payload }
        case CREATE_USER:
            return { ...state, user: action.payload }
        case EDIT_USER:
            return { ...state, user: action.payload }
        default:
            return state;
    }
}