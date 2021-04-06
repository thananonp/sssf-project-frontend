const mockSearchResult = [
    {title: "Hello JS", writer: 'Me', publisher: 'Coyth'},
    {title: "Hello JS 2nd edition", writer: 'Me', publisher: 'Coyth'},
    {title: "Hello JS 3", writer: 'Me', publisher: 'Coyth'},
]

// export const initializeSearchResult = () => {
//     return async dispatch => {
//         dispatch({
//             type: 'INIT_SEARCH',
//             data: mockSearchResult
//         })
//     }
// }

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
    }
    return state
}

export default searchResultReducer