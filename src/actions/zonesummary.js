import UserService from "../services/user.service"
import {
    ZONE_SUMMARY_FAIL,
    ZONE_SUMMARY_SUCCESS,
    ZONE_SUMMARY_START
} from "./types"

export const retrieveZoneSummary = () => (dispatch) => {
    dispatch({
        type: ZONE_SUMMARY_START,
        payload: {}
    });

    UserService.getAllZoneSummaries()
        .then(
            (response) => {
                dispatch({
                    type: ZONE_SUMMARY_SUCCESS,
                    payload: {
                        zoneSummaries: response.data.zoneSummaries,
                        statusCode: response.statusCode
                    }
                });
            })
        .catch((error) => {
            console.log(error);
            dispatch({
                type: ZONE_SUMMARY_FAIL,
                payload: {
                    statusCode: error.response !== undefined ? error.response.status : 0
                }
            });
        });
};