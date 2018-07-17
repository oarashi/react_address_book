import { fork } from 'redux-saga/effects';
import users from 'pages/addressBook/sagas';


function* rootSaga() {
    yield fork(users);

}

export default rootSaga;
