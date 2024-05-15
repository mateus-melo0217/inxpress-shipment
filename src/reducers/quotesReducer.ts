import { cloneDeep } from 'lodash';
import { AnyAction } from "@reduxjs/toolkit";
import {quotesColumnSettings} from '../pages/quotes/column_settings/QuotesColumnSettings';
import {
    CLOSE_SHIPMENT_NOTES_MODAL,
    OPEN_SHIPMENT_NOTES_ADD_NOTES_MODAL,
    CLOSE_SHIPMENT_NOTES_ADD_NOTES_MODAL,
    OPEN_SHIPMENT_NOTES_SEND_EMAIL_MODAL,
    CLOSE_SHIPMENT_NOTES_SEND_EMAIL_MODAL,
    OPEN_DISPATCH_MENU_DIALOG_MODAL,
    CLOSE_DISPATCH_MENU_DIALOG_MODAL,
    OPEN_MODIFY_PICKUP_DIALOG_MODAL,
    CLOSE_MODIFY_PICKUP_DIALOG_MODAL,
    OPEN_BOL_DETAIL_MODAL,
    CLOSE_BOL_DETAIL_MODAL,
    OPEN_TRACKING_SHIPMENT_MODAL,
    CLOSE_TRACKING_SHIPMENT_MODAL,
    OPEN_VOID_SHIPMENT_MODAL,
    CLOSE_VOID_SHIPMENT_MODAL,
    CLOSE_CANCEL_SHIPMENT_MODAL,
    OPEN_SHIPMENT_NOTES_MODAL,
    OPEN_VIEW_SHIPMENT_MODAL,
    CLOSE_VIEW_SHIPMENT_MODAL,
    TOGGLE_VIEW_COLUMN_SETTING,
    RESTORE_COLUMN_SETTING,
    CHANGE_COLUMN_ORDER_FREIGHT_HISTORY,
    OPEN_FORWARDING_ROUTE,
    CLOSE_FORWARDING_ROUTE,
    UPDATE_POPULATION_OBJ
} from "actions";

let clonedQuotesColumnSettings = cloneDeep(quotesColumnSettings);

interface IQuotes {
    actionModal: {
        dispatchMenuDialog: {
            showDispatchMenuDialog: boolean,
            row: any
        },
        modifyPickUpDialog: {
            showShedulePickupDialog: boolean,
            row: any
        },
        bolDetailModal: {
            showInfoBol: boolean,
            isEditable: boolean,
            row: any
        },
        trackingShipmentModal: {
            showTrackingDialog: boolean,
            row: any
        },
        shipmentNotesModal: {
            isOpen: boolean
            row: any,
            addNoteModal: boolean,
            sendDocumenetsModal: boolean
        },
        viewShipmentModal: {
            isOpen: boolean
            row: any,
        },
        voidShipmentModal: {
            isCancelShipmentOpen: boolean,
            row: any
        }
    },
    populationObj: any,
    forwardStatus: boolean,
    columnsSetting: any
}

const columnsSetting = typeof localStorage.getItem('quotes_columnsSetting') === 'string' ? JSON.parse(localStorage.getItem('quotes_columnsSetting') || '') : '';

const initialState: IQuotes = {
    actionModal: {
        dispatchMenuDialog: {
            showDispatchMenuDialog: false,
            row: {}
        },
        modifyPickUpDialog: {
            showShedulePickupDialog: false,
            row: {}
        },
        bolDetailModal: {
            showInfoBol: false,
            isEditable: false,
            row: {}
        },
        trackingShipmentModal: {
            showTrackingDialog: false,
            row: {}
        },
        shipmentNotesModal: {
            isOpen: false,
            row: {},
            addNoteModal: false,
            sendDocumenetsModal: false
        },
        viewShipmentModal: {
            isOpen: false,
            row: {}
        },
        voidShipmentModal: {
            isCancelShipmentOpen: false,
            row: {}
        }
    },
    populationObj: {},
    forwardStatus: false,
    columnsSetting: columnsSetting ? columnsSetting : clonedQuotesColumnSettings
}

