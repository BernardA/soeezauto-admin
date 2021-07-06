import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    CLIENT_LOG,
    LOGOUT_TOKEN_EXPIRED,
    CHECK_ONLINE_STATUS_ERROR,
    POST_TRIM,
    POST_TRIM_INIT,
    POST_TRIM_OK,
    POST_TRIM_ERROR,
    PUT_TRIM,
    PUT_TRIM_INIT,
    PUT_TRIM_OK,
    PUT_TRIM_ERROR,
} from 'store/actions';
import localforage from 'localforage';
import { apiQl, errorParserGraphql } from '../../lib/functions';

function* postTrim(action) {
    const queryQl = `mutation postTrim(
        $trim: String!
        $trimType: String!
    )
    {
        createTrim(
            input: {
                trim: $trim
                trimType: $trimType
            }
        )
            {
            trim{
                id
                _id
            }
        }
    }`;

    const variables = {
        trim: action.values.trim,
        trimType: action.values.trimType,
    };
    try {
        yield put({
            type: POST_TRIM_INIT,
        });
        const data = yield call(apiQl, queryQl, variables);
        if (data.errors) {
            yield put({
                type: POST_TRIM_ERROR,
                data: errorParserGraphql(data.errors),
            });
            yield put({
                type: CLIENT_LOG,
                data: {
                    message: errorParserGraphql(data.errors),
                    action: POST_TRIM,
                },
            });
        } else {
            yield put({
                type: POST_TRIM_OK,
                data: data.data.createTrim,
            });
        }
    } catch (error) {
        const isOffline = !!(
            error.response === undefined || error.code === 'ECONNABORTED'
        );
        if (error.response.status === 401) {
            yield put({
                type: LOGOUT_TOKEN_EXPIRED,
            });
        } else if (isOffline) {
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
        }
    }
}

function* putTrim(action) {
    const queryQl = `mutation putTrim(
        $id: ID!
        $trim: String
        $trimType: String
    ){
        updateTrim(
            input: {
                id: $id
                trim: $trim
                trimType: $trimType
            }
        ){
    		trim {
                _id
                id
            }
        }
    }`;

    const variables = {
        id: action.values.id,
        trim: action.values.trim || undefined,
        trimType: action.values.trimType || undefined,
    };
    try {
        yield put({
            type: PUT_TRIM_INIT,
        });
        const data = yield call(apiQl, queryQl, variables);
        if (data.errors) {
            yield put({
                type: PUT_TRIM_ERROR,
                data: errorParserGraphql(data.errors),
            });
            yield put({
                type: CLIENT_LOG,
                data: {
                    message: errorParserGraphql(data.errors),
                    action: PUT_TRIM,
                },
            });
        } else {
            yield put({
                type: PUT_TRIM_OK,
                data: data.data.updateTrim,
            });
        }
    } catch (error) {
        const isOffline = !!(
            error.response === undefined || error.code === 'ECONNABORTED'
        );
        if (error.response.status === 401) {
            yield put({
                type: LOGOUT_TOKEN_EXPIRED,
            });
        } else if (isOffline) {
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
        }
    }
}

// eslint-disable-next-line func-names
export default function* system() {
    yield all([takeLatest(POST_TRIM, postTrim), takeLatest(PUT_TRIM, putTrim)]);
}
