import {
  CLOSE_BOL_DETAIL_MODAL,
  UPDATE_ADDITIONAL_INFO,
  UPDATE_HAZMAT,
  UPDATE_PICK_UP_DETAILS_OBJ,
  UPDATE_REFERENCE_OBJ,
  UPDATE_SALES_PRICE_INFO,
  UPDATE_SHIPMENT_DETAILS,
  UPDATE_SHIPPER_CONS_ADDRESS_BOOK_INFO,
  UPD_BOL_OBJ,
  CLOSE_FORWARDING_ROUTE,
  UPDATE_DELIVERY_DETAILS_OBJ
} from "actions";
import moment from "moment";
import { useEffect, useCallback } from "react";
import { FaClipboard } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { getBolDetails } from "./api/bol_api";
import { CancelSave } from "./bolform/CancelSaveButtonFunctionality";
import { InsuranceAndOtherDetails } from "./bolform/InsuranceAndOtherDetails";
import { ReferenceInfoWrapper } from "./bolform/ReferenceInfoWrapper";
import ShipperForm from "./bolform/ShipperForm";
import { ShippmentDetails } from "./bolform/ShippmentDetails";
import { ShipmentValues } from "./constants/BOLConstants";
import {useAccessorials} from "../get_pricing/filter_form/FilterFormQueries";
import { useForm, FormProvider } from "react-hook-form";

interface PropTypes {
  shipmentId: any;
  bolNumber: any;
  proNumber: any;
  isEditable: boolean;
  refetch: any;
  status: string;
}

const defaultValues = {
  is_stackable: false,
  specialInstruction: ""
};

type DefaultSettingFormTypes = {
  is_stackable: boolean,
  specialInstruction: string
}

export const BOLDetails = ({ shipmentId, bolNumber, proNumber, isEditable, refetch, status }: PropTypes) => {
  const dispatch = useDispatch();
  const { data: accessorialsObj } = useAccessorials();
  const formMethods = useForm<DefaultSettingFormTypes>({
    defaultValues: defaultValues,
  });

  const closeBolDetailModal = useCallback(()=> {
    dispatch({
      type: CLOSE_BOL_DETAIL_MODAL,
      payload: {
        showInfoBol: false
      }
    })
    dispatch({
      type: CLOSE_FORWARDING_ROUTE
    })
  }, [dispatch])
  useEffect(() => {
    if(accessorialsObj){
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
            referenceNumbers: res.data.referenceNumbers ? res.data.referenceNumbers : [],
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
            pickupReadyTime: res.data.readyTime.substring(0, 5),
            pickupCloseTime: res.data.closingTime.substring(0, 5)
          }
        });

        dispatch({
          type: UPDATE_DELIVERY_DETAILS_OBJ,
          payload: {
            deliveryDate: res.data.deliveryDate && !res.data.deliveryDate.startsWith("0001") ? moment(res.data.deliveryDate).format('MM/DD/yyyy') : null,
            deliveryReadyTime: res.data.deliveryReadyTime.substring(0, 5),
            deliveryCloseTime: res.data.deliveryCloseTime.substring(0, 5)
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
            providerQuoteItemId: res.data.providerQuoteItemId,
            specialInstructions: res.data.specialInstructions,
            providerQuoteId: res.data.providerQuoteId,
            uuid: res.data.uuid,
            carrierName: res.data.carrierName,
            tariffDescription: res.data.tariffDescription,
            franchiseCost: res.data.franchiseCost,
            transitTime: res.data.transitTime,
            providerId: res.data.providerId,
            serviceType: res.data.serviceType,
            tariffId: res.data.tariffId,
          }
        })
      });
    }
  }, [shipmentId, accessorialsObj, dispatch]);

  return (
    <FormProvider {...formMethods}>
      <div
        className="z-[1000] justify-center items-center flex modal fade fixed top-0 left-0 w-full h-full outline-none"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog w-[1000px] relative">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header bg-green-1 flex flex-shrink-0 items-center justify-between p-6 border-b border-gray-200 rounded-t-md">
              <h5
                className="font-medium leading-normal text-white"
                id="exampleModalLabel"
              >
                BOL DETAILS
              </h5>
              <MdCancel
                onClick={closeBolDetailModal}
                className="text-white bg-green-1 text-5xl cursor-pointer"
              />
            </div>
              <div className="col-span-12 overflow-y-scroll h-[600px] p-10 pt-0 text-lg">
                <div className="w-full flex mt-4">
                  <FaClipboard/><label className="font-bold text-2xl">{`BOL NUMBER------${bolNumber}`}</label>
                  <FaClipboard className="ml-3"/> <label className="font-bold text-2xl">{`PRO NUMBER-------${proNumber}`}</label>
                </div>
                <ShipperForm isBolDetail={true} />
                <ReferenceInfoWrapper isBolDetail={true} />
                <ShippmentDetails isBolDetail={true} />
                <InsuranceAndOtherDetails isBolDetail={true} />
                <CancelSave shipmentId={shipmentId} closeBolDialog={closeBolDetailModal} isEditable={isEditable} refetch={refetch} status={status}/>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};


