
import { AnyAction } from "@reduxjs/toolkit";
import {
    UPDATE_AUTHINFO,
    CLEAR_AUTHINFO,
} from "actions";


interface AuthType {
    authenticatedData: any;
}

const initialState: AuthType = {
    authenticatedData : {}
}

export const authReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case UPDATE_AUTHINFO:
            return {
                ...state,
                authenticatedData: action.payload,
            };
        case CLEAR_AUTHINFO:
            return {
                ...initialState,
            }
        default:
            return {
                ...state,
            };
    }
};
