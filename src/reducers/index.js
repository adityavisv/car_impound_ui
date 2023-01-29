import {
    combineReducers
} from 'redux';
import auth from './auth';
import message from './message';
import zonesummary from './zonesummary';
import releasequeue from './releasequeue';
import upcomingreleases from './upcomingreleases';
import uilanguage from './uilanguage';

export default combineReducers({
    auth,
    message,
    zonesummary,
    releasequeue,
    upcomingreleases,
    uilanguage
});