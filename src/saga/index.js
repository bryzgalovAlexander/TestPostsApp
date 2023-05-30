import {takeEvery} from "redux-saga/effects";
import {
  fetchCommentsSaga,
  fetchPostsSaga,
  fetchUserInfoSaga,
} from "./sagas";

export const sagaActions = {
  FETCH_DATA: "FETCH_DATA",
  FETCH_COMMENTS: 'FETCH_COMMENTS',
  FETCH_USER_INFO: 'FETCH_USER_INFO',
};

export function* watcherSaga() {
  yield takeEvery(sagaActions.FETCH_DATA, fetchPostsSaga)
  yield takeEvery(sagaActions.FETCH_COMMENTS, fetchCommentsSaga)
  yield takeEvery(sagaActions.FETCH_USER_INFO, fetchUserInfoSaga)
}
