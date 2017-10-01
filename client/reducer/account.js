const initialState = {
    user: {}
};

function accountReducer (initialState) {
    return function accountReducerFn(state = initialState, action = {}) {
        switch (action.type) {
            default: {
                return {
                    ...state
                }
            }
        }
    }
}

export default accountReducer(initialState);