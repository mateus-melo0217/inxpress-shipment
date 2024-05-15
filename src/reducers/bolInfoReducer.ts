import { AnyAction } from "@reduxjs/toolkit";
import {
    UPDATE_ADDITIONAL_INFO,
    UPDATE_ADDRESS_BOOK_DATA,
    UPDATE_ADDRESS_BOOK_ENTRY,
    UPDATE_BOL_TYPE_INFO,
    UPDATE_HAZMAT,
    UPDATE_HIGHLIGHTED_TILL,
    UPDATE_IS_SECTION_VAL_TRIGGERED,
    UPDATE_IS_SHIPPER_CONS_INFO_CHNGD,
    UPDATE_IS_VALIDATION_TRIGGERED,
    UPDATE_MARSH_INSURANCE_INFO,
    UPDATE_UPSCAPITAL_INSURANCE_INFO,
    UPDATE_PICK_UP_DETAILS_INFO,
    UPDATE_PICK_UP_DETAILS_OBJ,
    UPDATE_DELIVERY_DETAILS_OBJ,
    UPDATE_DELIVERY_DETAILS_INFO,
    UPDATE_PRINTQUOTE_OBJ,
    UPDATE_REFERENCE_INFO,
    UPDATE_REFERENCE_INFO_ADD_REFNUM,
    UPDATE_REFERENCE_INFO_DEL_REFNUM,
    UPDATE_REFERENCE_INFO_REFNUM,
    UPDATE_REFERENCE_OBJ,
    UPDATE_SALES_PRICE_INFO,
    UPDATE_SEL_CONSIGNEE_ID,
    UPDATE_SEL_SHIPPER_ID,
    UPDATE_SHIPMENT_DETAILS,
    UPDATE_SHIPMENT_DETAILS_FIELD,
    UPDATE_SHIPPER_CONS_ADDRESS_BOOK_INFO,
    UPDATE_SHIPPER_CONS_ADDRESS_INFO,
    UPDATE_SHIPPER_CONS_ADDRESS_MUL_INFO,
    UPDATE_SHIPPER_CONS_OTHER_INFO,
    UPDATE_SHOW_ADDRESS_CHNG_CONF,
    UPDATE_VALID_SECTIONS,
    UPD_BOL_OBJ,
    UPD_ERR_OBJ,
    UPDATE_SHIPMENT_ID
} from "actions";
import { cloneDeep } from "lodash";
import moment from "moment";
import {
    AdditionalInfoValues,
    AddressBookEntry,
    BOLTypeValues,
    ErrorObj,
    MarshInsuranceValues,
    UpsCapitalInsuranceObj,
    PickUpDetailsValues,
    DeliveryDetailsValues,
    PrintQuoteObj,
    SalesPriceValues,
    ShipmentDetailsValues,
    ShipmentValues,
    ShipperFormValues,
    ShipperRefMainValues,
} from "pages/bol_info/constants/BOLConstants";

interface BOLInfo {
    shipperConsObj: ShipperFormValues;
    shipmentObj: {shipmentId: number};
    referenceObj: ShipperRefMainValues;
    shipmentDetailsWrapper: ShipmentDetailsValues;
    marshInsuranceObj: MarshInsuranceValues;
    upsCapitalInsuranceObj: UpsCapitalInsuranceObj;
    pickupDetailsObj: PickUpDetailsValues;
    deliveryDetailsObj: DeliveryDetailsValues;
    salesPriceObj: SalesPriceValues;
    bolTypeObj: BOLTypeValues;
    additionalInfoObj: AdditionalInfoValues;
    isValidationTriggered: boolean;
    isHazmat: boolean;
    addressBookData: AddressBookEntry[];
    isValidSections: boolean[];
    isSectionValidationTriggered: boolean[];
    highlightedTillSection: number;
    selectedShipperId: number;
    selectedConsigneeId: number;
    isShipperConsInfoChanged: boolean;
    showAddressChangeConf: boolean;
    errorObj: ErrorObj;
    updBolObj: {
        shipperAddressId: number;
        consigneeAddressId: number;
    };
    printQuoteObj: PrintQuoteObj;
}

