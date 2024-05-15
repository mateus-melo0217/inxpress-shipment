import { cloneDeep } from 'lodash';
import { AnyAction } from "@reduxjs/toolkit";
import {savedQuotesColumnSettings} from '../pages/saved_quotes/column_settings/SavedQuotesColumnSettings';
import {
    TOGGLE_VIEW_COLUMN_SETTING_SAVEDQUOTES,
    RESTORE_COLUMN_SETTING_SAVEDQUOTES,
    OPEN_DELETE_QUOTE_MODAL,
    CLOSE_DELETE_QUOTE_MODAL,
    CHANGE_COLUMN_ORDER_SAVED_QUOTES,
    OPEN_DISPATCH_MENU_DIALOG_MODAL,
    CLOSE_DISPATCH_MENU_DIALOG_MODAL
} from "actions";

let clonedSavedQuotesColumnSettings = cloneDeep(savedQuotesColumnSettings);

interface ISavedQuotes {
    actionModal: {
        deleteQuoteModal: {
            isDeleteQuoteOpen: boolean,
            row: any
        },
        dispatchMenuDialog: {
            showDispatchMenuDialog: boolean,
            row: any
        },
    },
    columnsSettingSQ: any
}

const columnsSettingSQ = typeof localStorage.getItem('columnsSettingForSavedQuotes') === 'string' ? JSON.parse(localStorage.getItem('columnsSettingForSavedQuotes') || '') : '';

const initialState: ISavedQuotes = {
    actionModal: {
        deleteQuoteModal: {
            isDeleteQuoteOpen: false,
            row: {}
        },
        dispatchMenuDialog: {
            showDispatchMenuDialog: false,
            row: {}
        },
    },

    columnsSettingSQ: columnsSettingSQ ? columnsSettingSQ : clonedSavedQuotesColumnSettings
}

export const savedQuotesReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case OPEN_DELETE_QUOTE_MODAL:
        case CLOSE_DELETE_QUOTE_MODAL:
            return {
                ...state,
                actionModal: {
                    ...state.actionModal,
                    deleteQuoteModal: {
                        ...state.actionModal.deleteQuoteModal,
                        ...action.payload
                    }
                }
            }
        case TOGGLE_VIEW_COLUMN_SETTING_SAVEDQUOTES:
            state.columnsSettingSQ.forEach((colSet: any)=> {
                if (colSet.label === action.payload.label) {
                    colSet.is_active = !colSet.is_active
                }
            })

            localStorage.setItem('columnsSettingForSavedQuotes', JSON.stringify(state.columnsSettingSQ));

            return {
                ...state,
                columnsSettingSQ: [
                    ...state.columnsSettingSQ
                ]
            }
        case RESTORE_COLUMN_SETTING_SAVEDQUOTES:
            clonedSavedQuotesColumnSettings = cloneDeep(savedQuotesColumnSettings);
            localStorage.setItem('columnsSettingForSavedQuotes', JSON.stringify(clonedSavedQuotesColumnSettings));

            return {
                ...state,
                columnsSettingSQ: clonedSavedQuotesColumnSettings
            }
        case CHANGE_COLUMN_ORDER_SAVED_QUOTES:
            let {from, to} = action.moving;
            
            let fromId = state.columnsSettingSQ.findIndex((item: any) => item.column === from)
            let toId = state.columnsSettingSQ.findIndex((item: any) => item.column === to)
            
            let temp = 0;
            if (fromId > toId) {
                temp = fromId;
                fromId = toId;
                toId = temp;
            }

            const arr = [
                ...state.columnsSettingSQ.slice(0, fromId), 
                state.columnsSettingSQ[toId], 
                ...state.columnsSettingSQ.slice(fromId + 1, toId), 
                state.columnsSettingSQ[fromId], 
                ...state.columnsSettingSQ.slice(toId + 1)
            ]
            
            localStorage.setItem('columnsSettingForSavedQuotes', JSON.stringify(arr));
            return {
                ...state,
                columnsSettingSQ: [...arr]
            }
        case OPEN_DISPATCH_MENU_DIALOG_MODAL:
        case CLOSE_DISPATCH_MENU_DIALOG_MODAL:
            return {
                ...state,
                actionModal: {
                    ...state.actionModal,
                    dispatchMenuDialog: {
                        ...state.actionModal.dispatchMenuDialog,
                        ...action.payload
                    }
                }
            }
        default:
            return {
                ...state,
            };
    }
};
