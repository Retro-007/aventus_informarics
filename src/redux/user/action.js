import Axios from "axios";

import {
    CREATE_USER,
    EDIT_USER,
    GET_ALL_USERS,

} from './actionType';






export const getAllUsers = (page, per_page) => (dispatch) => {
    return Axios.get("https://reqres.in/api/users?page=" + page + "&per_page=" + per_page + "", {

    })
        .then((response) => {
            const user = response.data;
            // console.log(response);
            return dispatch({ type: GET_ALL_USERS, payload: user });
        })
        .catch(function (error) {
            console.log(error);
        });
};
export const createUser = (f_name, l_name, email) => (dispatch) => {
    return Axios.post("https://reqres.in/api/users/?f_name=" + f_name + "&l_name=" + l_name + "&email=" + email + "", {

    })
        .then((response) => {
            const user = response.data;
            // console.log(response);
            return dispatch({ type: CREATE_USER, payload: user });
        })
        .catch(function (error) {
            console.log(error);
        });
};
export const editUser = (id, f_name, l_name, email) => (dispatch) => {
    console.log(id)
    return Axios.post("https://reqres.in/api/users/" + id + "/?f_name=" + f_name + "&l_name=" + l_name + "&email=" + email + "", {

    })
        .then((response) => {
            const user = response.data;
            // console.log(response);
            return dispatch({ type: EDIT_USER, payload: user });
        })
        .catch(function (error) {
            console.log(error);
        });
};