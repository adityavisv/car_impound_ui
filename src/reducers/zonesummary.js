import {
    ZONE_SUMMARY_FAIL,
    ZONE_SUMMARY_SUCCESS,
    ZONE_SUMMARY_START
} from "../actions/types";

const initialState = {
    parkingZoneSummaries: [],
    statusCode: 0,
    zoneSummaryReqInit: false,
    zoneSummaryReqFail: false
};

export default function(state = initialState, action) {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case ZONE_SUMMARY_START:
            return {
                ...state,
                zoneSummaryReqInit: true
            };
        case ZONE_SUMMARY_SUCCESS:
            return {
                ...state,
                statusCode: payload.statusCode,
                parkingZoneSummaries: payload.zoneSummaries,
                zoneSummaryReqInit: false,
                zoneSummaryReqFail: false
            };
        case ZONE_SUMMARY_FAIL:
            return {
                ...state,
                statusCode: payload.statusCode,
                parkingZoneSummaries: [],
                zoneSummaryReqInit: false,
                zoneSummaryReqFail: true
            };
        default:
            return state;
    }
}