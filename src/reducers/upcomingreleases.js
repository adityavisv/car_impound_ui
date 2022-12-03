import {
    UPCOMING_RELEASES_FETCH_START,
    UPCOMING_RELEASES_FETCH_SUCCESS,
    UPCOMING_RELEASES_FETCH_FAIL
} from "../actions/types";

const initialState = {
    upcomingReleases: [],
    statusCode: 0,
    upcomingReleasesReqInit: false,
    upcomingReleasesReqFail: false
};

export default function(state = initialState, action) {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case UPCOMING_RELEASES_FETCH_START:
            return {
                ...state,
                upcomingReleasesReqInit: true
            };
        case UPCOMING_RELEASES_FETCH_SUCCESS:
            const {
                upcomingReleases
            } = payload;
            return {
                ...state,
                upcomingReleasesReqFail: false,
                upcomingReleasesReqInit: false,
                upcomingReleases
            };
        case UPCOMING_RELEASES_FETCH_FAIL:
            return {
                ...state,
                upcomingReleasesReqInit: false,
                upcomingReleasesReqFail: true,
                statusCode: payload.statusCode
            };
        default:
            return state;
    }
}