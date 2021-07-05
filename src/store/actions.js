export const CHECK_ONLINE_STATUS = 'CHECK_ONLINE_STATUS';
export const CHECK_ONLINE_STATUS_OK = 'CHECK_ONLINE_STATUS_OK';
export const CHECK_ONLINE_STATUS_ERROR = 'CHECK_ONLINE_STATUS_ERROR';

export const POST_LOGIN = 'POST_LOGIN';
export const POST_LOGIN_INIT = 'POST_LOGIN_INIT';
export const POST_LOGIN_OK = 'POST_LOGIN_OK';
export const POST_LOGIN_ERROR = 'POST_LOGIN_ERROR';

export const TOGGLE_VISIBLE_PASSWORD = 'TOGGLE_VISIBLE_PASSWORD';

export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const REFRESH_TOKEN_INIT = 'REFRESH_TOKEN_INIT';
export const REFRESH_TOKEN_OK = 'REFRESH_TOKEN_OK';
export const REFRESH_TOKEN_ERROR = 'REFRESH_TOKEN_ERROR';

export const GET_USER_PROFILE = 'GET_USER_PROFILE';
export const GET_USER_PROFILE_INIT = 'GET_USER_PROFILE_INIT';
export const GET_USER_PROFILE_OK = 'GET_USER_PROFILE_OK';
export const GET_USER_PROFILE_ERROR = 'GET_USER_PROFILE_ERROR';

export const LOGOUT_INIT = 'LOGOUT_INIT';
export const LOGOUT_TOKEN_EXPIRED = 'LOGOUT_TOKEN_EXPIRED';
export const LOGOUT = 'LOGOUT';

export const POST_PASSWORD_RECOVERY_REQUEST = 'POST_PASSWORD_RECOVERY_REQUEST';
export const POST_PASSWORD_RECOVERY_REQUEST_INIT = 'POST_PASSWORD_RECOVERY_REQUEST_INIT';
export const POST_PASSWORD_RECOVERY_REQUEST_OK = 'POST_PASSWORD_RECOVERY_REQUEST_OK';
export const POST_PASSWORD_RECOVERY_REQUEST_ERROR =
    'POST_PASSWORD_RECOVERY_REQUEST_ERROR';

export const POST_PASSWORD_RECOVERY_RESET = 'POST_PASSWORD_RECOVERY_RESET';
export const POST_PASSWORD_RECOVERY_RESET_INIT = 'POST_PASSWORD_RECOVERY_RESET_INIT';
export const POST_PASSWORD_RECOVERY_RESET_OK = 'POST_PASSWORD_RECOVERY_RESET_OK';
export const POST_PASSWORD_RECOVERY_RESET_ERROR = 'POST_PASSWORD_RECOVERY_RESET_ERROR';

export const PUT_PASSWORD_RESET = 'PUT_PASSWORD_RESET';
export const PUT_PASSWORD_RESET_INIT = 'PUT_PASSWORD_RESET_INIT';
export const PUT_PASSWORD_RESET_OK = 'PUT_PASSWORD_RESET_OK';
export const PUT_PASSWORD_RESET_ERROR = 'PUT_PASSWORD_RESET_ERROR';

export const POST_CLIENT_LOG = 'POST_CLIENT_LOG';
export const POST_CLIENT_LOG_INIT = 'POST_CLIENT_LOG_INIT';
export const POST_CLIENT_LOG_OK = 'POST_CLIENT_LOG_OK';
export const POST_CLIENT_LOG_ERROR = 'POST_CLIENT_LOG_ERROR';

export const CLIENT_LOG = 'CLIENT_LOG';

export const SET_CLIENT_LOG_TO_NULL = 'SET_CLIENT_LOG_TO_NULL';

export const ADD_TO_URL_HISTORY = 'ADD_TO_URL_HISTORY';

export const GET_BRAND = 'GET_BRAND';
export const GET_BRAND_INIT = 'GET_BRAND_INIT';
export const GET_BRAND_OK = 'GET_BRAND_OK';
export const GET_BRAND_ERROR = 'GET_BRAND_ERROR';

