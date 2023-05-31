import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import {mainReducer} from "./main/reducer";
import {watcherSaga} from "./main/sagas";

const sagaMiddleware = createSagaMiddleware()

export const index = configureStore({
  reducer: mainReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(watcherSaga)
