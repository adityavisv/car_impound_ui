import { ZONE_SUMMARY_FAIL, ZONE_SUMMARY_SUCCESS } from "../actions/types";

const initialState = {
    parkingZoneSummaries: [],
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ZONE_SUMMARY_SUCCESS:
            return {
                ...state,
                statusCode: payload.statusCode,
                parkingZoneSummaries: payload.zoneSummaries,
            };
        case ZONE_SUMMARY_FAIL:
            return {
                ...state,
                statusCode: payload.statusCode,
                parkingZoneSummaries: [],
            };
        default:
            return state;
    }
}