import { HYDRATE } from 'next-redux-wrapper';
import {
    PUT_BRAND_INIT,
    PUT_BRAND_OK,
    PUT_BRAND_ERROR,
    SET_PUT_BRAND_TO_NULL,
} from 'store/actions';

const initialState = {
    dataPutBrand: null,
    errorPutBrand: null,
    isLoading: false,
};

const brand = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE: {
            return {
                ...state,
                ...action.data,
            };
        }
        case PUT_BRAND_INIT:
            return {
                ...state,
                isLoading: true,
            };
        case PUT_BRAND_OK:
            return {
                ...state,
                dataPutBrand: action.data,
                isLoading: false,
            };
        case PUT_BRAND_ERROR:
            return {
                ...state,
                errorPutBrand: action.data,
                isLoading: false,
            };
        case SET_PUT_BRAND_TO_NULL:
            return {
                ...state,
                dataPutBrand: null,
                errorPutBrand: null,
            };
        default:
            return state;
    }
};

export default brand;
