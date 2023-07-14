import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { ENV } from "../config";
import authReducer from "./authReducer";
import createSagaMiddleware from "redux-saga";
import sagaRoot from "./sagas";


const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        user: authReducer,
    },
    devTools: ENV === 'development',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(sagaRoot);

export type RootState = ReturnType<typeof store.getState>;