import {
    RELEASE_QUEUE_FETCH_FAIL,
    RELEASE_QUEUE_FETCH_START,
    RELEASE_QUEUE_FETCH_SUCCESS
} from "../actions/types";

const initialState = {
    releaseQueue: [],
    statusCode: 0,
    releaseQueueReqInit: false,
    releaseQueueReqFail: false
};

export default function(state = initialState, action) {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case RELEASE_QUEUE_FETCH_START:
            return {
                ...state,
                releaseQueueReqInit: true
            };
        case RELEASE_QUEUE_FETCH_SUCCESS:
            return {
                ...state,
                releaseQueueReqInit: false,
                releaseQueueReqFail: false,
                releaseQueue: payload.releaseQueue
            };
        case RELEASE_QUEUE_FETCH_FAIL:
            return {
                ...state,
                statusCode: payload.statusCode,
                releaseQueue: [],
                releaseQueueReqFail: true,
                releaseQueueReqInit: false
            }
        default:
            return state;
    };
}