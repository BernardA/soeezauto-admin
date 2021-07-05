import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    CLIENT_LOG,
    LOGOUT_TOKEN_EXPIRED,
    CHECK_ONLINE_STATUS_ERROR,
    PUT_MODEL,
    PUT_MODEL_INIT,
    PUT_MODEL_OK,
    PUT_MODEL_ERROR,
    POST_MODEL,
    POST_MODEL_INIT,
    POST_MODEL_OK,
    POST_MODEL_ERROR,
} from 'store/actions';
import localforage from 'localforage';
import { apiQl, errorParserGraphql } from '../../lib/functions';

function* putModel(action) {
    const queryQl = `mutation putModel(
        $id: ID!
        $model: String
        $modelYear: Int
        $brandId: String
        $segmentId: String
        $isActive: Boolean
    ) {
        updateModel(
            input: {
                id: $id
                model: $model
                modelYear: $modelYear
                brand: $brandId
                segment: $segmentId
                isActive: $isActive
            }
        ) {
            model {
                id
            }
        }
    }`;

    const variables = {
        id: action.values.id,
        model: action.values.model,
        modelYear: action.values.modelYear,
        brandId: action.values.brandId,
        segmentId: action.values.segmentId,
        isActive: action.values.isActive,
    };
    try {
        yield put({
            type: PUT_MODEL_INIT,
        });
        const data = yield call(apiQl, queryQl, variables);
        if (data.errors) {
            yield put({
                type: PUT_MODEL_ERROR,
                data: errorParserGraphql(data.errors),
            });
            yield put({
                type: CLIENT_LOG,
                data: {
                    message: errorParserGraphql(data.errors),
                    action: PUT_MODEL,
                },
            });
        } else {
            yield put({
                type: PUT_MODEL_OK,
                data: data.data.updateModel,
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

function* postModel(action) {
    const queryQl = `mutation postModel(
        $model: String!
        $modelYear: Int!
        $isActive: Boolean!
        $brandId: String!
        $segmentId: String!
    ) {
        createModel(
            input: {
                model: $model
                modelYear: $modelYear
                isActive: $isActive
                brand: $brandId
                segment: $segmentId
        }){
            model {
                _id
                id
                model
                modelYear
            }
        }
    }`;

    const variables = {
        model: action.values.model,
        modelYear: action.values.modelYear,
        brandId: action.values.brand,
        segmentId: action.values.segment,
        isActive: action.values.isActive,
    };
    try {
        yield put({
            type: POST_MODEL_INIT,
        });
        const data = yield call(apiQl, queryQl, variables);
        if (data.errors) {
            yield put({
                type: POST_MODEL_ERROR,
                data: errorParserGraphql(data.errors),
            });
            yield put({
                type: CLIENT_LOG,
                data: {
                    message: errorParserGraphql(data.errors),
                    action: POST_MODEL,
                },
            });
        } else {
            yield put({
                type: POST_MODEL_OK,
                data: data.data.createModel,
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
    yield all([takeLatest(PUT_MODEL, putModel), takeLatest(POST_MODEL, postModel)]);
}
