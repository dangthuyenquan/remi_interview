import { createSlice } from '@reduxjs/toolkit'
import { getUser } from '../utils/token'

export const { reducer: authReducer, actions: authActions } = createSlice({
    name: 'auth',
    initialState: () => {
        return {
            user: getUser()
        }
    },
    reducers: {

    }
})