import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import {slice} from "./slice";
import {watcherSaga} from "../saga";

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: slice,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(watcherSaga)
