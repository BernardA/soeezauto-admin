export const CHECK_ONLINE_STATUS = 'CHECK_ONLINE_STATUS';
export const CHECK_ONLINE_STATUS_OK = 'CHECK_ONLINE_STATUS_OK';
export const CHECK_ONLINE_STATUS_ERROR = 'CHECK_ONLINE_STATUS_ERROR';

export const LOGOUT_INIT = 'LOGOUT_INIT';
export const LOGOUT_TOKEN_EXPIRED = 'LOGOUT_TOKEN_EXPIRED';
export const LOGOUT = 'LOGOUT';

export const POST_CLIENT_LOG = 'POST_CLIENT_LOG';
export const POST_CLIENT_LOG_INIT = 'POST_CLIENT_LOG_INIT';
export const POST_CLIENT_LOG_OK = 'POST_CLIENT_LOG_OK';
export const POST_CLIENT_LOG_ERROR = 'POST_CLIENT_LOG_ERROR';

export const CLIENT_LOG = 'CLIENT_LOG';

export const SET_CLIENT_LOG_TO_NULL = 'SET_CLIENT_LOG_TO_NULL';

export const ADD_TO_URL_HISTORY = 'ADD_TO_URL_HISTORY';

export const actionLogoutInit = () => ({
    type: LOGOUT_INIT,
});

export const actionLogoutTokenExpired = () => ({
    type: LOGOUT_TOKEN_EXPIRED,
});

export const actionLogout = () => ({
    type: LOGOUT,
});

export function actionPostClientLog(values) {
    return {
        type: POST_CLIENT_LOG,
        values,
    };
}

export function actionClientLog(values) {
    return {
        type: CLIENT_LOG,
        values,
    };
}

export function actionSetClientLogToNull() {
    return {
        type: SET_CLIENT_LOG_TO_NULL,
    };
}

export function actionAddToUrlHistory(url) {
    return {
        type: ADD_TO_URL_HISTORY,
        url,
    };
}
