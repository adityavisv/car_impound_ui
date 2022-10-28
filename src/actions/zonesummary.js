import UserService from "../services/user.service"
import { ZONE_SUMMARY_FAIL, ZONE_SUMMARY_SUCCESS } from "./types"

export const retrieveZoneSummary = () => (dispatch) => {
    return UserService.getAllZoneSummaries()
        .then(
            (response) => {
                dispatch({
                    type: ZONE_SUMMARY_SUCCESS,
                    payload: {
                        zoneSummaries: response.data.zoneSummaries,
                        statusCode: response.statusCode
                    }
                });
                return Promise.resolve();
            }).catch((error) => {
            dispatch({
                type: ZONE_SUMMARY_FAIL,
                payload: { statusCode: error.response.status }
            });
            return Promise.reject();
        });
};