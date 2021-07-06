import { HYDRATE } from 'next-redux-wrapper';
import {
    POST_PRICE_INIT,
    POST_PRICE_OK,
    POST_PRICE_ERROR,
    SET_POST_PRICE_TO_NULL,
    PUT_PRICE_INIT,
    PUT_PRICE_OK,
    PUT_PRICE_ERROR,
    SET_PUT_PRICE_TO_NULL,
} from 'store/actions';

const initialState = {
    dataPostPrice: null,
    errorPostPrice: null,
    dataPutPrice: null,
    errorPutPrice: null,
    isLoading: false,
};

const price = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE: {
            return {
                ...state,
                ...action.data,
            };
        }
        case POST_PRICE_INIT:
            return {
                ...state,
                dataPostPrice: null,
                errorPostPrice: null,
                isLoading: true,
            };
        case POST_PRICE_OK:
            return {
                ...state,
                dataPostPrice: action.data,
                isLoading: false,
            };
        case POST_PRICE_ERROR:
            return {
                ...state,
                errorPostPrice: action.data,
                isLoading: false,
            };
        case SET_POST_PRICE_TO_NULL:
            return {
                ...state,
                dataPostPrice: null,
                errorPostPrice: null,
            };
        case PUT_PRICE_INIT:
            return {
                ...state,
                dataPutPrice: null,
                errorPutPrice: null,
                isLoading: true,
            };
        case PUT_PRICE_OK:
            return {
                ...state,
                dataPutPrice: action.data,
                isLoading: false,
            };
        case PUT_PRICE_ERROR:
            return {
                ...state,
                errorPutPrice: action.data,
                isLoading: false,
            };
        case SET_PUT_PRICE_TO_NULL:
            return {
                ...state,
                dataPutPrice: null,
                errorPutPrice: null,
            };
        default:
            return state;
    }
};

export default price;
