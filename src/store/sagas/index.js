import { all } from 'redux-saga/effects';
import auth from './auth';
import brand from './brand';
import measure from './measure';
import model from './model';
import motor from './motor';
import password from './password';
import performance from './performance';
import version from './version';
import system from './system';

export default function* rootSaga() {
    yield all([
        auth(),
        brand(),
        model(),
        measure(),
        motor(),
        password(),
        performance(),
        version(),
        system(),
    ]);
}
