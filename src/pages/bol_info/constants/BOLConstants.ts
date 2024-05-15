import { Moment } from "moment";

export const TOKEN = 'Authorization';
interface Map {
    [key: string]: string | number | boolean | object | null;
}

export interface Address extends Map {
    contactName: string;
    companyName: string;
    address1: string;
    address2: string;
    city: string;
    stateCode: string;
    postalCode: string;
    countryCode: string;
    phone: string;
    email: string;
}
export interface ShipperFormValues extends Map {
    shipperAddress: Address;
    shipperReferenceCode: string;
    consigneeAddress: Address;
    consigneeReferenceCode: string;

    shipper_toggle_button: boolean;
    consignee_toggle_button: boolean;
    consignee_addAddressBook_check: boolean;
    shipper_addAddressBook_check: boolean;
}

export interface ShipperRefMainValues extends Map {
    shipperNumber:string;
    poNumber:string;
    specialInstruction: string;
    accessorials: string;
    referenceNumbers:string[];

    releaseValue:string;
    // Hazmat Fields
    hazmatClass: string;
    hazmatType: string;
    hazmatUN: string;
    hazmatPackageGroup: string;
    hazmatPackageType: string;

}

export interface ShipperRefOtherValues extends Map {
    referenceNumbers:string;
}

export interface PackageDimensions extends Map {
    length: string;
    width: string;
    height: string;
}

export interface ShipmentValues extends Map {
    dimensions: PackageDimensions
    weight: string;
    commodityDescription: string;
    nmfcCode: string;
    classCode: string;
    reference: string;
    packageType: string;
    numberOfUnits: string;
    measurementType: string;
    hazmat: boolean;
}

export interface ShipmentDetailsValues extends Map {
    shipmentDetails: ShipmentValues[],
    description: string
}

export interface MarshInsuranceValues extends Map {
    totalPremiumAmount: string;
    marsh_insurance_toggle_button: boolean;
}
export interface UpsCapitalInsuranceObj extends Map {
    totalPremiumAmount: string;
    insurance_toggle_button: boolean;
}
export interface PickUpDetailsValues extends Map {
    pickupDate: string | null;
    pickupReadyTime: string | null;
    pickupCloseTime: string | null;
}

export interface DeliveryDetailsValues extends Map {
    deliveryDate: string | null;
    deliveryReadyTime: string | null;
    deliveryCloseTime: string | null;
}
export interface SalesPriceValues extends Map {
    sales_price: string;
}
export interface BOLTypeValues extends Map {
    standard_toggle_button: boolean;
    VICS_insurance_toggle_button: boolean;
}

export interface AdditionalInfoValues extends Map {
    uuid: string;
    billingTypeId: number;
    tariffDescription: string;
    transitTime: number;
    dutyTypeId: number;
    providerQuoteItemId: string;
    specialInstructions: string;
    carrierName: string;
    providerId: number;
    providerQuoteId: string;
    tariffId: string,
    franchiseCost: string;
}

export interface AddressBookEntry extends Map {
    addressBookAddressId: number;
    contactName: string;
    companyName: string;
    address1: string;
    address2: string;
    address3: string;
    city: string;
    stateCode: string;
    postalCode: string;
    phone: string;
    email: string;
    countryCode: string;
    department: string;
    fax: string;
    residential: boolean;
}


export const DATE_FORMAT = "mm/dd/yyyy";
export const DATE_DELIMITER = "/";

export interface ErrorObj extends Map {
    show: boolean;
    errorCode: string;
    errorMsg: string;
    contactName: string;
    deptName: string;
    phone: number;
    email: string;
}

export const DISPATCH_REQ_TIMEOUT = 80000; // in milliseconds
export const ERROR_MESSAGES = {
    ERROR_500: {
        errorCode: 500,
        errorMsg:"Server Error - Please contact your customer service representative.",
        contactName: "ABC",
        deptName: "Operations",
        phone: 99999999,
        email: "abc@in.com"
    },
}

export const WARNING_MESSAGES = {
    TIME_OUT: {
        errorCode: "Time Out",
        errorMsg: "The process took too long to complete and timed out. Please check your history to see if the " +
            "shipment has been processed as expected or contact your representative",
        contactName: "ABC",
        deptName: "Operations",
        phone: 99999999,
        email: "abc@in.com"
    },
    UNEXPECTED: {
        errorCode: "Unexpected response",
        errorMsg: "Please check your shipment details or contact your customer service representative.",
        contactName: "ABC",
        deptName: "Operations",
        phone: 99999999,
        email: "abc@in.com"
    }
}

export const EMPTY_STRING_VAL = "-";

export interface PostalCodeSearchRes extends Map {
    cityName: string;
    countryCode: string;
    countryName: string;
    id: number;
    postalCode: string;
    stateCode: string;
}

export interface QuoteAddress {
    countryCode: string;
    postalCode: string | undefined;
    stateCode: string | undefined;
    city: string | undefined;
}

