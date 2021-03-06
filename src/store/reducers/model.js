import { HYDRATE } from 'next-redux-wrapper';
import {
    PUT_MODEL_INIT,
    PUT_MODEL_OK,
    PUT_MODEL_ERROR,
    SET_PUT_MODEL_TO_NULL,
    POST_MODEL_INIT,
    POST_MODEL_OK,
    POST_MODEL_ERROR,
    SET_POST_MODEL_TO_NULL,
    GET_MODEL_INIT,
    GET_MODEL_OK,
    GET_MODEL_ERROR,
    SET_GET_MODEL_TO_NULL,
} from 'store/actions';

const initialState = {
    dataPutModel: null,
    errorPutModel: null,
    dataPostModel: null,
    errorPostModel: null,
    dataGetModel: null,
    errorGetModel: null,
    isLoading: false,
};

const model = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE: {
            return {
                ...state,
                ...action.data,
            };
        }
        case PUT_MODEL_INIT:
            return {
                ...state,
                isLoading: true,
            };
        case PUT_MODEL_OK:
            return {
                ...state,
                dataPutModel: action.data,
                isLoading: false,
            };
        case PUT_MODEL_ERROR:
            return {
                ...state,
                errorPutModel: action.data,
                isLoading: false,
            };
        case SET_PUT_MODEL_TO_NULL:
            return {
                ...state,
                dataPutModel: null,
                errorPutModel: null,
            };
        case POST_MODEL_INIT:
            return {
                ...state,
                dataPostModel: null,
                errorPostModel: null,
                isLoading: true,
            };
        case POST_MODEL_OK:
            return {
                ...state,
                dataPostModel: action.data,
                isLoading: false,
            };
        case POST_MODEL_ERROR:
            return {
                ...state,
                errorPostModel: action.data,
                isLoading: false,
            };
        case SET_POST_MODEL_TO_NULL:
            return {
                ...state,
                dataPostModel: null,
                errorPostModel: null,
            };
        case GET_MODEL_INIT:
            return {
                ...state,
                dataGetModel: null,
                errorGetModel: null,
                isLoading: true,
            };
        case GET_MODEL_OK:
            return {
                ...state,
                dataGetModel: action.data,
                isLoading: false,
            };
        case GET_MODEL_ERROR:
            return {
                ...state,
                errorGetModel: action.data,
                isLoading: false,
            };
        case SET_GET_MODEL_TO_NULL:
            return {
                ...state,
                dataGetModel: null,
                errorGetModel: null,
            };
        default:
            return state;
    }
};

export default model;
