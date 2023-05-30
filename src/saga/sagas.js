import {call, put,} from 'redux-saga/effects'
import {
  getComments,
  getPostSuccess,
  isLoadedFalse,
  getInfoUser,
  paginate,
  getError,
  getAllUserPosts, isLoadedCommentFalse, updateLocalStorage,
} from "../store/slice";
import {
  fetchCommentsAPI, fetchUserCommentsAPI,
  fetchUserInfoAPI,
  getPaginatedPostsAPI,
} from "../api";

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export function* fetchPostsSaga(payload) {
  try {
    yield put(isLoadedFalse())
    const { posts, totalCount } = yield call(getPaginatedPostsAPI, payload.currentPage, payload.pageSize, payload.searchByHeader, payload.sorting)
    yield delay(500)
    yield put(getPostSuccess(posts, totalCount))
    yield put(paginate(totalCount))
  } catch (e) {
    yield put(getError(e.message))
  }

}

export function* fetchCommentsSaga(action) {
  try {
    yield put(isLoadedCommentFalse(action.payload))
    const {data} = yield call(fetchCommentsAPI, action.payload)
    yield delay(500)
    yield put(getComments(data))
  } catch (e) {
    yield put(getError(e.message))
  }

}

export function* fetchUserInfoSaga(action) {
  try {
    yield put(isLoadedFalse())
    const {data} = yield call(fetchUserInfoAPI, action.payload)
    const userPosts = yield call(fetchUserCommentsAPI, action.payload)
    yield delay(500)
    yield put(getInfoUser(data))
    yield put(getAllUserPosts(userPosts.data))
    yield put(updateLocalStorage(userPosts.data, data))
  } catch (e) {
    yield put(getError(e.message))
  }
}
