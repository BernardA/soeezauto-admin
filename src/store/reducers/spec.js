import { HYDRATE } from 'next-redux-wrapper';
import {
    POST_SPEC_INIT,
    POST_SPEC_OK,
    POST_SPEC_ERROR,
    SET_POST_SPEC_TO_NULL,
} from 'store/actions';

const initialState = {
    dataPostSpec: null,
    errorPostSpec: null,
    isLoading: false,
};

const spec = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE: {
            return {
                ...state,
                ...action.data,
            };
        }
        case POST_SPEC_INIT:
            return {
                ...state,
                dataPostSpec: null,
                errorPostSpec: null,
                isLoading: true,
            };
        case POST_SPEC_OK:
            return {
                ...state,
                dataPostSpec: action.data,
                isLoading: false,
            };
        case POST_SPEC_ERROR:
            return {
                ...state,
                errorPostSpec: action.data,
                isLoading: false,
            };
        case SET_POST_SPEC_TO_NULL:
            return {
                ...state,
                dataPostSpec: null,
                errorPostSpec: null,
            };
        default:
            return state;
    }
};

export default spec;
