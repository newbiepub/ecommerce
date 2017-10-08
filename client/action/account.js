import {ACCOUNT} from "../constant/constant";

function loginAction(payload) {
    return {
        type: ACCOUNT.LOGIN,
        payload
    }
}

export function login(user) {
    return (dispatch, getState) => {
        dispatch(loginAction(user));
    }
}