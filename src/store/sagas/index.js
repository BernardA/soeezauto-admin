import { all } from 'redux-saga/effects';
import system from './system';

export default function* rootSaga() {
    yield all([system()]);
}