export const quotesInfoReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        // modal Reducer
        case OPEN_SHIPMENT_NOTES_MODAL:
        case CLOSE_SHIPMENT_NOTES_MODAL:
            return {
                ...state,
                actionModal: {
                    ...state.actionModal,
                    shipmentNotesModal: {
                        ...state.actionModal.shipmentNotesModal,
                        ...action.payload
                    }
                }
            }
        case OPEN_VIEW_SHIPMENT_MODAL:
        case CLOSE_VIEW_SHIPMENT_MODAL:
            return {
                ...state,
                actionModal: {
                    ...state.actionModal,
                    viewShipmentModal: {
                        ...state.actionModal.viewShipmentModal,
                        ...action.payload
                    }
                }
            }
        case OPEN_SHIPMENT_NOTES_ADD_NOTES_MODAL:
        case CLOSE_SHIPMENT_NOTES_ADD_NOTES_MODAL:
            return {
                ...state,
                actionModal: {
                    ...state.actionModal,
                    shipmentNotesModal: {
                        ...state.actionModal.shipmentNotesModal,
                        ...action.payload
                    }
                }
            }
        case OPEN_SHIPMENT_NOTES_SEND_EMAIL_MODAL:
        case CLOSE_SHIPMENT_NOTES_SEND_EMAIL_MODAL:
            return {
                ...state,
                actionModal: {
                    ...state.actionModal,
                    shipmentNotesModal: {
                        ...state.actionModal.shipmentNotesModal,
                        ...action.payload
                    }
                }
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
        case OPEN_MODIFY_PICKUP_DIALOG_MODAL:
        case CLOSE_MODIFY_PICKUP_DIALOG_MODAL:
            return {
                ...state,
                actionModal: {
                    ...state.actionModal,
                    modifyPickUpDialog: {
                        ...state.actionModal.modifyPickUpDialog,
                        ...action.payload
                    }
                }
            }
        case OPEN_BOL_DETAIL_MODAL:
        case CLOSE_BOL_DETAIL_MODAL:
            return {
                ...state,
                actionModal: {
                    ...state.actionModal,
                    bolDetailModal: {
                        ...state.actionModal.bolDetailModal,
                        ...action.payload
                    }
                }
            }
        case OPEN_TRACKING_SHIPMENT_MODAL:
        case CLOSE_TRACKING_SHIPMENT_MODAL:
            return {
                ...state,
                actionModal: {
                    ...state.actionModal,
                    trackingShipmentModal: {
                        ...state.actionModal.trackingShipmentModal,
                        ...action.payload
                    }
                }
            }
        case OPEN_VOID_SHIPMENT_MODAL:
        case CLOSE_VOID_SHIPMENT_MODAL:
            return {
                ...state,
                actionModal: {
                    ...state.actionModal,
                    voidShipmentModal: {
                        ...state.actionModal.voidShipmentModal,
                        ...action.payload
                    }
                }
            }
        case CLOSE_CANCEL_SHIPMENT_MODAL:
            return {
                ...state,
                actionModal: {
                    ...state.actionModal,
                    voidShipmentModal: {
                        ...state.actionModal.voidShipmentModal,
                        ...action.payload
                    }
                }
            }
        // columnSetting Reducer
        case TOGGLE_VIEW_COLUMN_SETTING:
            state.columnsSetting.forEach((colSet: any)=> {
                if (colSet.label === action.payload.label) {
                    colSet.is_active = !colSet.is_active
                }
            })

            localStorage.setItem('quotes_columnsSetting', JSON.stringify(state.columnsSetting));

            return {
                ...state,
                columnsSetting: [
                    ...state.columnsSetting
                ]
            }
        case RESTORE_COLUMN_SETTING:
            clonedQuotesColumnSettings = cloneDeep(quotesColumnSettings);
            localStorage.setItem('quotes_columnsSetting', JSON.stringify(clonedQuotesColumnSettings));

            return {
                ...state,
                columnsSetting: clonedQuotesColumnSettings
            }
        case CHANGE_COLUMN_ORDER_FREIGHT_HISTORY:
            let {from, to} = action.moving;
            let fromId = state.columnsSetting.findIndex((item: any) => item.column === from)
            let toId = state.columnsSetting.findIndex((item: any) => item.column === to)
            
            let temp = 0;
            if (fromId > toId) {
                temp = fromId;
                fromId = toId;
                toId = temp;
            }

            const arr = [
                ...state.columnsSetting.slice(0, fromId), 
                state.columnsSetting[toId], 
                ...state.columnsSetting.slice(fromId + 1, toId), 
                state.columnsSetting[fromId], 
                ...state.columnsSetting.slice(toId + 1)
            ]
            
            localStorage.setItem('quotes_columnsSetting', JSON.stringify(arr));
            return {
                ...state,
                columnsSetting: [...arr]
            }
        case OPEN_FORWARDING_ROUTE:
            return {
                ...state,
                forwardStatus: true
            }
        case CLOSE_FORWARDING_ROUTE:
            return {
                ...state,
                forwardStatus: false
            }
        case UPDATE_POPULATION_OBJ:
            return {
                ...state,
                populationObj: action.payload
            }
        default:
            return {
                ...state,
            };
    }
};
