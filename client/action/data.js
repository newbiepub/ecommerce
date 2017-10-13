import {DATA} from "../constant/constant";
import 'isomorphic-fetch';

function fetchDataAction(payload) {
    return {
        type: DATA.FETCH_DATA,
        payload
    }
}

async function getDataFromAPI() {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/users');
        response = response.json();
        return response;
    } catch(e) {
        console.warn("error - fetchData");
        return [];
    }
}

export function fetchData() {
    return (dispatch, getState) => {
        return getDataFromAPI().then(data => dispatch(fetchDataAction(data)));
    }
}