import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import localforage from 'localforage';
import { API_REST, api, apiQl, errorParserGraphql, violationParser } from 'lib/functions';
import {
    CLIENT_LOG,
    LOGOUT_TOKEN_EXPIRED,
    CHECK_ONLINE_STATUS_ERROR,
    POST_LOGIN,
    POST_LOGIN_INIT,
    POST_LOGIN_OK,
    POST_LOGIN_ERROR,
    GET_USER_PROFILE,
    GET_USER_PROFILE_INIT,
    GET_USER_PROFILE_OK,
    GET_USER_PROFILE_ERROR,
    REFRESH_TOKEN,
    REFRESH_TOKEN_INIT,
    REFRESH_TOKEN_OK,
    REFRESH_TOKEN_ERROR,
} from '../actions';

function* postLogin(action) {
    const email = action.values.email;
    const password = action.values.password;
    // const _remember_me = action.payload._remember_me;
    const url = '/login_check';
    try {
        yield put({
            type: POST_LOGIN_INIT,
        });
        const data = yield call(api, 'post', url, { email, password }, API_REST, false);
        yield put({
            type: POST_LOGIN_OK,
            data,
        });
        axios.defaults.headers.common = { Authorization: `Bearer ${data.token}` };
    } catch (error) {
        let data = null;
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
            data = [
                {
                    message: error.response.data.message,
                },
            ];
            if (error.response.status !== 401) {
                yield put({
                    type: CLIENT_LOG,
                    data: { message: error.response.data.message, action: POST_LOGIN },
                });
            }
        }
        yield put({
            type: POST_LOGIN_ERROR,
            data,
        });
    }
}

function* getUserProfile(action) {
    const userId = `/api/users/${action.payload.userId}`;
    const queryQl = `query userProfile(
        $userId: ID!
        ){
        retrievedQueryUser(
            id: $userId, 
        ){
            _id
            id
            username
            name
            email
            roles
            createdAt
        }
    }`;

    const variables = {
        userId,
    };

    try {
        yield put({
            type: GET_USER_PROFILE_INIT,
        });

        const data = yield call(apiQl, queryQl, variables);
        if (data.errors) {
            yield put({
                type: GET_USER_PROFILE_ERROR,
                data: errorParserGraphql(data.errors),
                userId,
            });
            yield put({
                type: CLIENT_LOG,
                data: {
                    message: errorParserGraphql(data.errors),
                    action: GET_USER_PROFILE,
                },
            });
        } else {
            yield put({
                type: GET_USER_PROFILE_OK,
                data: data.data.retrievedQueryUser,
            });
            localforage.setItem('userProfile', data.data.retrievedQueryUser);
        }
    } catch (error) {
        if (error.response === undefined || error.code === 'ECONNABORTED') {
            yield put({
                type: CHECK_ONLINE_STATUS_ERROR,
                isOnline: false,
            });
        } else if (error.response.status === 401) {
            yield put({
                type: LOGOUT_TOKEN_EXPIRED,
            });
        }
    }
}

function* postRefreshToken(action) {
    const refreshToken = action.refreshToken;
    const url = '/token/refresh';
    try {
        yield put({
            type: REFRESH_TOKEN_INIT,
        });
        const data = yield call(api, 'post', url, { refreshToken });
        yield put({
            type: REFRESH_TOKEN_OK,
            data,
        });
        axios.defaults.headers.common = { Authorization: `Bearer ${data.token}` };
    } catch (error) {
        let data = null;
        if (error.response.status === 401) {
            yield put({
                type: LOGOUT_TOKEN_EXPIRED,
            });
        } else if (error.response === undefined || error.code === 'ECONNABORTED') {
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
            data = violationParser(error.response);
            yield put({
                type: CLIENT_LOG,
                data: { message: violationParser(error.response), action: REFRESH_TOKEN },
            });
        }
        yield put({
            type: REFRESH_TOKEN_ERROR,
            data,
        });
    }
}

// eslint-disable-next-line func-names
export default function* auth() {
    yield all([
        takeLatest(POST_LOGIN, postLogin),
        takeLatest(GET_USER_PROFILE, getUserProfile),
        takeLatest(REFRESH_TOKEN, postRefreshToken),
    ]);
}
