import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    CLIENT_LOG,
    LOGOUT_TOKEN_EXPIRED,
    CHECK_ONLINE_STATUS_ERROR,
    POST_MEASURE,
    POST_MEASURE_INIT,
    POST_MEASURE_OK,
    POST_MEASURE_ERROR,
    PUT_MEASURE,
    PUT_MEASURE_INIT,
    PUT_MEASURE_OK,
    PUT_MEASURE_ERROR,
} from 'store/actions';
import localforage from 'localforage';
import { apiQl, errorParserGraphql } from '../../lib/functions';

function* postMeasure(action) {
    const queryQl = `mutation postMeasure(
        $fuelTank: Int
        $width: Int!
        $height: Int!
        $length: Int!
        $wheelbase: Int!
        $trunk: Int!
        $trunkMax: Int
    ){
        createMeasure(
            input: {
                fuelTank: $fuelTank
                width: $width
                height: $height
                length: $length
                wheelbase: $wheelbase
                trunk: $trunk
                trunkMax: $trunkMax
            }
        ){
            measure {
                _id
                id
            }
        }
    }`;

    const variables = {
        fuelTank: action.values.fuelTank || undefined,
        width: action.values.width,
        height: action.values.height,
        length: action.values.length,
        wheelbase: action.values.wheelbase,
        trunk: action.values.trunk,
        trunkMax: action.values.trunkMax || undefined,
    };
    try {
        yield put({
            type: POST_MEASURE_INIT,
        });
        const data = yield call(apiQl, queryQl, variables);
        if (data.errors) {
            yield put({
                type: POST_MEASURE_ERROR,
                data: errorParserGraphql(data.errors),
            });
            yield put({
                type: CLIENT_LOG,
                data: {
                    message: errorParserGraphql(data.errors),
                    action: POST_MEASURE,
                },
            });
        } else {
            yield put({
                type: POST_MEASURE_OK,
                data: data.data.createMeasure,
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

function* putMeasure(action) {
    const queryQl = `mutation putMeasure(
        $id: ID!
        $fuelTank: Int
        $width: Int
        $height: Int
        $length: Int
        $wheelbase: Int
        $trunk: Int
        $trunkMax: Int
    ){
        updateMeasure(
            input: {
                id: $id
                fuelTank: $fuelTank
                width: $width
                height: $height
                length: $length
                wheelbase: $wheelbase
                trunk: $trunk
                trunkMax: $trunkMax
            }
        ){
    		measure {
                _id
                id
            }
        }
    }`;

    const variables = {
        id: action.values.id,
        fuelTank: action.values.fuelTank || undefined,
        width: action.values.width || undefined,
        height: action.values.height || undefined,
        length: action.values.length || undefined,
        wheelbase: action.values.wheelbase || undefined,
        trunk: action.values.trunk || undefined,
        trunkMax: action.values.trunkMax || undefined,
    };
    try {
        yield put({
            type: PUT_MEASURE_INIT,
        });
        const data = yield call(apiQl, queryQl, variables);
        if (data.errors) {
            yield put({
                type: PUT_MEASURE_ERROR,
                data: errorParserGraphql(data.errors),
            });
            yield put({
                type: CLIENT_LOG,
                data: {
                    message: errorParserGraphql(data.errors),
                    action: PUT_MEASURE,
                },
            });
        } else {
            yield put({
                type: PUT_MEASURE_OK,
                data: data.data.updateMeasure,
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
    yield all([
        takeLatest(POST_MEASURE, postMeasure),
        takeLatest(PUT_MEASURE, putMeasure),
    ]);
}
