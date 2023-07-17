import { call, fork, put, takeEvery } from "redux-saga/effects";
import { IUser, UserState, getAccessToken, logout, updateAccessToken, updateInfo } from "./authReducer";
import { getInfoAccount } from "@/services/accountService";

function* checkInfo() {

    const accessToken = getAccessToken();

    if (accessToken) {

        const userInfo: IUser = yield call(getInfoAccount);

        if (userInfo.email && userInfo._id) {
            yield put({
                type: updateInfo.type,
                payload: {
                    email: userInfo.email,
                    _id: userInfo._id,
                    _status: UserState.identify,
                }
            });
        } else {
            yield put({
                type: logout.type
            });
        }

    } else {
        yield put({
            type: updateInfo.type,
            payload: {
                _status: UserState.nobody,
            }
        });
    }
}


export default function* userSaga() {
    yield fork(checkInfo);
    yield takeEvery([updateAccessToken.type], checkInfo);
}


function parseJwt(token: string) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}