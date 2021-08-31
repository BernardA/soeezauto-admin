import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    CLIENT_LOG,
    CHECK_ONLINE_STATUS_ERROR,
    POST_SPEC,
    POST_SPEC_INIT,
    POST_SPEC_OK,
    POST_SPEC_ERROR,
} from 'store/actions';
import localforage from 'localforage';
import { apiStd } from '../../lib/functions';

function* postSpec(action) {
    const url = `/specifications/create/${action.values.brandId}`;
    /*
    const queryQl = `mutation postSpec(
        $brand: String!
        $year: String!
        $month: String!
    ){
        withCustomArgsMutationSpec(
            input: {
                brand: $brand
                year: $year
                month: $month
            })
        {
            spec{
                id
                _id
            }
        }`;
    */
    const variables = {
        year: action.values.year,
        month: action.values.month,
    };
    try {
        yield put({
            type: POST_SPEC_INIT,
        });
        // const data = yield call(apiQl, queryQl, variables);
        const data = yield call(apiStd, url, variables);
        yield put({
            type: POST_SPEC_OK,
            data,
        });
    } catch (error) {
        let message = null;
        if (error.response === undefined || error.code === 'ECONNABORTED') {
            // check if offline event already fired
            localforage.getItem('offline-event-fired').then((value) => {
                if (value === null) {
                    localforage.setItem('offline-event-fired', true);
                }
            });
            yield put({
                type: CHECK_ONLINE_STATUS_ERROR,
                isOnline: false,
            });
        } else {
            if (
                error.response.data.status === 500 ||
                error.response.data.status === 404
            ) {
                message = error.response.data.detail;
            } else {
                message = error.response.data.message;
            }
            yield put({
                type: CLIENT_LOG,
                data: {
                    message,
                    action: POST_SPEC,
                },
            });
        }
        yield put({
            type: POST_SPEC_ERROR,
            data: [
                {
                    message,
                },
            ],
        });
    }
}

// eslint-disable-next-line func-names
export default function* system() {
    yield all([takeLatest(POST_SPEC, postSpec)]);
}
