import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { logoutAccout } from '@/services/accountService';

export enum UserState {
    'unknown', 'identify', 'nobody'
}

export interface IUser {
    _id: string,
    email: string,
}

export interface IUserReducer extends IUser {
    _status: UserState,
    accesToken: string,
    isLogin: () => boolean,
    isVerified: () => boolean,
}

const initialState: IUserReducer = {
    _id: '',
    _status: UserState.unknown,
    email: '',
    accesToken: '',
    isLogin: function () {
        return this._status === UserState.identify;
    },
    isVerified: function () {
        return this._status !== UserState.unknown;
    }
}

export const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        updateAccessToken: (state: IUserReducer, action: { payload: string }) => {
            setAccessToken(action.payload);
            return {
                ...state,
                _status: UserState.unknown,
                accesToken: action.payload
            };
        },
        login: (state: IUserReducer, action: { payload: IUser }): IUserReducer => {
            return {
                ...state,
                ...action.payload,
                _status: UserState.identify,
            };
        },
        logout: (): IUserReducer => {
            logoutAccout();
            clearAccessToken();
            return { ...initialState, _status: UserState.nobody };
        },
        updateInfo: (state: IUserReducer, action: { payload: IUser }) => {
            return {
                ...state,
                ...action.payload
            };
        }
    }
});

export const { login, logout, updateAccessToken, updateInfo } = slice.actions;

export default slice.reducer;

export const useAuth = (): IUserReducer => useSelector((state: RootState) => state.user);


export function getAccessToken() {
    if (localStorage.getItem('access_token')) {
        return localStorage.getItem('access_token');
    }
    return null;
}

export function setAccessToken(accessToken: string) {
    localStorage.setItem('access_token', accessToken);
}

export function clearAccessToken() {
    localStorage.removeItem('access_token');
}