import { all } from 'redux-saga/effects';
import auth from './auth';
import brand from './brand';
import image from './image';
import measure from './measure';
import model from './model';
import motor from './motor';
import password from './password';
import performance from './performance';
import price from './price';
import version from './version';
import system from './system';
import trim from './trim';

export default function* rootSaga() {
    yield all([
        auth(),
        brand(),
        image(),
        model(),
        measure(),
        motor(),
        password(),
        performance(),
        price(),
        version(),
        system(),
        trim(),
    ]);
}
