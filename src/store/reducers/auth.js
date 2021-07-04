import { HYDRATE } from 'next-redux-wrapper';
import {
    POST_LOGIN_INIT,
    POST_LOGIN_OK,
    POST_LOGIN_ERROR,
    GET_USER_PROFILE_INIT,
    GET_USER_PROFILE_OK,
    GET_USER_PROFILE_ERROR,
    LOGOUT,
    REFRESH_TOKEN_INIT,
    REFRESH_TOKEN_OK,
    REFRESH_TOKEN_ERROR,
    LOGOUT_TOKEN_EXPIRED,
    LOGOUT_INIT,
} from '../actions';

const initialState = {
    token: null,
    refreshToken: null,
    errorRefreshToken: null,
    userId: null,
    roles: [],
    username: null,
    userProfile: null,
    errorGetUserProfile: null,
    isLoading: false,
    errorPostLogin: null,
    isSocialLogin: false,
    isLogoutInit: false,
    isTokenExpired: false,
    errorSocialLogin: null,
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE: {
            return {
                ...state,
                ...action.data,
            };
        }
        case POST_LOGIN_INIT:
            return {
                ...state,
                isLoading: true,
                errorPostLogin: null,
            };
        case POST_LOGIN_OK:
            return {
                ...state,
                token: action.data.token,
                refreshToken: action.data.refreshToken,
                userId: action.data.id,
                roles: action.data.roles,
                username: action.data.username,
                isSocialLogin: action.data.isSocialLogin,
                isLoading: false,
                isTokenExpired: false,
            };
        case POST_LOGIN_ERROR:
            return {
                ...state,
                errorPostLogin: action.data,
                isLoading: false,
            };
        case GET_USER_PROFILE_INIT:
            return {
                ...state,
                isLoading: false,
                errorGetUserProfile: null,
            };
        case GET_USER_PROFILE_OK:
            return {
                ...state,
                userProfile: action.data,
                userId: action.data._id,
                roles: action.data.roles,
                username: action.data.username,
                isLoading: false,
            };
        case GET_USER_PROFILE_ERROR:
            return {
                ...state,
                errorGetUserProfile: action.data,
                isLoading: false,
            };
        case LOGOUT_INIT:
            return {
                ...state,
                isLogoutInit: true,
            };
        case LOGOUT_TOKEN_EXPIRED:
            return {
                ...state,
                isTokenExpired: true,
            };
        case LOGOUT:
            return {
                ...state,
                isLogoutInit: false,
                userId: null,
                token: null,
                refreshToken: null,
                userProfile: null,
                username: null,
                roles: null,
                errorPostLogin: null,
                errorGetUserProfile: null,
            };
        case REFRESH_TOKEN_INIT:
            return {
                ...state,
                errorRefreshToken: null,
            };
        case REFRESH_TOKEN_OK:
            return {
                ...state,
                token: action.data.token,
                refreshToken: action.data.refreshToken,
                userId: action.data.id,
            };
        case REFRESH_TOKEN_ERROR:
            return {
                ...state,
                errorRefreshToken: action.data,
            };
        default:
            return state;
    }
};

export default auth;
