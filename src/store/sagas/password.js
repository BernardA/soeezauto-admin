import { all, call, put, takeLatest } from 'redux-saga/effects';
import localforage from 'localforage';
import {
    CLIENT_LOG,
    CHECK_ONLINE_STATUS_ERROR,
    POST_PASSWORD_RECOVERY_REQUEST,
    POST_PASSWORD_RECOVERY_REQUEST_INIT,
    POST_PASSWORD_RECOVERY_REQUEST_OK,
    POST_PASSWORD_RECOVERY_REQUEST_ERROR,
    POST_PASSWORD_RECOVERY_RESET,
    POST_PASSWORD_RECOVERY_RESET_INIT,
    POST_PASSWORD_RECOVERY_RESET_OK,
    POST_PASSWORD_RECOVERY_RESET_ERROR,
} from 'store/actions';
import { api, API_REST, violationParser } from '../../lib/functions';

function* postPasswordRecoveryRequest(action) {
    const emailRequest = action.emailRequest;
    const url = '/users/password-recovery';
    try {
        yield put({
            type: POST_PASSWORD_RECOVERY_REQUEST_INIT,
        });

        const data = yield call(api, 'post', url, { emailRequest }, API_REST, false);
        yield put({
            type: POST_PASSWORD_RECOVERY_REQUEST_OK,
            data,
        });
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
            data = violationParser(error.response);
            yield put({
                type: CLIENT_LOG,
                data: {
                    message: violationParser(error.response),
                    action: POST_PASSWORD_RECOVERY_REQUEST,
                },
            });
        }
        yield put({
            type: POST_PASSWORD_RECOVERY_REQUEST_ERROR,
            data,
        });
    }
}

function* postPasswordRecoveryReset(action) {
    const newPassword = action.values.newPassword;
    const newPasswordConfirmation = action.values.newPasswordConfirmation;
    const id = action.values.id;
    const url = `/users/${id}/password-recovery-reset`;
    try {
        yield put({
            type: POST_PASSWORD_RECOVERY_RESET_INIT,
        });

        const data = yield call(
            api,
            'put',
            url,
            { newPassword, newPasswordConfirmation },
            API_REST,
            false,
        );
        yield put({
            type: POST_PASSWORD_RECOVERY_RESET_OK,
            data,
        });
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
            data = violationParser(error.response);
            yield put({
                type: CLIENT_LOG,
                data: {
                    message: violationParser(error.response),
                    action: POST_PASSWORD_RECOVERY_RESET,
                },
            });
        }
        yield put({
            type: POST_PASSWORD_RECOVERY_RESET_ERROR,
            data,
        });
    }
}

// eslint-disable-next-line func-names
export default function* password() {
    yield all([
        takeLatest(POST_PASSWORD_RECOVERY_REQUEST, postPasswordRecoveryRequest),
        takeLatest(POST_PASSWORD_RECOVERY_RESET, postPasswordRecoveryReset),
    ]);
}
