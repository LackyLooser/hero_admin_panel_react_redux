const initialState = {
    filters: [],
    activeFilter: 'all',
    filtersLoadingStatus: 'idle'
}

const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_ACTIVE':
            return {
                ...state,
                activeFilter: action.payload,
            }
        default: return state
    }
}

export default filtersReducer;