export interface PrintDimentions extends Map {
    dimensions: PackageDimensions
    weight: string;
    classCode: string;
    nmfcCode: string;
    packageType: string;
    commodityDescription: string;
    numberOfUnits: string;
}
export interface QuoteObj extends Map {
    carrierName: string;
    tariffDescription: string;
    serviceType: string;
    quoteNumber: string;
    transitTime: string;
    price: number;
}
export interface PrintQuoteObj extends Map {
    quoteGenMoment: Moment;
    origin: QuoteAddress | null;
    destination: QuoteAddress | null;
    items: PrintDimentions[];
    units: number;
    totalCubic: number;
    totalPcf: number;
    totalWeight: number;
    accessorial: string;
    insuranceAmount: number | null;
    premiumAmount: any;
    quotes: QuoteObj[];
}

export interface PrintDispatchDataObj extends Map {
    carrierName: String;
    scacCode: String;
    carrierPhone: String;
    pickupDate: String;
    pickupReadyTime: String;
    pickupCloseTime: String;
    issuedBoLNumber: String;
    freightChangeTerms: String;
    shipperAddress: Address;
    consigneeAddress: Address;
    shipperNumber: String;
    poNumber: String;
    carrierQuote: String;
    billingRefCodeAcfBill: String;
    customer: String;
    referenceNumbers: String[];
    hazmatPackageType: String;
    billingRefCode: String;
    hazmatClass: String;
    hazmatType: String;
    hazmatPackageGroup: String;
    hazmatUN: String;
    specialInstructions: String;
    freightItems: ShipmentValues[];
    initialProNumber: String;
}

export interface TimePickerType {
  'label': string,
  'value': string
}
export const PICKUP_READY_TIME_OPTIONS: TimePickerType[] = [
    {
        label: '06:00',
        value: '06:00'
    },
    {
        label: '06:30',
        value: '06:30'
    },
    {
        label: '07:00',
        value: '07:00'
    },
    {
        label: '07:30',
        value: '07:30'
    },
    {
        label: '08:00',
        value: '08:00'
    },
    {
        label: '08:30',
        value: '08:30'
    },
    {
        label: '09:00',
        value: '09:00'
    },
    {
        label: '09:30',
        value: '09:30'
    },
    {
        label: '10:00',
        value: '10:00'
    },
    {
        label: '10:30',
        value: '10:30'
    },
    {
        label: '11:00',
        value: '11:00'
    },
    {
        label: '11:30',
        value: '11:30'
    },
    {
        label: '12:00',
        value: '12:00'
    },
    {
        label: '12:30',
        value: '12:30'
    },
    {
        label: '13:00',
        value: '13:00'
    },
    {
        label: '13:30',
        value: '13:30'
    },
    {
        label: '14:00',
        value: '14:00'
    },
    {
        label: '14:30',
        value: '14:30'
    },
    {
        label: '15:00',
        value: '15:00'
    },
    {
        label: '15:30',
        value: '15:30'
    },
    {
        label: '16:00',
        value: '16:00'
    },
    {
        label: '16:30',
        value: '16:30'
    },
    {
        label: '17:00',
        value: '17:00'
    },
    {
        label: '17:30',
        value: '17:30'
    },
    {
        label: '18:00',
        value: '18:00'
    },
    {
        label: '18:30',
        value: '18:30'
    },
    {
        label: '19:00',
        value: '19:00'
    },
]

export const PICKUP_CLOSE_TIME_OPTIONS: TimePickerType[] = [
    {
        label: '08:00',
        value: '08:00'
    },
    {
        label: '08:30',
        value: '08:30'
    },
    {
        label: '09:00',
        value: '09:00'
    },
    {
        label: '09:30',
        value: '09:30'
    },
    {
        label: '10:00',
        value: '10:00'
    },
    {
        label: '10:30',
        value: '10:30'
    },
    {
        label: '11:00',
        value: '11:00'
    },
    {
        label: '11:30',
        value: '11:30'
    },
    {
        label: '12:00',
        value: '12:00'
    },
    {
        label: '12:30',
        value: '12:30'
    },
    {
        label: '13:00',
        value: '13:00'
    },
    {
        label: '13:30',
        value: '13:30'
    },
    {
        label: '14:00',
        value: '14:00'
    },
    {
        label: '14:30',
        value: '14:30'
    },
    {
        label: '15:00',
        value: '15:00'
    },
    {
        label: '15:30',
        value: '15:30'
    },
    {
        label: '16:00',
        value: '16:00'
    },
    {
        label: '16:30',
        value: '16:30'
    },
    {
        label: '17:00',
        value: '17:00'
    },
    {
        label: '17:30',
        value: '17:30'
    },
    {
        label: '18:00',
        value: '18:00'
    },
    {
        label: '18:30',
        value: '18:30'
    },
    {
        label: '19:00',
        value: '19:00'
    },
    {
        label: '19:30',
        value: '19:30'
    },
    {
        label: '20:00',
        value: '20:00'
    },
    {
        label: '20:30',
        value: '20:30'
    },
    {
        label: '21:00',
        value: '21:00'
    },
]