const initialState: BOLInfo = {
    shipperConsObj: {
        shipperAddress: {
            contactName: "",
            companyName: "",
            address1: "",
            address2: "",
            city: "",
            stateCode: "",
            postalCode: "",
            countryCode: "",
            phone: "",
            email: "",
        },
        shipperReferenceCode: "",
        consigneeAddress: {
            contactName: "",
            companyName: "",
            address1: "",
            address2: "",
            city: "",
            stateCode: "",
            postalCode: "",
            countryCode: "",
            phone: "",
            email: "",
        },
        consigneeReferenceCode: "",

        shipper_toggle_button: false,
        consignee_toggle_button: false,
        shipper_addAddressBook_check: false,
        consignee_addAddressBook_check: false,
    },

    shipmentObj: {
        shipmentId: 0,
    },

    referenceObj: {
        shipperNumber: "",
        poNumber: "",
        specialInstruction: "",
        accessorials: "",
        referenceNumbers: [""],
        releaseValue: "",

        // Hazmat Fields
        hazmatClass: "", 
        hazmatType: "", 
        hazmatUN: "", 
        hazmatPackageGroup: "", 
        hazmatPackageType: "",
        
    },

    shipmentDetailsWrapper: {
        shipmentDetails: [],
        description: "",
    },

    marshInsuranceObj: {
        marsh_insurance_toggle_button: false,
        totalPremiumAmount: "",
    },
    upsCapitalInsuranceObj: {
        insurance_toggle_button: false,
        totalPremiumAmount: "",
    },

    pickupDetailsObj: {
        pickupDate: null,
        pickupReadyTime: null,
        pickupCloseTime: null,
    },

    deliveryDetailsObj: {
        deliveryDate: null,
        deliveryReadyTime: '08:00',
        deliveryCloseTime: '15:00',
    },

    salesPriceObj: {
        sales_price: "",
    },

    bolTypeObj: {
        standard_toggle_button: true,
        VICS_insurance_toggle_button: false,
    },

    additionalInfoObj: {
        uuid: "", //TODO - To be changed
        billingTypeId: 12, //TODO - To be changed
        tariffDescription: "",
        transitTime: 0,
        specialInstructions: "",
        dutyTypeId: 13, //TODO - To be changed
        providerQuoteItemId: "",
        carrierName: "",
        serviceType: "",
        providerId: 0, //TODO - To be changed
        providerQuoteId: "",
        tariffId: "",
        franchiseCost: "",
    },


    isValidationTriggered: false,

    isHazmat: false,
    addressBookData: [],

    // To trigger and highlight fields in prev sections
    isSectionValidationTriggered: [false, false, false, false, false, false, false],
    // To show check marks on the navigation bar stating validation complete for a section
    isValidSections: [false, false, false, false, false, false, false],
    // To show all sections till the current section user is entering values
    highlightedTillSection: 1,

    selectedShipperId: 0,
    selectedConsigneeId: 0,
    isShipperConsInfoChanged: false,
    showAddressChangeConf: false,

    errorObj: {
        show: false,
        errorCode: "",
        errorMsg: "",
        contactName: "",
        deptName: "",
        phone: 0,
        email: ""
    },

    updBolObj: {
        shipperAddressId: 0,
        consigneeAddressId: 0
    },
    printQuoteObj: {
        quoteGenMoment: moment(),
        origin: null,
        destination: null,
        items: [],
        units: 0,
        totalCubic: 0,
        totalPcf: 0,
        totalWeight: 0,
        accessorial: "",
        insuranceAmount: 0,
        premiumAmount: 0,
        quotes: []
    }
};

