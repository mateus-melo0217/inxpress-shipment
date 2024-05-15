import {
  UPDATE_ADDITIONAL_INFO,
  UPDATE_SHIPMENT_DETAILS,
  UPDATE_SHIPPER_CONS_ADDRESS_MUL_INFO,
  UPDATE_HAZMAT,
  UPDATE_SEL_SHIPPER_ID,
  UPDATE_SEL_CONSIGNEE_ID,
  CLEAR_BOL_DATA,
  UPDATE_SHIPPER_CONS_ADDRESS_BOOK_INFO,
  UPDATE_REFERENCE_OBJ,
  UPDATE_PICK_UP_DETAILS_OBJ,
  UPDATE_DELIVERY_DETAILS_OBJ,
  UPDATE_SALES_PRICE_INFO,
  UPD_BOL_OBJ
} from "actions";
import moment from "moment";
import { FilterFormTypes } from "pages/get_pricing/filter_form/FilterFormTypes";
import { getBolDetails } from "../api/bol_api";
import { AddressBookEntry, ShipmentValues } from "../constants/BOLConstants";
import { cloneDeep } from "lodash";

export const dispatchPricingData = (data: FilterFormTypes,
  addressBookData: AddressBookEntry[], dispatch: Function, isAddedBookInfo:boolean, setIsAddedBookInfo:Function, shipperConsObj:any) => {
  dispatch({
      type: CLEAR_BOL_DATA
  });

  if(!isAddedBookInfo){
    
    const tempObj = cloneDeep(shipperConsObj);
    
    tempObj.consigneeAddress.companyName = "";
    tempObj.consigneeAddress.email = "";
    tempObj.consigneeAddress.address1 = "";
    tempObj.consigneeAddress.address2 = "";
    tempObj.consigneeAddress.contactName = "";
    tempObj.consigneeAddress.phone = "";
    tempObj.consigneeAddress.postalCode = "";
    tempObj.consigneeAddress.stateCode = "";
    tempObj.consigneeAddress.city = "";

    dispatch({
      type: UPDATE_SHIPPER_CONS_ADDRESS_BOOK_INFO,
      payload: tempObj,
    });
  }

  const selShipperAddressId = data.origin_address_id ? data.origin_address_id : 0;
  const selConsigneeAddressId = data.destination_address_id ? data.destination_address_id : 0;

  dispatchData(data, dispatch);
  if (selShipperAddressId !== 0 || selConsigneeAddressId !== 0) {

    const shipperAddressInfo = addressBookData.find((item: AddressBookEntry) => item.addressBookAddressId === selShipperAddressId);
    if (shipperAddressInfo) {
      dispatch({
        type: UPDATE_SEL_SHIPPER_ID,
        payload: selShipperAddressId
      });
      dispatch({
        type: UPDATE_SHIPPER_CONS_ADDRESS_MUL_INFO,
        payload: {
          shipperConsKey: "shipperAddress",
          data: createAddressDataObj(shipperAddressInfo)
        },
      });
    }
    const consigneeeAddressInfo = addressBookData.find((item: AddressBookEntry) => item.addressBookAddressId === selConsigneeAddressId);
    if (consigneeeAddressInfo) {
      dispatch({
        type: UPDATE_SEL_CONSIGNEE_ID,
        payload: selConsigneeAddressId
      });
      dispatch({
        type: UPDATE_SHIPPER_CONS_ADDRESS_MUL_INFO,
        payload: {
          shipperConsKey: "consigneeAddress",
          data: createAddressDataObj(consigneeeAddressInfo)
        },
      });
    }   

  }
}

const createAddressDataObj = (addressInfo: any) => {
  return {
    companyName: addressInfo.companyName,
    email: addressInfo.email,
    address1: addressInfo.address1,
    address2: addressInfo.address2,
    contactName: addressInfo.contactName,
    phone: addressInfo.phone.toString().replace(/ /g, '')
  }
}

export const dispatchData = (data: FilterFormTypes, dispatch: Function) => {
    dispatch({
        type: UPDATE_SHIPPER_CONS_ADDRESS_MUL_INFO,
        payload: {
          shipperConsKey: "shipperAddress",
          data: {
            city: data.origin_city,
            stateCode: data.origin_state,
            postalCode: data.origin_post_code,
            countryCode: data.origin_country.code,
            address1: data.origin_address1 ? data.origin_address1 : '',
            address2: data.origin_address2 ? data.origin_address2 : '',
            companyName: data.origin_companyName ? data.origin_companyName : '',
            contactName: data.origin_contactName ? data.origin_contactName : '',
            email: data.origin_email ? data.origin_email : '',
            phone: data.origin_phone ? data.origin_phone : ''
          }
        }
      });
      dispatch({
        type: UPDATE_SHIPPER_CONS_ADDRESS_MUL_INFO,
        payload: {
          shipperConsKey: "consigneeAddress",
          data: {
            city: data.destination_city,
            stateCode: data.destination_state,
            postalCode: data.destination_post_code,
            countryCode: data.destination_country.code,
            address1: data.destination_address1 ? data.destination_address1 : '',
            address2: data.destination_address2 ? data.destination_address2 : '',
            companyName: data.destination_companyName ? data.destination_companyName : '',
            contactName: data.destination_contactName ? data.destination_contactName : '',
            email: data.destination_email ? data.destination_email : '',
            phone: data.destination_phone ? data.destination_phone : ''
          }
        }
      });
      
      dispatch({
        type: UPDATE_SHIPMENT_DETAILS,
        payload: data.load_item?.map((loadInfo: any) => {
          return {
            dimensions: {
              length: loadInfo.dimension_length,
              width: loadInfo.dimension_width,
              height: loadInfo.dimension_height
            },
            weight: loadInfo.weight,
            commodityDescription: loadInfo.commodity.label,
            nmfcCode: loadInfo.commodity_nmfc,
            classCode: loadInfo.class.label,
            reference: "",
            packageType: loadInfo.type.label,
            numberOfUnits: loadInfo.units,
            measurementType: loadInfo.weight_unit.value === "Lbs" ? "IMPERIAL" : "METRIC",
            hazmat: loadInfo.is_hazmat
          }
        })     
      })
      let isHazmat = false;
      for (let i = 0; data.load_item && i<data.load_item.length; i++) {
        if (data.load_item[i].is_hazmat)  {
          isHazmat = true;
          break;
        }
      }
      dispatch({
        type: UPDATE_HAZMAT,
        payload: isHazmat
      });
}

