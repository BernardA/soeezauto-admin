import { HYDRATE } from 'next-redux-wrapper';
import {
    POST_MEASURE_INIT,
    POST_MEASURE_OK,
    POST_MEASURE_ERROR,
    SET_POST_MEASURE_TO_NULL,
    PUT_MEASURE_INIT,
    PUT_MEASURE_OK,
    PUT_MEASURE_ERROR,
    SET_PUT_MEASURE_TO_NULL,
} from 'store/actions';

const initialState = {
    dataPostMeasure: null,
    errorPostMeasure: null,
    dataPutMeasure: null,
    errorPutMeasure: null,
    isLoading: false,
};

const measure = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE: {
            return {
                ...state,
                ...action.data,
            };
        }
        case POST_MEASURE_INIT:
            return {
                ...state,
                dataPostMeasure: null,
                errorPostMeasure: null,
                isLoading: true,
            };
        case POST_MEASURE_OK:
            return {
                ...state,
                dataPostMeasure: action.data,
                isLoading: false,
            };
        case POST_MEASURE_ERROR:
            return {
                ...state,
                errorPostMeasure: action.data,
                isLoading: false,
            };
        case SET_POST_MEASURE_TO_NULL:
            return {
                ...state,
                dataPostMeasure: null,
                errorPostMeasure: null,
            };
        case PUT_MEASURE_INIT:
            return {
                ...state,
                dataPutMeasure: null,
                errorPutMeasure: null,
                isLoading: true,
            };
        case PUT_MEASURE_OK:
            return {
                ...state,
                dataPutMeasure: action.data,
                isLoading: false,
            };
        case PUT_MEASURE_ERROR:
            return {
                ...state,
                errorPutMeasure: action.data,
                isLoading: false,
            };
        case SET_PUT_MEASURE_TO_NULL:
            return {
                ...state,
                dataPutMeasure: null,
                errorPutMeasure: null,
            };
        default:
            return state;
    }
};

export default measure;