export const bolInfoReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case UPDATE_SHIPPER_CONS_ADDRESS_INFO:
            return {
                ...state,
                shipperConsObj: {
                    ...state.shipperConsObj,
                    [action.payload.shipperConsKey]: {
                        ...(state.shipperConsObj[action.payload.shipperConsKey] as Record<
                            string,
                            unknown
                        >),
                        [action.payload.updKey]: action.payload.updValue,
                    },
                },
            };

        case UPDATE_SHIPPER_CONS_ADDRESS_MUL_INFO:
            return {
                ...state,
                shipperConsObj: {
                    ...state.shipperConsObj,
                    [action.payload.shipperConsKey]: {
                        ...(state.shipperConsObj[action.payload.shipperConsKey] as Record<
                            string,
                            unknown
                        >),
                        ...action.payload.data,
                    },
                },
            };

        case UPDATE_SHIPPER_CONS_OTHER_INFO:
            return {
                ...state,
                shipperConsObj: {
                    ...state.shipperConsObj,
                    [action.payload.updKey]: action.payload.updValue,
                },
            };
        case UPDATE_SHIPPER_CONS_ADDRESS_BOOK_INFO:
            return {
                ...state,
                shipperConsObj: {
                    ...state.shipperConsObj,
                    ...action.payload,
                },
            };

        case UPDATE_REFERENCE_OBJ:
            return {
                ...state,
                referenceObj: {
                    ...state.referenceObj,
                    ...action.payload,
                },
            };
        case UPDATE_REFERENCE_INFO:
            return {
                ...state,
                referenceObj: {
                    ...state.referenceObj,
                    [action.payload.updKey]: action.payload.updValue,
                },
            };
        case UPDATE_REFERENCE_INFO_ADD_REFNUM:
            return {
                ...state,
                referenceObj: {
                    ...state.referenceObj,
                    referenceNumbers: state.referenceObj.referenceNumbers.concat(""),
                },
            };

        case UPDATE_REFERENCE_INFO_DEL_REFNUM:
            return {
                ...state,
                referenceObj: {
                    ...state.referenceObj,
                    referenceNumbers: delRefNumInRefInfo(
                        action.payload.delIndex,
                        state.referenceObj.referenceNumbers
                    ),
                },
            };

        case UPDATE_REFERENCE_INFO_REFNUM:
            return {
                ...state,
                referenceObj: {
                    ...state.referenceObj,
                    referenceNumbers: state.referenceObj.referenceNumbers.map(
                        (obj, index) =>
                            index === action.payload.updIndex ? action.payload.updData : obj
                    ),
                },
            };

        case UPDATE_SHIPMENT_DETAILS:
            return {
                ...state,
                shipmentDetailsWrapper: {
                    ...state.shipmentDetailsWrapper,
                    shipmentDetails: action.payload,
                },
            };

        case  UPDATE_SHIPMENT_ID:
            return {
                ...state,
                shipmentObj: action.payload
            };
           
        case UPDATE_SHIPMENT_DETAILS_FIELD:
            return {
                ...state,
                shipmentDetailsWrapper: {
                    ...state.shipmentDetailsWrapper,
                    shipmentDetails: getUpdatedShipmentDetails(
                        cloneDeep(state.shipmentDetailsWrapper.shipmentDetails),
                        action.payload.updIndex,
                        action.payload.updKey,
                        action.payload.updVal
                    ),
                },
            };
        case UPDATE_MARSH_INSURANCE_INFO:
            return {
                ...state,
                marshInsuranceObj: {
                    ...state.marshInsuranceObj,
                    [action.payload.updKey]: action.payload.updValue,
                },
            };
        case UPDATE_UPSCAPITAL_INSURANCE_INFO:
            return {
                ...state,
                upsCapitalInsuranceObj: {
                        ...state.upsCapitalInsuranceObj,
                    [action.payload.updKey]: action.payload.updValue,
                },
            };   
        case UPDATE_PICK_UP_DETAILS_OBJ:
            return {
                ...state,
                pickupDetailsObj: {
                    ...state.pickupDetailsObj,
                    ...action.payload
                }
            }
        case UPDATE_PICK_UP_DETAILS_INFO:
            return {
                ...state,
                pickupDetailsObj: {
                    ...state.pickupDetailsObj,
                    [action.payload.updKey]: action.payload.updValue,
                },
            };

        case UPDATE_DELIVERY_DETAILS_OBJ:
            return {
                ...state,
                deliveryDetailsObj: {
                    ...state.deliveryDetailsObj,
                    ...action.payload
                }
            }
        case UPDATE_DELIVERY_DETAILS_INFO:
            return {
                ...state,
                deliveryDetailsObj: {
                    ...state.deliveryDetailsObj,
                    [action.payload.updKey]: action.payload.updValue,
                },
            };
        case UPDATE_BOL_TYPE_INFO:
            return {
                ...state,
                bolTypeObj: {
                    ...state.bolTypeObj,
                    [action.payload.updKey]: action.payload.updValue,
                    [action.payload.updKey === 'standard_toggle_button' ?
                        'VICS_insurance_toggle_button': 'standard_toggle_button']: !action.payload.updValue
                },
            };
        case UPDATE_SALES_PRICE_INFO:
            return {
                ...state,
                salesPriceObj: {
                    ...state.salesPriceObj,
                    [action.payload.updKey]: action.payload.updValue,
                },
            };
        case UPDATE_ADDITIONAL_INFO:
            return {
                ...state,
                additionalInfoObj: {
                    ...state.additionalInfoObj,
                    ...action.payload
                }
            }
        case UPDATE_HAZMAT:
            return {
                ...state,
                isHazmat: action.payload
            }
        case UPDATE_IS_VALIDATION_TRIGGERED:
            return {
                ...state,
                isValidationTriggered: action.payload
            }
        case UPDATE_IS_SECTION_VAL_TRIGGERED:
            return {
                ...state,
                isSectionValidationTriggered:
                    getUpdatedSectionValidationArr(
                        state.isSectionValidationTriggered, action.payload)
            }
        case UPDATE_VALID_SECTIONS:
            return {
                ...state,
                isValidSections:
                    getUpdatedValidSectionsArr(
                        state.isValidSections, action.payload)
            }
        case UPDATE_HIGHLIGHTED_TILL:
            return {
                ...state,
                highlightedTillSection: state.highlightedTillSection >= action.payload ?
                    state.highlightedTillSection : action.payload
            }
        case UPDATE_ADDRESS_BOOK_DATA:
            return {
                ...state,
                addressBookData: action.payload
            }
        case UPDATE_ADDRESS_BOOK_ENTRY:
            return  {
                ...state,
                addressBookData:
                    getUpdatedAddressBookData(state.addressBookData, action.payload)
            }
        case UPDATE_SEL_SHIPPER_ID:
            return {
                ...state,
                selectedShipperId: action.payload
            }
        case UPDATE_SEL_CONSIGNEE_ID:
            return {
                ...state,
                selectedConsigneeId: action.payload
            }
        case UPDATE_SHOW_ADDRESS_CHNG_CONF:
            return {
                ...state,
                showAddressChangeConf: action.payload
            }
        case UPDATE_IS_SHIPPER_CONS_INFO_CHNGD:
            return {
                ...state,
                isShipperConsInfoChanged: action.payload
            }
        case UPD_ERR_OBJ:
            return {
                ...state,
                errorObj: {
                    ...state.errorObj,
                    ...action.payload
                }
            }
        case UPD_BOL_OBJ:
            return {
                ...state,
                updBolObj: {
                    ...state.updBolObj,
                    ...action.payload
                }
            }
        case UPDATE_PRINTQUOTE_OBJ:
            return {
                ...state,
                printQuoteObj: {
                    ...state.printQuoteObj,
                    ...action.payload
                }
            }

        default:
            return {
                ...state,
            };
    }
};

