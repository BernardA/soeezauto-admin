import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    CLIENT_LOG,
    LOGOUT_TOKEN_EXPIRED,
    CHECK_ONLINE_STATUS_ERROR,
    PUT_BRAND,
    PUT_BRAND_INIT,
    PUT_BRAND_OK,
    PUT_BRAND_ERROR,
} from 'store/actions';
import localforage from 'localforage';
import { apiQl, errorParserGraphql } from '../../lib/functions';

function* putBrand(action) {
    console.log('action', action);
    const queryQl = `mutation putBrand(
    $id: ID!
    $brand: String
    $image: String
    $isActive: Boolean
    ) {
        updateBrand(
        input: {
            id: $id
            brand: $brand
            image: $image
            isActive: $isActive
        }
        ) {
        brand {
            id
        }
        }
    }`;

    const variables = {
        id: action.values.id,
        brand: action.values.brand,
        image: action.values.image,
        isActive: action.values.isActive,
    };
    try {
        yield put({
            type: PUT_BRAND_INIT,
        });
        const data = yield call(apiQl, queryQl, variables);
        if (data.errors) {
            yield put({
                type: PUT_BRAND_ERROR,
                data: errorParserGraphql(data.errors),
            });
            yield put({
                type: CLIENT_LOG,
                data: {
                    message: errorParserGraphql(data.errors),
                    action: PUT_BRAND,
                },
            });
        } else {
            yield put({
                type: PUT_BRAND_OK,
                data: data.data.updateBrand,
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
    yield all([takeLatest(PUT_BRAND, putBrand)]);
}