export const PUT_BRAND = 'PUT_BRAND';
export const PUT_BRAND_INIT = 'PUT_BRAND_INIT';
export const PUT_BRAND_OK = 'PUT_BRAND_OK';
export const PUT_BRAND_ERROR = 'PUT_BRAND_ERROR';

export const SET_PUT_BRAND_TO_NULL = 'SET_PUT_BRAND_TO_NULL';

export const PUT_MODEL = 'PUT_MODEL';
export const PUT_MODEL_INIT = 'PUT_MODEL_INIT';
export const PUT_MODEL_OK = 'PUT_MODEL_OK';
export const PUT_MODEL_ERROR = 'PUT_MODEL_ERROR';

export const SET_PUT_MODEL_TO_NULL = 'SET_PUT_MODEL_TO_NULL';

export const POST_MODEL = 'POST_MODEL';
export const POST_MODEL_INIT = 'POST_MODEL_INIT';
export const POST_MODEL_OK = 'POST_MODEL_OK';
export const POST_MODEL_ERROR = 'POST_MODEL_ERROR';

export const SET_POST_MODEL_TO_NULL = 'SET_POST_MODEL_TO_NULL';

export const POST_VERSION = 'POST_VERSION';
export const POST_VERSION_INIT = 'POST_VERSION_INIT';
export const POST_VERSION_OK = 'POST_VERSION_OK';
export const POST_VERSION_ERROR = 'POST_VERSION_ERROR';

export const SET_POST_VERSION_TO_NULL = 'SET_POST_VERSION_TO_NULL';

export const PUT_VERSION = 'PUT_VERSION';
export const PUT_VERSION_INIT = 'PUT_VERSION_INIT';
export const PUT_VERSION_OK = 'PUT_VERSION_OK';
export const PUT_VERSION_ERROR = 'PUT_VERSION_ERROR';

export const SET_PUT_VERSION_TO_NULL = 'SET_PUT_VERSION_TO_NULL';

export function actionPostLogin(values) {
    return {
        type: POST_LOGIN,
        values,
    };
}

export const actionLogoutInit = () => ({
    type: LOGOUT_INIT,
});

export function actionPostPasswordRecoveryRequest(emailRequest) {
    return {
        type: POST_PASSWORD_RECOVERY_REQUEST,
        emailRequest,
    };
}

export function actionPostPasswordRecoveryReset(values) {
    return {
        type: POST_PASSWORD_RECOVERY_RESET,
        values,
    };
}

export function actionPutPasswordReset(values) {
    return {
        type: PUT_PASSWORD_RESET,
        values,
    };
}

export function actionToggleVisiblePassword() {
    return {
        type: TOGGLE_VISIBLE_PASSWORD,
    };
}

export const actionLogoutTokenExpired = () => ({
    type: LOGOUT_TOKEN_EXPIRED,
});

export const actionRefreshToken = (refreshToken) => ({
    type: REFRESH_TOKEN,
    refreshToken,
});

export const actionLogout = () => ({
    type: LOGOUT,
});

export const actionGetUserProfile = (userId) => ({
    type: GET_USER_PROFILE,
    payload: { userId },
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

export function actionGetBrand(brandId) {
    return {
        type: GET_BRAND,
        brandId,
    };
}

export function actionPutBrand(values) {
    return {
        type: PUT_BRAND,
        values,
    };
}

export function actionSetPutBrandToNull() {
    return {
        type: SET_PUT_BRAND_TO_NULL,
    };
}

export function actionPutModel(values) {
    return {
        type: PUT_MODEL,
        values,
    };
}

export function actionSetPutModelToNull() {
    return {
        type: SET_PUT_MODEL_TO_NULL,
    };
}

export function actionPostModel(values) {
    return {
        type: POST_MODEL,
        values,
    };
}

export function actionSetPostModelToNull() {
    return {
        type: SET_POST_MODEL_TO_NULL,
    };
}

export function actionPostVersion(values) {
    return {
        type: POST_VERSION,
        values,
    };
}

export function actionSetPostVersionToNull() {
    return {
        type: SET_POST_VERSION_TO_NULL,
    };
}

export function actionPutVersion(values) {
    return {
        type: PUT_VERSION,
        values,
    };
}

export function actionSetPutVersionToNull() {
    return {
        type: SET_PUT_VERSION_TO_NULL,
    };
}
