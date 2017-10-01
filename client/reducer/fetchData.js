import {DATA} from "../constant/constant";

const initialState = {
    data: []
};

function fetchDataReducer (initialState) {
    return function fetchDataReducerFn(state = initialState, action = {}) {
        switch (action.type) {
            case DATA.FETCH_DATA: {
                return {
                    data: action.payload
                }
            }
            default: {
                return {
                    ...state
                }
            }
        }
    }
}

export default fetchDataReducer(initialState);