const getUpdatedSectionValidationArr = (prevArr: boolean[], updValTillSection: number) => {
    return prevArr.map((valFlag: boolean, index: number) => {
        
        if (valFlag || (!valFlag && ((index+1) < updValTillSection))) {
            return true;
        } else {
            return false
        }
    })
};

const getUpdatedValidSectionsArr = (prevArr: boolean[], newValidSections: any[]) => {
    return prevArr.map((validFlag: boolean, index: number) => {
        const newValidSecObj = newValidSections.find(item => item.index === index+1);
        if (newValidSecObj) {
            return newValidSecObj.isValid;
        } else {
            return validFlag;
        }
    })
}


const delRefNumInRefInfo = (index: number, oldArr: string[]) => {
    oldArr.splice(index, 1);
    return oldArr;
};

const getUpdatedShipmentDetails = (
    shipmentData: ShipmentValues[],
    index: number,
    key: string,
    val: string
) => {
    shipmentData[index] = {
        ...shipmentData[index],
        [key]: val,
    };
    return shipmentData;
};

const getUpdatedAddressBookData = 
    (existingData: AddressBookEntry[], newDataObj: AddressBookEntry) => {
        const clonedExistingData = cloneDeep(existingData);
        const index = clonedExistingData.findIndex((item: AddressBookEntry) => 
            item.addressBookAddressId === newDataObj.addressBookAddressId);
        clonedExistingData[index] = newDataObj;
        return clonedExistingData;
    }
