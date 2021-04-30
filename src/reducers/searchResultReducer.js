export const newSearchResult = (query) => {
    return async dispatch => {
        dispatch({
            type: "NEW",
            data: query
        })
    }
}

const searchResultReducer = (state = [], action) => {
    switch (action){
        case 'NEW':{
            let copy = [...state]
            copy.push(action.data)
            return copy
        }
        default: {
            // console.log("Search Result reducer default")
        }
    }
    return state
}

export default searchResultReducer