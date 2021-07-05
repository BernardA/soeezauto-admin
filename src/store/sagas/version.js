import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    CLIENT_LOG,
    LOGOUT_TOKEN_EXPIRED,
    CHECK_ONLINE_STATUS_ERROR,
    POST_VERSION,
    POST_VERSION_INIT,
    POST_VERSION_OK,
    POST_VERSION_ERROR,
    PUT_VERSION,
    PUT_VERSION_INIT,
    PUT_VERSION_OK,
    PUT_VERSION_ERROR,
} from 'store/actions';
import localforage from 'localforage';
import { apiQl, errorParserGraphql } from '../../lib/functions';

function* postVersion(action) {
    const queryQl = `mutation postVersion(
        $model: String!
        $version: String!
        $motor: String!
        $measures: String!
        $performance: String!
        $bodyType: String!
        $gearbox: String!
        $places: Int!
        $doors: Int!
        $traction: String!
        $gvw: Int
        $curbWeight: Int
        $tyreFront: String!
        $tyreBack: String
        ){
            createVersion(
                input: {
                    model: $model
                    version: $version
                    motor: $motor
                    measures: $measures
                    performance: $performance
                    bodyType: $bodyType
                    gearbox: $gearbox
                    places: $places
                    doors: $doors
                    traction: $traction
                    gvw: $gvw
                    curbWeight: $curbWeight
                    tyreFront: $tyreFront
                    tyreBack: $tyreBack
                }
        ) {
            version{
                id
                _id
            }
        }
        }`;

    const variables = {
        model: action.values.model,
        version: action.values.version,
        motor: action.values.motorId,
        measures: action.values.measureId,
        performance: action.values.performanceId,
        bodyType: action.values.bodyType,
        gearbox: action.values.gearbox,
        places: action.values.places,
        doors: action.values.doors,
        traction: action.values.traction,
        gvw: action.values.gvw,
        curbWeight: action.values.curbWeight,
        tyreFront: action.values.tyreFront,
    };
    try {
        yield put({
            type: POST_VERSION_INIT,
        });
        const data = yield call(apiQl, queryQl, variables);
        if (data.errors) {
            yield put({
                type: POST_VERSION_ERROR,
                data: errorParserGraphql(data.errors),
            });
            yield put({
                type: CLIENT_LOG,
                data: {
                    message: errorParserGraphql(data.errors),
                    action: POST_VERSION,
                },
            });
        } else {
            yield put({
                type: POST_VERSION_OK,
                data: data.data.createVersion,
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

function* putVersion(action) {
    const queryQl = `mutation putVersion(
        $id: ID!
        $model: String
        $version: String
        $motor: String
        $measures: String
        $performance: String
        $bodyType: String
        $gearbox: String
        $places: Int
        $doors: Int
        $traction: String
        $gvw: Int
        $curbWeight: Int
        $tyreFront: String
        $tyreBack: String
        ){
            updateVersion(
                input: {
                    id: $id
                    model: $model
                    version: $version
                    motor: $motor
                    measures: $measures
                    performance: $performance
                    bodyType: $bodyType
                    gearbox: $gearbox
                    places: $places
                    doors: $doors
                    traction: $traction
                    gvw: $gvw
                    curbWeight: $curbWeight
                    tyreFront: $tyreFront
                    tyreBack: $tyreBack
                }
        ) {
            version{
                id
                _id
            }
        }
        }`;

    const variables = {
        id: action.values.id,
        model: action.values.model,
        version: action.values.version,
        motor: action.values.motorId,
        measures: action.values.measureId,
        performance: action.values.performanceId,
        bodyType: action.values.bodyType,
        gearbox: action.values.gearbox,
        places: action.values.places,
        doors: action.values.doors,
        traction: action.values.traction,
        gvw: action.values.gvw,
        curbWeight: action.values.curbWeight,
        tyreFront: action.values.tyreFront,
    };
    try {
        yield put({
            type: PUT_VERSION_INIT,
        });
        const data = yield call(apiQl, queryQl, variables);
        if (data.errors) {
            yield put({
                type: PUT_VERSION_ERROR,
                data: errorParserGraphql(data.errors),
            });
            yield put({
                type: CLIENT_LOG,
                data: {
                    message: errorParserGraphql(data.errors),
                    action: PUT_VERSION,
                },
            });
        } else {
            yield put({
                type: PUT_VERSION_OK,
                data: data.data.updateVersion,
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
        takeLatest(POST_VERSION, postVersion),
        takeLatest(PUT_VERSION, putVersion),
    ]);
}
