import { configureStore } from "@reduxjs/toolkit";
import { ENV } from "../config";
import { authReducer } from "./authReducer";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    devTools: ENV === 'development'
})