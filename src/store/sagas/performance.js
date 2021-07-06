import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    CLIENT_LOG,
    LOGOUT_TOKEN_EXPIRED,
    CHECK_ONLINE_STATUS_ERROR,
    POST_PERFORMANCE,
    POST_PERFORMANCE_INIT,
    POST_PERFORMANCE_OK,
    POST_PERFORMANCE_ERROR,
    PUT_PERFORMANCE,
    PUT_PERFORMANCE_INIT,
    PUT_PERFORMANCE_OK,
    PUT_PERFORMANCE_ERROR,
} from 'store/actions';
import localforage from 'localforage';
import { apiQl, errorParserGraphql } from '../../lib/functions';

function* postPerformance(action) {
    const queryQl = `mutation postPerformance(
        $to100: String!
        $maxSpeed: Int!
        $emissions: Int!
        $mileageCity: String
        $mileageRoad: String
        $mileageMix: String!
    )
    {
        createPerformance(
            input: {
                to100: $to100
                maxSpeed: $maxSpeed
                emissions: $emissions
                mileageCity: $mileageCity
                mileageRoad: $mileageRoad
                mileageMix: $mileageMix
            }
        )
            {
            performance{
                id
                _id
            }
        }
    }`;

    const variables = {
        to100: action.values.to100,
        maxSpeed: action.values.maxSpeed,
        emissions: action.values.emissions,
        mileageCity: action.values.mileageCity || undefined,
        mileageRoad: action.values.mileageRoad || undefined,
        mileageMix: action.values.mileageMix,
    };
    try {
        yield put({
            type: POST_PERFORMANCE_INIT,
        });
        const data = yield call(apiQl, queryQl, variables);
        if (data.errors) {
            yield put({
                type: POST_PERFORMANCE_ERROR,
                data: errorParserGraphql(data.errors),
            });
            yield put({
                type: CLIENT_LOG,
                data: {
                    message: errorParserGraphql(data.errors),
                    action: POST_PERFORMANCE,
                },
            });
        } else {
            yield put({
                type: POST_PERFORMANCE_OK,
                data: data.data.createPerformance,
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

function* putPerformance(action) {
    const queryQl = `mutation putPerformance(
        $id: ID!
        $to100: String
        $maxSpeed: Int
        $emissions: Int
        $mileageCity: String
        $mileageRoad: String
        $mileageMix: String
    ){
        updatePerformance(
            input: {
                id: $id
                to100: $to100
                maxSpeed: $maxSpeed
                emissions: $emissions
                mileageCity: $mileageCity
                mileageRoad: $mileageRoad
                mileageMix: $mileageMix
            }
        ){
    		performance {
                _id
                id
            }
        }
    }`;

    const variables = {
        id: action.values.id,
        to100: action.values.to100 || undefined,
        maxSpeed: action.values.maxSpeed || undefined,
        emissions: action.values.emissions || undefined,
        mileageCity: action.values.mileageCity || undefined,
        mileageRoad: action.values.mileageRoad || undefined,
        mileageMix: action.values.mileageMix || undefined,
    };
    try {
        yield put({
            type: PUT_PERFORMANCE_INIT,
        });
        const data = yield call(apiQl, queryQl, variables);
        if (data.errors) {
            yield put({
                type: PUT_PERFORMANCE_ERROR,
                data: errorParserGraphql(data.errors),
            });
            yield put({
                type: CLIENT_LOG,
                data: {
                    message: errorParserGraphql(data.errors),
                    action: PUT_PERFORMANCE,
                },
            });
        } else {
            yield put({
                type: PUT_PERFORMANCE_OK,
                data: data.data.updatePerformance,
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
        takeLatest(POST_PERFORMANCE, postPerformance),
        takeLatest(PUT_PERFORMANCE, putPerformance),
    ]);
}