export const dispatchAdditionalInfoData =
  (data: any, dispatch: Function) => {
    dispatch({
      type: UPDATE_ADDITIONAL_INFO,
      payload: data
    })
}

export const dispatchQuotePriceData =
  (salesPrice: any, dispatch: Function) => {
    dispatch({
      type: UPDATE_SALES_PRICE_INFO,
      payload: {
        updKey: 'sales_price',
        updValue: salesPrice
      }
    });
}

export const getBolDataByShipmentId = (shipmentId: number, accessorialsObj:any, dispatch: Function) => {
  
  getBolDetails(shipmentId).then(res => {
    dispatch({
      type: UPDATE_SHIPPER_CONS_ADDRESS_BOOK_INFO,
      payload: {
        shipperAddress: res.data.shipperAddress,
        shipperReferenceCode: res.data.shipperReferenceCode,
        shipper_toggle_button: res.data.sendBolToSender,
        consigneeAddress: res.data.consigneeAddress,
        consigneeReferenceCode: res.data.consigneeReferenceCode,
        consignee_toggle_button: res.data.sendBolToReceiver
      }
    });

    let isHazmat = false;
    for (let i = 0; res.data.freightItems && i<res.data.freightItems.length; i++) {
      if (res.data.freightItems[i].hazmat)  {
        isHazmat = true;
        break;
      }
    }
    dispatch({
      type: UPDATE_HAZMAT,
      payload: isHazmat
    });

    const accessorials = accessorialsObj.filter((item:any) => res.data.accessorials.includes(item.value)).map((item:any) => item.label);

    dispatch({
      type: UPDATE_REFERENCE_OBJ,
      payload: {
        shipperNumber: res.data.shipperNumber,
        poNumber: res.data.poNumber,
        specialInstruction: res.data.specialInstructions,
        accessorials: accessorials,
        referenceNumbers: res.data.referenceNumbers ? res.data.referenceNumbers : [""],
        releaseValue: res.data.releaseValue,
        hazmatClass: res.data.hazmatClass, 
        hazmatType: res.data.hazmatType, 
        hazmatUN: res.data.hazmatUN, 
        hazmatPackageGroup: res.data.hazmatPackageGroup, 
        hazmatPackageType: res.data.hazmatPackageType,
      }
    });
    
    dispatch({
      type: UPDATE_SHIPMENT_DETAILS,
      payload: res.data.freightItems?.map((loadInfo: ShipmentValues) => {
        return {
          dimensions: loadInfo.dimensions,
          weight: loadInfo.weight,
          commodityDescription: loadInfo.commodityDescription, 
          nmfcCode: loadInfo.nmfcCode,
          classCode: loadInfo.classCode,
          reference: loadInfo.reference,
          packageType: loadInfo.packageType,
          numberOfUnits: loadInfo.numberOfUnits,
          measurementType: loadInfo.measurementType === "Lbs" ? "IMPERIAL" : "METRIC",
          hazmat: loadInfo.hazmat
        }
      })     
    });

    dispatch({
      type: UPDATE_PICK_UP_DETAILS_OBJ,
      payload: {
        pickupDate: res.data.pickupDate && !res.data.pickupDate.startsWith("0001") ? moment(res.data.pickupDate).format('MM/DD/yyyy') : null,
        pickupReadyTime: res.data.pickupReadyTime,
        pickupCloseTime: res.data.pickupCloseTime
      }
    });

    dispatch({
      type: UPDATE_DELIVERY_DETAILS_OBJ,
      payload: {
        deliveryDate: res.data.deliveryDate && !res.data.deliveryDate.startsWith("0001") ? moment(res.data.deliveryDate).format('MM/DD/yyyy') : null,
        deliveryReadyTime: res.data.deliveryReadyTime,
        deliveryCloseTime: res.data.deliveryCloseTime
      }
    });

    dispatch({
      type: UPDATE_SALES_PRICE_INFO,
      payload: {
        updKey: 'sales_price',
        updValue: res.data.price
      }
    });

    dispatch({
      type: UPD_BOL_OBJ,
      payload: {
        shipperAddressId: res.data.shipperAddress.shipmentAddressId,
        consigneeAddressId: res.data.consigneeAddress.shipmentAddressId
      }
    });

    dispatch({
    type: UPDATE_ADDITIONAL_INFO,
    payload: {
      uuid: res.data.uuid,
      billingTypeId: res.data.billingTypeId,
      tariffDescription: res.data.tariffDescription,
      franchiseCost: res.data.franchiseCost,
      transitTime: res.data.transitTime,
      dutyTypeId: res.data.dutyTypeId,
      providerQuoteItemId: res.data.providerQuoteItemId,
      specialInstructions: res.data.specialInstructions,
      providerQuoteId: res.data.providerQuoteId,
      carrierName: res.data.carrierName,
      serviceType: res.data.serviceType,
      providerId: res.data.providerId,
      id: res.data.id,
      tariffId: res.data.tariffId,
    }
  });

  });
}