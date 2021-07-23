import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    CLIENT_LOG,
    LOGOUT_TOKEN_EXPIRED,
    CHECK_ONLINE_STATUS_ERROR,
    POST_IMAGE,
    POST_IMAGE_INIT,
    POST_IMAGE_OK,
    POST_IMAGE_ERROR,
} from 'store/actions';
import localforage from 'localforage';
import { apiQl, errorParserGraphql } from '../../lib/functions';

function* postImage(action) {
    const queryQl = `mutation postImage(
        $model: String!
        $filename: String!
    )
    {
        createImage(
            input: {
                model: $model
                filename: $filename
            }
        ){
            image {
                id
            }
        }
    }`;

    const variables = {
        model: action.values.model,
        filename: action.values.filename,
    };
    try {
        yield put({
            type: POST_IMAGE_INIT,
        });
        const data = yield call(apiQl, queryQl, variables);
        if (data.errors) {
            yield put({
                type: POST_IMAGE_ERROR,
                data: errorParserGraphql(data.errors),
            });
            yield put({
                type: CLIENT_LOG,
                data: {
                    message: errorParserGraphql(data.errors),
                    action: POST_IMAGE,
                },
            });
        } else {
            yield put({
                type: POST_IMAGE_OK,
                data: data.data.createImage,
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
    yield all([takeLatest(POST_IMAGE, postImage)]);
}
