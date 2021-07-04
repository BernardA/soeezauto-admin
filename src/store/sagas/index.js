import { all } from 'redux-saga/effects';
import auth from './auth';
import brand from './brand';
import password from './password';
import system from './system';

export default function* rootSaga() {
    yield all([auth(), brand(), password(), system()]);
}
