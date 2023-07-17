import { all, fork } from "redux-saga/effects";
import userSaga from "./user.saga";

const sagaRoot = function* () {
    yield all([
        fork(userSaga)
    ]);
}

export default sagaRoot;