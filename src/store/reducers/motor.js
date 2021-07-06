import { HYDRATE } from 'next-redux-wrapper';
import {
    POST_MOTOR_INIT,
    POST_MOTOR_OK,
    POST_MOTOR_ERROR,
    SET_POST_MOTOR_TO_NULL,
    PUT_MOTOR_INIT,
    PUT_MOTOR_OK,
    PUT_MOTOR_ERROR,
    SET_PUT_MOTOR_TO_NULL,
} from 'store/actions';

const initialState = {
    dataPostMotor: null,
    errorPostMotor: null,
    dataPutMotor: null,
    errorPutMotor: null,
    isLoading: false,
};

const motor = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE: {
            return {
                ...state,
                ...action.data,
            };
        }
        case POST_MOTOR_INIT:
            return {
                ...state,
                dataPostMotor: null,
                errorPostMotor: null,
                isLoading: true,
            };
        case POST_MOTOR_OK:
            return {
                ...state,
                dataPostMotor: action.data,
                isLoading: false,
            };
        case POST_MOTOR_ERROR:
            return {
                ...state,
                errorPostMotor: action.data,
                isLoading: false,
            };
        case SET_POST_MOTOR_TO_NULL:
            return {
                ...state,
                dataPostMotor: null,
                errorPostMotor: null,
            };
        case PUT_MOTOR_INIT:
            return {
                ...state,
                dataPutMotor: null,
                errorPutMotor: null,
                isLoading: true,
            };
        case PUT_MOTOR_OK:
            return {
                ...state,
                dataPutMotor: action.data,
                isLoading: false,
            };
        case PUT_MOTOR_ERROR:
            return {
                ...state,
                errorPutMotor: action.data,
                isLoading: false,
            };
        case SET_PUT_MOTOR_TO_NULL:
            return {
                ...state,
                dataPutMotor: null,
                errorPutMotor: null,
            };
        default:
            return state;
    }
};

export default motor;
