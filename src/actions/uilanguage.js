import { SET_UI_LANG } from "./types"

export const setUILanguage = (uiLanguage) => (dispatch) => {
    dispatch({
        type: SET_UI_LANG,
        payload: {
            uiLanguage
        }
    });
}