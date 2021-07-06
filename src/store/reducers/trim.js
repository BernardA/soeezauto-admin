import { HYDRATE } from 'next-redux-wrapper';
import {
    POST_TRIM_INIT,
    POST_TRIM_OK,
    POST_TRIM_ERROR,
    SET_POST_TRIM_TO_NULL,
    PUT_TRIM_INIT,
    PUT_TRIM_OK,
    PUT_TRIM_ERROR,
    SET_PUT_TRIM_TO_NULL,
} from 'store/actions';

const initialState = {
    dataPostTrim: null,
    errorPostTrim: null,
    dataPutTrim: null,
    errorPutTrim: null,
    isLoading: false,
};

const trim = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE: {
            return {
                ...state,
                ...action.data,
            };
        }
        case POST_TRIM_INIT:
            return {
                ...state,
                dataPostTrim: null,
                errorPostTrim: null,
                isLoading: true,
            };
        case POST_TRIM_OK:
            return {
                ...state,
                dataPostTrim: action.data,
                isLoading: false,
            };
        case POST_TRIM_ERROR:
            return {
                ...state,
                errorPostTrim: action.data,
                isLoading: false,
            };
        case SET_POST_TRIM_TO_NULL:
            return {
                ...state,
                dataPostTrim: null,
                errorPostTrim: null,
            };
        case PUT_TRIM_INIT:
            return {
                ...state,
                dataPutTrim: null,
                errorPutTrim: null,
                isLoading: true,
            };
        case PUT_TRIM_OK:
            return {
                ...state,
                dataPutTrim: action.data,
                isLoading: false,
            };
        case PUT_TRIM_ERROR:
            return {
                ...state,
                errorPutTrim: action.data,
                isLoading: false,
            };
        case SET_PUT_TRIM_TO_NULL:
            return {
                ...state,
                dataPutTrim: null,
                errorPutTrim: null,
            };
        default:
            return state;
    }
};

export default trim;
