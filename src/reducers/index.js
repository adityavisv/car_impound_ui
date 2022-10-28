import { combineReducers } from 'redux';
import auth from './auth';
import message from './message';
import zonesummary from './zonesummary';

export default combineReducers({
    auth,
    message,
    zonesummary
});