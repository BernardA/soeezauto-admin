import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    CLIENT_LOG,
    LOGOUT_TOKEN_EXPIRED,
    CHECK_ONLINE_STATUS_ERROR,
    POST_PRICE,
    POST_PRICE_INIT,
    POST_PRICE_OK,
    POST_PRICE_ERROR,
    PUT_PRICE,
    PUT_PRICE_INIT,
    PUT_PRICE_OK,
    PUT_PRICE_ERROR,
} from 'store/actions';
import localforage from 'localforage';
import { apiQl, errorParserGraphql } from '../../lib/functions';

function* postPrice(action) {
    const queryQl = `mutation postPrice(
        $version: String!
        $price: Int!
        $promo: Int
    )
    {
        createPrice(
            input: {
                version: $version
                price: $price
                promo: $promo
            }
        )
            {
            price{
                id
                _id
            }
        }
    }`;

    const variables = {
        version: action.values.version,
        price: action.values.price,
        promo: action.values.promo || undefined,
    };
    try {
        yield put({
            type: POST_PRICE_INIT,
        });
        const data = yield call(apiQl, queryQl, variables);
        if (data.errors) {
            yield put({
                type: POST_PRICE_ERROR,
                data: errorParserGraphql(data.errors),
            });
            yield put({
                type: CLIENT_LOG,
                data: {
                    message: errorParserGraphql(data.errors),
                    action: POST_PRICE,
                },
            });
        } else {
            yield put({
                type: POST_PRICE_OK,
                data: data.data.createPrice,
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

function* putPrice(action) {
    const queryQl = `mutation putPrice(
        $id: ID!
        $version: String
        $price: Int
        $promo: Int
    ){
        updatePrice(
            input: {
                id: $id
                version: $version
                price: $price
                promo: $promo
            }
        ){
    		price {
                _id
                id
            }
        }
    }`;

    const variables = {
        id: action.values.id,
        version: action.values.version || undefined,
        price: action.values.price || undefined,
        promo: action.values.promo || undefined,
    };
    try {
        yield put({
            type: PUT_PRICE_INIT,
        });
        const data = yield call(apiQl, queryQl, variables);
        if (data.errors) {
            yield put({
                type: PUT_PRICE_ERROR,
                data: errorParserGraphql(data.errors),
            });
            yield put({
                type: CLIENT_LOG,
                data: {
                    message: errorParserGraphql(data.errors),
                    action: PUT_PRICE,
                },
            });
        } else {
            yield put({
                type: PUT_PRICE_OK,
                data: data.data.updatePrice,
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
    yield all([takeLatest(POST_PRICE, postPrice), takeLatest(PUT_PRICE, putPrice)]);
}
