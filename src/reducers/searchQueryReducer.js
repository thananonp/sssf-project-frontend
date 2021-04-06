export const newSearchQuery = (query) => {
    console.log(`New ${query}`)
    return  dispatch => {
        dispatch({
            type: 'NEW',
            data: query
        })
    }
}

const searchQueryReducer = (state = 'lll', action) => {
    switch (action.type) {
        case 'NEW': {
            console.log(action)
            return action.data
        }
    }
    return state
}

export default searchQueryReducer