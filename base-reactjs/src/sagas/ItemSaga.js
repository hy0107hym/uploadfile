import { put, takeEvery, select } from 'redux-saga/effects'
import callAPI from '../fetchAPIs/callAPI'
import * as actions from '../actions/ItemAction'
import { DELETE_REQUEST, PAGINATE_ITEMS_REQUEST, ADD_ITEMS_REQUEST, DELETE_ITEMS_REQUEST, limit, UPDATE_ITEMS_REQUEST, SEARCH_ITEMS_REQUEST } from '../constants'

function* handlePaginate(action) {
    try {
        const res = yield callAPI('GET', `/paginate?activePage=${action.payload}&limit=${limit}`, '')
        if (res.totalPage === 0) {
            res.totalPage = 1
        }
        yield put(actions.paginateSuccess({
            activePage: action.payload,
            totalPage: res.totalPage,
            listData: res.listData
        }))
    } catch (error) {
        yield put(actions.paginateFailure(error))
    }
}
function* handleSearch(action) {
    try {
        const res = yield callAPI('GET', `/search?activePage=${action.payload.activePage}&limit=${limit}&textSearch=${action.payload.textSearch}`, '')
        yield put(actions.searchSuccess({
            activePage: action.payload.activePage,
            textSearch: action.payload.textSearch,
            listData: res.listData,
            totalPage: res.totalPage
        }))
    } catch (error) {
        yield put(actions.searchFailure(error))
    }
}
function* handleAdd(action) {
    try {
        let formData = new FormData()
        for (let i = 0; i < action.payload.img.length; i++) {
            formData.append("img", action.payload.img[i])
        }
        formData.append("name", action.payload.name)
        yield callAPI('POST', ``, formData)
        yield put(actions.addSuccess())

        const store = yield select((state) => state.items)
        if (!store.textSearch) {
            const res = yield callAPI('GET', `/paginate?activePage=${action.payload}&limit=${limit}`)
            yield put(actions.paginateRequest(res.totalPage))
        }
    } catch (error) {
        yield put(actions.addFailure(error))
    }
}
function* handleDelete(action) {
    try {
        yield callAPI('DELETE', `/${action.payload.id}`, '')
        yield put(actions.deleteSuccess())

        const store = yield select((state) => state.items)
        if (store.listItem.length <= 1 && store.activePage === 1) {
            yield put(actions.paginateSuccess({ activePage: 1, totalPage: 1 }))
        } else if (store.listItem.length <= 1) {
            yield put(actions.paginateRequest(store.totalPage -= 1))
        } else {
            yield put(actions.paginateRequest(store.activePage))
        }


    } catch (error) {
        yield put(actions.deleteFailure(error))
    }
}
function* handleUpdate(action) {
    try {
        let formData = new FormData()
        for (let i = 0; i < action.payload.img.length; i++) {
            formData.append("img", action.payload.img[i])
        }
        formData.append("name", action.payload.name)
        yield callAPI('PUT', `/${action.payload.id}`, formData)
        yield put(actions.updateSuccess())

        const store = yield select((state) => state.items)
        yield put(actions.paginateRequest(store.activePage))
        
    } catch (error) {
        yield put(actions.updateFailure(error))
    }
}
function* handleDeleteOne(action) {
    try {
        yield callAPI('DELETE', `/?id=${action.payload.id}&index=${action.payload.index}`, '')
        yield put(actions.deleteOneSuccess())
        const store = yield select((state) => state.items)
        if (!store.textSearch) {
            if (store.listItem.length <= 1 && store.activePage === 1) {
                yield put(actions.paginateSuccess({ activePage: 1, totalPage: 1 }))
            } else if (store.listItem.length <= 1) {
                yield put(actions.paginateRequest(store.totalPage -= 1))
            } else {
                yield put(actions.paginateRequest(store.activePage))
            }
        }
    } catch (error) {
        yield put(actions.deleteOneFailure(error))
    }
}
const ItemSaga = [
    takeEvery(PAGINATE_ITEMS_REQUEST, handlePaginate),
    takeEvery(SEARCH_ITEMS_REQUEST, handleSearch),
    takeEvery(ADD_ITEMS_REQUEST, handleAdd),
    takeEvery(UPDATE_ITEMS_REQUEST, handleUpdate),
    takeEvery(DELETE_ITEMS_REQUEST, handleDelete),
    takeEvery(DELETE_REQUEST, handleDeleteOne)


]

export default ItemSaga