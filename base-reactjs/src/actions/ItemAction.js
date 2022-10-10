import * as types from '../constants'

export function paginateRequest(payload) {
    return{
        type: types.PAGINATE_ITEMS_REQUEST,
        payload
    }
}
export function paginateSuccess(payload) {
    return{
        type: types.PAGINATE_ITEMS_SUCCESS,
        payload
    }
}
export function paginateFailure(payload) {
    return{
        type: types.PAGINATE_ITEMS_FAILURE,
        payload
    }
}

export function searchRequest(payload) {
    return{
        type: types.SEARCH_ITEMS_REQUEST,
        payload
    }
}
export function searchSuccess(payload) {
    return{
        type: types.SEARCH_ITEMS_SUCCESS,
        payload
    }
}
export function searchFailure(payload) {
    return{
        type: types.SEARCH_ITEMS_FAILURE,
        payload
    }
}

export function deleteRequest(payload) {
    return{
        type: types.DELETE_ITEMS_REQUEST,
        payload
    }
}
export function deleteSuccess(payload) {
    return{
        type: types.DELETE_ITEMS_SUCCESS,
        payload
    }
}
export function deleteFailure(payload) {
    return{
        type: types.DELETE_ITEMS_FAILURE,
        payload
    }
}

export function updateRequest(payload) {
    return{
        type: types.UPDATE_ITEMS_REQUEST,
        payload
    }
}
export function updateSuccess(payload) {
    return{
        type: types.UPDATE_ITEMS_SUCCESS,
        payload
    }
}
export function updateFailure(payload) {
    return{
        type: types.UPDATE_ITEMS_FAILURE,
        payload
    }
}

export function addRequest(payload) {
    return{
        type: types.ADD_ITEMS_REQUEST,
        payload
    }
}
export function addSuccess(payload) {
    return{
        type: types.ADD_ITEMS_SUCCESS,
        payload
    }
}
export function addFailure(payload) {
    return{
        type: types.ADD_ITEMS_FAILURE,
        payload
    }
}

export function deleteOneRequest(payload) {
    return{
        type: types.DELETE_REQUEST,
        payload
    }
}
export function deleteOneSuccess(payload) {
    return{
        type: types.DELETE_SUCCESS,
        payload
    }
}
export function deleteOneFailure(payload) {
    return{
        type: types.DELETE_FAILURE,
        payload
    }
}