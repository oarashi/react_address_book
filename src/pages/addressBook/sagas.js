import { takeEvery, put } from 'redux-saga/effects';
import * as types from './constants';
// import * as actions from './actions';

function* logger() {
    yield put(() => console.error('logger'));
}

function* rootSagas() {
    yield takeEvery(types.LOAD_USERS_REQUEST, logger);
}

export default rootSagas;
