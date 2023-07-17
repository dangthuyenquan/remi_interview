import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { ENV } from "../config";
import authReducer from "./authReducer";
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