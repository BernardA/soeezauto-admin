import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    CLIENT_LOG,
    LOGOUT_TOKEN_EXPIRED,
    CHECK_ONLINE_STATUS_ERROR,
    POST_MOTOR,
    POST_MOTOR_INIT,
    POST_MOTOR_OK,
    POST_MOTOR_ERROR,
    PUT_MOTOR,
    PUT_MOTOR_INIT,
    PUT_MOTOR_OK,
    PUT_MOTOR_ERROR,
} from 'store/actions';
import localforage from 'localforage';
import { apiQl, errorParserGraphql } from '../../lib/functions';

function* postMotor(action) {
    const queryQl = `mutation postMotor(
        $name: String!
        $brand: String!
        $fuel: String!
        $cylinder: Int
        $cc: Int
        $power: Int!
        $torque: String!
        $valves: Int
        $aspiration: String
    ){
        createMotor(
            input: {
                name: $name
                brand: $brand
                fuel: $fuel
                cylinder: $cylinder
                cc: $cc
                power: $power
                torque: $torque
                valves: $valves
                aspiration: $aspiration
            }
        ){
            motor {
                _id
                id
            }
        }
    }`;

    const variables = {
        name: action.values.name,
        brand: action.values.brand,
        fuel: action.values.fuel,
        cylinder: action.values.cylinder || undefined,
        cc: action.values.cc || undefined,
        power: action.values.power,
        torque: action.values.torque,
        valves: action.values.valves || undefined,
        aspiration: action.values.aspiration || undefined,
    };
    try {
        yield put({
            type: POST_MOTOR_INIT,
        });
        const data = yield call(apiQl, queryQl, variables);
        if (data.errors) {
            yield put({
                type: POST_MOTOR_ERROR,
                data: errorParserGraphql(data.errors),
            });
            yield put({
                type: CLIENT_LOG,
                data: {
                    message: errorParserGraphql(data.errors),
                    action: POST_MOTOR,
                },
            });
        } else {
            yield put({
                type: POST_MOTOR_OK,
                data: data.data.createMotor,
            });
        }
    } catch (error) {
        const isOffline = !!(
            error.response === undefined || error.code === 'ECONNABORTED'
        );
        if (error.response.status === 401) {
            yield put({
                type: LOGOUT_TOKEN_EXPIRED,
            });
        } else if (isOffline) {
            // check if offline event already fired
            localforage.getItem('offline-event-fired').then((value) => {
                if (value === null) {
                    localforage.setItem('offline-event-fired', true);
                }
            });
            yield put({
                type: CHECK_ONLINE_STATUS_ERROR,
                isOnline: false,
            });
        }
    }
}

function* putMotor(action) {
    const queryQl = `mutation putMotor(
        $id: ID!
        $name: String
        $brand: String
        $fuel: String
        $cylinder: Int
        $cc: Int
        $power: Int
        $torque: String
        $valves: Int
        $aspiration: String
    ){
        updateMotor(
            input: {
                id: $id
                name: $name
                brand: $brand
                fuel: $fuel
                cylinder: $cylinder
                cc: $cc
                power: $power
                torque: $torque
                valves: $valves
                aspiration: $aspiration
            }
        ){
    		motor {
                _id
                id
            }
        }
    }`;

    const variables = {
        id: action.values.id,
        name: action.values.name,
        brand: action.values.brand,
        fuel: action.values.fuel,
        cylinder: action.values.cylinder || undefined,
        cc: action.values.cc || undefined,
        power: action.values.power,
        torque: action.values.torque,
        valves: action.values.valves || undefined,
        aspiration: action.values.aspiration || undefined,
    };
    try {
        yield put({
            type: PUT_MOTOR_INIT,
        });
        const data = yield call(apiQl, queryQl, variables);
        if (data.errors) {
            yield put({
                type: PUT_MOTOR_ERROR,
                data: errorParserGraphql(data.errors),
            });
            yield put({
                type: CLIENT_LOG,
                data: {
                    message: errorParserGraphql(data.errors),
                    action: PUT_MOTOR,
                },
            });
        } else {
            yield put({
                type: PUT_MOTOR_OK,
                data: data.data.updateMotor,
            });
        }
    } catch (error) {
        const isOffline = !!(
            error.response === undefined || error.code === 'ECONNABORTED'
        );
        if (error.response.status === 401) {
            yield put({
                type: LOGOUT_TOKEN_EXPIRED,
            });
        } else if (isOffline) {
            // check if offline event already fired
            localforage.getItem('offline-event-fired').then((value) => {
                if (value === null) {
                    localforage.setItem('offline-event-fired', true);
                }
            });
            yield put({
                type: CHECK_ONLINE_STATUS_ERROR,
                isOnline: false,
            });
        }
    }
}

// eslint-disable-next-line func-names
export default function* system() {
    yield all([takeLatest(POST_MOTOR, postMotor), takeLatest(PUT_MOTOR, putMotor)]);
}
