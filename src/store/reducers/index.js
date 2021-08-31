import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import brand from './brand';
import image from './image';
import measure from './measure';
import model from './model';
import motor from './motor';
import password from './password';
import performance from './performance';
import price from './price';
import version from './version';
import specifications from './specifications';
import system from './system';
import trim from './trim';

const rootReducer = combineReducers({
    form: formReducer,
    auth,
    brand,
    image,
    measure,
    model,
    motor,
    password,
    performance,
    price,
    version,
    specifications,
    system,
    trim,
});

export default rootReducer;
