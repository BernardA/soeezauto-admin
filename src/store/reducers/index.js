import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import brand from './brand';
import password from './password';
import system from './system';

const rootReducer = combineReducers({
    form: formReducer,
    auth,
    brand,
    password,
    system,
});

export default rootReducer;
