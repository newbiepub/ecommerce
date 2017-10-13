import { combineReducers } from 'redux';
import account from "./account";
import data from "./fetchData"

const appReducers = combineReducers({
    account,
    data
});

export default appReducers;