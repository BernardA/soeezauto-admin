import { HYDRATE } from 'next-redux-wrapper';
import {
    POST_PERFORMANCE_INIT,
    POST_PERFORMANCE_OK,
    POST_PERFORMANCE_ERROR,
    SET_POST_PERFORMANCE_TO_NULL,
    PUT_PERFORMANCE_INIT,
    PUT_PERFORMANCE_OK,
    PUT_PERFORMANCE_ERROR,
    SET_PUT_PERFORMANCE_TO_NULL,
} from 'store/actions';

const initialState = {
    dataPostPerformance: null,
    errorPostPerformance: null,
    dataPutPerformance: null,
    errorPutPerformance: null,
    isLoading: false,
};

const performance = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE: {
            return {
                ...state,
                ...action.data,
            };
        }
        case POST_PERFORMANCE_INIT:
            return {
                ...state,
                dataPostPerformance: null,
                errorPostPerformance: null,
                isLoading: true,
            };
        case POST_PERFORMANCE_OK:
            return {
                ...state,
                dataPostPerformance: action.data,
                isLoading: false,
            };
        case POST_PERFORMANCE_ERROR:
            return {
                ...state,
                errorPostPerformance: action.data,
                isLoading: false,
            };
        case SET_POST_PERFORMANCE_TO_NULL:
            return {
                ...state,
                dataPostPerformance: null,
                errorPostPerformance: null,
            };
        case PUT_PERFORMANCE_INIT:
            return {
                ...state,
                dataPutPerformance: null,
                errorPutPerformance: null,
                isLoading: true,
            };
        case PUT_PERFORMANCE_OK:
            return {
                ...state,
                dataPutPerformance: action.data,
                isLoading: false,
            };
        case PUT_PERFORMANCE_ERROR:
            return {
                ...state,
                errorPutPerformance: action.data,
                isLoading: false,
            };
        case SET_PUT_PERFORMANCE_TO_NULL:
            return {
                ...state,
                dataPutPerformance: null,
                errorPutPerformance: null,
            };
        default:
            return state;
    }
};

export default performance;
