import {
    combineReducers
} from 'redux';
import auth from './auth';
import message from './message';
import zonesummary from './zonesummary';
import releasequeue from './releasequeue';

export default combineReducers({
    auth,
    message,
    zonesummary,
    releasequeue
});