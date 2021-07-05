import { HYDRATE } from 'next-redux-wrapper';
import {
    POST_VERSION_INIT,
    POST_VERSION_OK,
    POST_VERSION_ERROR,
    SET_POST_VERSION_TO_NULL,
    PUT_VERSION_INIT,
    PUT_VERSION_OK,
    PUT_VERSION_ERROR,
    SET_PUT_VERSION_TO_NULL,
} from 'store/actions';

const initialState = {
    dataPostVersion: null,
    errorPostVersion: null,
    dataPutVersion: null,
    errorPutVersion: null,
    isLoading: false,
};

const version = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE: {
            return {
                ...state,
                ...action.data,
            };
        }
        case POST_VERSION_INIT:
            return {
                ...state,
                dataPostVersion: null,
                errorPostVersion: null,
                isLoading: true,
            };
        case POST_VERSION_OK:
            return {
                ...state,
                dataPostVersion: action.data,
                isLoading: false,
            };
        case POST_VERSION_ERROR:
            return {
                ...state,
                errorPostVersion: action.data,
                isLoading: false,
            };
        case SET_POST_VERSION_TO_NULL:
            return {
                ...state,
                dataPostVersion: null,
                errorPostVersion: null,
            };
        case PUT_VERSION_INIT:
            return {
                ...state,
                dataPutVersion: null,
                errorPutVersion: null,
                isLoading: true,
            };
        case PUT_VERSION_OK:
            return {
                ...state,
                dataPutVersion: action.data,
                isLoading: false,
            };
        case PUT_VERSION_ERROR:
            return {
                ...state,
                errorPutVersion: action.data,
                isLoading: false,
            };
        case SET_PUT_VERSION_TO_NULL:
            return {
                ...state,
                dataPutVersion: null,
                errorPutVersion: null,
            };
        default:
            return state;
    }
};

export default version;
