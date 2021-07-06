import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import brand from './brand';
import measure from './measure';
import model from './model';
import motor from './motor';
import password from './password';
import performance from './performance';
import price from './price';
import version from './version';
import system from './system';
import trim from './trim';

const rootReducer = combineReducers({
    form: formReducer,
    auth,
    brand,
    measure,
    model,
    motor,
    password,
    performance,
    price,
    version,
    system,
    trim,
});

export default rootReducer;
