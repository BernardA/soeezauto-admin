import { HYDRATE } from 'next-redux-wrapper';
import {
    POST_IMAGE_INIT,
    POST_IMAGE_OK,
    POST_IMAGE_ERROR,
    SET_POST_IMAGE_TO_NULL,
    PUT_IMAGE_INIT,
    PUT_IMAGE_OK,
    PUT_IMAGE_ERROR,
    SET_PUT_IMAGE_TO_NULL,
} from 'store/actions';

const initialState = {
    dataPostImage: null,
    errorPostImage: null,
    dataPutImage: null,
    errorPutImage: null,
    isLoading: false,
};

const image = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE: {
            return {
                ...state,
                ...action.data,
            };
        }
        case POST_IMAGE_INIT:
            return {
                ...state,
                dataPostImage: null,
                errorPostImage: null,
                isLoading: true,
            };
        case POST_IMAGE_OK:
            return {
                ...state,
                dataPostImage: action.data,
                isLoading: false,
            };
        case POST_IMAGE_ERROR:
            return {
                ...state,
                errorPostImage: action.data,
                isLoading: false,
            };
        case SET_POST_IMAGE_TO_NULL:
            return {
                ...state,
                dataPostImage: null,
                errorPostImage: null,
            };
        case PUT_IMAGE_INIT:
            return {
                ...state,
                dataPutImage: null,
                errorPutImage: null,
                isLoading: true,
            };
        case PUT_IMAGE_OK:
            return {
                ...state,
                dataPutImage: action.data,
                isLoading: false,
            };
        case PUT_IMAGE_ERROR:
            return {
                ...state,
                errorPutImage: action.data,
                isLoading: false,
            };
        case SET_PUT_IMAGE_TO_NULL:
            return {
                ...state,
                errorPutImage: null,
                dataPutImage: null,
            };
        default:
            return state;
    }
};

export default image;
