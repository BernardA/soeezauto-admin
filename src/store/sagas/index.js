import { all } from 'redux-saga/effects';
import auth from './auth';
import brand from './brand';
import model from './model';
import password from './password';
import version from './version';
import system from './system';

export default function* rootSaga() {
    yield all([auth(), brand(), model(), password(), version(), system()]);
}
