import UserService from "../services/user.service"
import {
    RELEASE_QUEUE_FETCH_FAIL,
    RELEASE_QUEUE_FETCH_START,
    RELEASE_QUEUE_FETCH_SUCCESS
} from "./types"


export const fetchReleaseQueue = () => (dispatch) => {
    dispatch({
        type: RELEASE_QUEUE_FETCH_START,
        payload: {}
    })

    UserService.retrieveReleaseQueue()
        .then((response) => {
            dispatch({
                type: RELEASE_QUEUE_FETCH_SUCCESS,
                payload: {
                    releaseQueue: response.data.vehicles,
                    statusCode: response.statusCode
                }
            });
        })
        .catch((error) => {
            dispatch({
                type: RELEASE_QUEUE_FETCH_FAIL,
                payload: {
                    statusCode: error.response !== undefined ? error.response.status : 0
                }
            })
        });
}