import Axios from "axios";

import {
    GET_ALL_USERS,

} from './actionType';






export const sendOtp = () => (dispatch) => {
    return Axios.post("https://reqres.in/api/users", {

    })
        .then((response) => {
            const user = response.data;
            return dispatch({ type: GET_ALL_USERS, payload: user });
        })
        .catch(function (error) {
            console.log(error);
        });
};
// export const verifyOtp = (phone, otp) => (dispatch) => {
//     return Axios.post(LOGIN_OTP_USER_URL, {
//         phone, otp
//     })
//         .then((response) => {
//             const user = response.data;
//             console.log(response)
//             return dispatch({ type: LOGIN_OTP_USER, payload: user });
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// };
