import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/globalstore";
import { saveBolInfo } from "../api/bol_api";
import moment from "moment";
import { CLEAR_BOL_DATA } from "actions";
import { ClipLoader } from "react-spinners";
import { toast } from 'react-toastify';
import {PENDIND_DISPATCH} from '../../../utils/constants/BOL'

export const CancelSave = (props: any) => {
  const {
    shipperConsObj,
    referenceObj,
    shipmentDetailsWrapper,
    pickupDetailsObj,
    salesPriceObj,
    additionalInfoObj
  } = useSelector((state: RootState) => state.bolInfoReducer);
  const [isUpdating, setIsUpdating] = useState(false)
  const dispatch = useDispatch();

  const updateBolData = () => {
    setIsUpdating(true)
    saveBolInfo(getReqObjForSave()).then(() => {
      dispatch({
        type: CLEAR_BOL_DATA
      })
      setIsUpdating(false)
      props.closeBolDialog();
      props.refetch();
      toast.success('Bol Details Updated Successfully');
    });
  };

  const cancelBolData = () => {
    props.closeBolDialog();
  }

  const getReqObjForSave = () => {
    return {
      id: props.shipmentId,
      poNumber: referenceObj.poNumber,
      shipperNumber: referenceObj.shipperNumber,
      shipperReferenceCode: shipperConsObj.shipperReferenceCode,
      shipperAddress: { ...shipperConsObj.shipperAddress, residential: false },
      consigneeReferenceCode: shipperConsObj.consigneeReferenceCode,
      consigneeAddress: {
        ...shipperConsObj.consigneeAddress,
        residential: false,
      },
      freightItems: shipmentDetailsWrapper.shipmentDetails,
      pickupDate: moment
        .utc(pickupDetailsObj.pickupDate, "MM/DD/yyyy")
        .format('YYYY-MM-DD HH:mm:ss'),
      pickupReadyTime: moment
        .utc(
          `${pickupDetailsObj.pickupDate} ${pickupDetailsObj.pickupReadyTime}`,
          "MM/DD/yyyy h:mm A"
        )
        .format('YYYY-MM-DD HH:mm:ss'),
      pickupCloseTime: moment
        .utc(
          `${pickupDetailsObj.pickupDate} ${pickupDetailsObj.pickupCloseTime}`,
          "MM/DD/yyyy h:mm A"
        )
        .format('YYYY-MM-DD HH:mm:ss'),
      transactionTime : moment().format('YYYY-MM-DD HH:mm:ss'),
      releaseValue: referenceObj.releaseValue,
      sendBolToSender: shipperConsObj.shipper_toggle_button,
      sendBolToReceiver: shipperConsObj.consignee_toggle_button,
      sendLabelToSender: shipperConsObj.shipper_toggle_button,
      sendLabelToReceiver: shipperConsObj.consignee_toggle_button,
      specialInstructions: referenceObj.specialInstruction,
      referenceNumbers: referenceObj.referenceNumbers,
      price: salesPriceObj.sales_price,
      hazmatClass: referenceObj.hazmatClass,
      hazmatType: referenceObj.hazmatType,
      hazmatUN: referenceObj.hazmatUN,
      hazmatPackageGroup: referenceObj.hazmatPackageGroup,
      hazmatPackageType: referenceObj.hazmatPackageType,

      uuid: additionalInfoObj.uuid,
      billingTypeId: additionalInfoObj.billingTypeId,
      tariffDescription: additionalInfoObj.tariffDescription,
      franchiseCost: additionalInfoObj.franchiseCost,
      transitTime: additionalInfoObj.transitTime,
      tariffId: additionalInfoObj.tariffId,
      dutyTypeId: additionalInfoObj.dutyTypeId,
      providerQuoteItemId: additionalInfoObj.providerQuoteItemId,
      providerQuoteId: additionalInfoObj.providerQuoteId,
      carrierName: additionalInfoObj.carrierName,
      serviceType: additionalInfoObj.serviceType,
      providerId: additionalInfoObj.providerId,
    };
  };

  return (
    <main>
      <div className="w-full justify-center flex gap-16 mt-20">
        <button
          type="button"
          className="btn btn-primary relative border-solid border-blue-1 border w-40 h-16 justify-center text-center rounded-md text-blue-1 bg-white"
        >
          <div
            className="w-full justify-center gap-3 flex mt-5"
            onClick={cancelBolData}
          >
            <label className="mb-4 text-lg text-start cursor-pointer">
              CLOSE
            </label>
          </div>
        </button>
        { props.status === PENDIND_DISPATCH &&  
          ( <button
            type="button"
            className={`btn btn-primary relative w-48 h-16 justify-center text-center border rounded-md text-white ${props.isEditable ? 'cursor-pointer bg-blue-1': 'cursor-not-allowed bg-light-gray'}`}
            disabled={!props.isEditable}
            onClick={props.isEditable ? updateBolData : ()=>{}}
          >
            <div
              className={`w-full justify-center gap-3 flex ${isUpdating ? '' : 'mt-5'}`}
            >
              <label className={`text-lg relative text-center ${props.isEditable ? 'cursor-pointer' : 'cursor-not-allowed'} ${isUpdating ? '': 'mb-4'}`}>
                {isUpdating ? 
                    <ClipLoader
                        loading={isUpdating}
                        size={30}
                        aria-label='Loading Spinner'
                        data-testid='loader'
                        color="white"
                    /> : 'SAVE BOL'}
              </label>
            </div>
          </button>)
        }
   
      </div>
    </main>
  );
};
