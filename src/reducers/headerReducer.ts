import { AnyAction } from "@reduxjs/toolkit";
import {
    OPEN_DEFAULT_SETTING_MODAL,
    CLOSE_DEFAULT_SETTING_MODAL,
} from "actions";


interface HeaderType {
    actionModal: {
        isViewDefaultSettingModal: boolean;
    }
}

const initialState: HeaderType = {
    actionModal: {
        isViewDefaultSettingModal : false
    }
}

export const headerReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case OPEN_DEFAULT_SETTING_MODAL:
        case CLOSE_DEFAULT_SETTING_MODAL:
            return {
                ...state,
                actionModal:{
                    isViewDefaultSettingModal: action.payload,
                }
            };
        default:
            return {
                ...state,
            };
    }
};
