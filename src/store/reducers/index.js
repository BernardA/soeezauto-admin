import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import brand from './brand';
import model from './model';
import password from './password';
import version from './version';
import system from './system';

const rootReducer = combineReducers({
    form: formReducer,
    auth,
    brand,
    model,
    password,
    version,
    system,
});

export default rootReducer;
