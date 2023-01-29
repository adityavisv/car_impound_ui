import { SET_UI_LANG } from "../actions/types";

const initialState = {
    uiLanguage: "en"
};

export default function(state = initialState, action) {
    const { 
        type,
        payload
    } = action;

    switch(type) {
        case SET_UI_LANG:
            const { uiLanguage } = payload;
            return {
                ...state,
                uiLanguage
            };
        default:
            return state;
    }
}