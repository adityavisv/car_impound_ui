import UserService from "../services/user.service";
import {
    UPCOMING_RELEASES_FETCH_FAIL,
    UPCOMING_RELEASES_FETCH_SUCCESS,
    UPCOMING_RELEASES_FETCH_START
} from "./types";

export const fetchUpcomingReleases = () => (dispatch) => {
    dispatch({
        type: UPCOMING_RELEASES_FETCH_START,
        payload: {}
    });

    UserService.getUpcomingReleases()
        .then(
            (response) => {
                const {
                    data: {
                        upcomingReleases,
                        missedReleases
                    }
                } = response;
                dispatch({
                    type: UPCOMING_RELEASES_FETCH_SUCCESS,
                    payload: {
                        upcomingReleases,
                        missedReleases,
                        statusCode: response.statusCode
                    }
                });
            })
        .catch((error) => {
            dispatch({
                type: UPCOMING_RELEASES_FETCH_FAIL,
                payload: {
                    statusCode: error.response !== undefined ? error.response.status : 0
                }
            });
        });

}