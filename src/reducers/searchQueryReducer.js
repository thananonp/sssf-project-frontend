const initialState = {
    query: '',
    scope: 'title'
}

export const searchScope = (scope) => {
    return async dispatch => {
        dispatch({
            type: "SCOPE",
            data: scope
        })
    }
}
export const newSearchQuery = (query) => {
    console.log(`New ${query}`)
    return dispatch => {
        dispatch({
            type: 'NEW',
            data: query
        })
    }
}

const searchQueryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEW': {
            let copy = {...state}
            copy.query = action.data
            console.log(copy)
            return copy
        }
        case 'SCOPE': {
            let copy = {...state}
            copy.scope = action.data
            console.log(copy)
            return copy
        }
    }
    return state
}

export default searchQueryReducer