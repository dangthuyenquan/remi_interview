import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from './store';

interface IActionProps {
    payload: IUser
}

export enum UserState {
    'unknown', 'identify', 'nobody'
}

export interface IUser {
    email: string,
}

export interface IUserReducer extends IUser {
    _status: UserState,
    isLogin: () => boolean,
}

const initialState = {
    _status: UserState.unknown,
    email: '',
    isLogin: function () {
        return this._status === UserState.identify;
    },
}

export const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: (state: IUserReducer, action: IActionProps): IUserReducer => {
            return {
                ...state,
                ...action.payload,
                _status: UserState.identify,
            };
        },
        logout: (): IUserReducer => {
            return { ...initialState, _status: UserState.nobody };
        }
    }
});

export const { login, logout } = slice.actions;

export default slice.reducer;

export const useAuth = (): IUserReducer => useSelector((state: RootState) => state.user);
