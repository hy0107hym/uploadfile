import * as types from '../constants'

const DEFAULT_STATE = {
    listItem: [],
    isFetching: false,
    dataFetched: false,
    error: false,
    errMess: null,
    activePage: 1,
    totalPage: 1,
    textSearch: ""
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.PAGINATE_ITEMS_REQUEST:
        case types.ADD_ITEMS_REQUEST:
        case types.DELETE_ITEMS_REQUEST:
        case types.UPDATE_ITEMS_REQUEST:
        case types.SEARCH_ITEMS_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.ADD_ITEMS_SUCCESS:
        case types.DELETE_ITEMS_SUCCESS:
        case types.UPDATE_ITEMS_SUCCESS:
            return {
                isFetching: false,
                dataFetched: true,
                error: false,
                errMess: null,
            }
        case types.PAGINATE_ITEMS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                errMess: null,
                listItem: action.payload.listData,
                activePage: action.payload.activePage,
                totalPage: action.payload.totalPage
            }
        case types.SEARCH_ITEMS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                errMess: null,
                listItem: action.payload.listData,
                activePage: action.payload.activePage,
                totalPage: action.payload.totalPage,
                textSearch: action.payload.textSearch
            }
        case types.PAGINATE_ITEMS_FAILURE:
        case types.ADD_ITEMS_FAILURE:
        case types.DELETE_ITEMS_FAILURE:
        case types.UPDATE_ITEMS_FAILURE:
        case types.SEARCH_ITEMS_FAILURE:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true,
                errMess: action.payload.errMess,
            }
        default:
            return state;
    }
}