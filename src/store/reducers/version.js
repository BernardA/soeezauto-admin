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
    GET_VERSION_TRIMS_INIT,
    GET_VERSION_TRIMS_OK,
    GET_VERSION_TRIMS_ERROR,
    SET_GET_VERSION_TRIMS_TO_NULL,
    PUT_VERSION_TRIMS_INIT,
    PUT_VERSION_TRIMS_OK,
    PUT_VERSION_TRIMS_ERROR,
    SET_PUT_VERSION_TRIMS_TO_NULL,
} from 'store/actions';

const initialState = {
    dataPostVersion: null,
    errorPostVersion: null,
    dataPutVersion: null,
    errorPutVersion: null,
    dataGetVersionTrims: null,
    errorGetVersionTrims: null,
    dataPutVersionTrim: null,
    errorPutVersionTrim: null,
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
        case GET_VERSION_TRIMS_INIT:
            return {
                ...state,
                dataGetVersionTrims: null,
                errorGetVersionTrims: null,
                isLoading: true,
            };
        case GET_VERSION_TRIMS_OK:
            return {
                ...state,
                dataGetVersionTrims: action.data,
                isLoading: false,
            };
        case GET_VERSION_TRIMS_ERROR:
            return {
                ...state,
                errorGetVersionTrims: action.data,
            };
        case SET_GET_VERSION_TRIMS_TO_NULL:
            return {
                ...state,
                dataGetVersionTrims: null,
                errorGetVersionTrims: null,
            };
        case PUT_VERSION_TRIMS_INIT:
            return {
                ...state,
                dataPutVersionTrims: null,
                errorPutVersionTrims: null,
                isLoading: true,
            };
        case PUT_VERSION_TRIMS_OK:
            return {
                ...state,
                dataPutVersionTrims: action.data,
                isLoading: false,
            };
        case PUT_VERSION_TRIMS_ERROR:
            return {
                ...state,
                errorPutVersionTrims: action.data,
            };
        case SET_PUT_VERSION_TRIMS_TO_NULL:
            return {
                ...state,
                dataPutVersionTrims: null,
                errorPutVersionTrims: null,
            };
        default:
            return state;
    }
};

export default version;
