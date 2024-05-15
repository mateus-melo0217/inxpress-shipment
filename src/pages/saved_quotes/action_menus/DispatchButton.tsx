import { OPEN_FORWARDING_ROUTE } from "actions";
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/globalstore";
import moment from "moment";
import { saveBolInfo } from "../../bol_info/api/bol_api";

interface PropTypes {
    row: any;
    options: { label: string, is_active: boolean };
    ind: number;
    setItemInd: Function;
    setIsSaving: Function;
}

const getReqObjOnSavedQuotes = (additionalInfoObj: any, referenceObj: any, shipperConsObj: any, quotesObj: any, pickupDetailsObj: any, deliveryDetailsObj: any, printQuoteObj: any) => {
  const pickedDate = pickupDetailsObj.pickupDate;
  const freightItemsList:any = [];
  freightItemsList.push(additionalInfoObj.freightItems);

  // get the additional information - country, city, state, zip_code
  const selectedQuote = quotesObj.quotes.find((quote: any) => {
    return quote.uuid === quotesObj.selectedIndex;
  });    

  const addedOriginInfo = {
    countryCode:selectedQuote.originCountry,
    city:selectedQuote.originCity,
    stateCode:selectedQuote.originState,
    postalCode:selectedQuote.originAddressCode,
  }
  const addedDestinationInfo = {
    countryCode:selectedQuote.destinationCountry,
    city:selectedQuote.destinationCity,
    stateCode:selectedQuote.destinationState,
    postalCode:selectedQuote.destinationAddressCode,
  }

  const deliveryInformation = {
    deliveryDate: deliveryDetailsObj.deliveryDate ? moment
      .utc(deliveryDetailsObj.deliveryDate, "MM/DD/yyyy")
      .format('YYYY-MM-DD HH:mm:ss') : null,
    deliveryReadyTime: deliveryDetailsObj.deliveryDate && deliveryDetailsObj.deliveryReadyTime ? moment
      .utc(
        `${deliveryDetailsObj.deliveryDate} ${deliveryDetailsObj.deliveryReadyTime}`,
        "MM/DD/yyyy h:mm A").format('YYYY-MM-DD HH:mm:ss') : null,
    deliveryCloseTime: deliveryDetailsObj.deliveryDate && deliveryDetailsObj.deliveryCloseTime ? moment
      .utc(
        `${deliveryDetailsObj.deliveryDate} ${deliveryDetailsObj.deliveryCloseTime}`,
        "MM/DD/yyyy h:mm A").format('YYYY-MM-DD HH:mm:ss') : null,
  }

  return {
    poNumber: referenceObj.poNumber,
    shipperNumber: referenceObj.shipperNumber,
    shipperReferenceCode: shipperConsObj.shipperReferenceCode,
    shipperAddress: { ...shipperConsObj.shipperAddress, residential: false, ...addedOriginInfo },
    consigneeReferenceCode: shipperConsObj.consigneeReferenceCode,
    consigneeAddress: {
      ...shipperConsObj.consigneeAddress,
      residential: false,
      ...addedDestinationInfo
    },
    pickupDate: pickedDate ? moment
      .utc(pickedDate, "MM/DD/yyyy")
      .format('YYYY-MM-DD HH:mm:ss') : "0001-01-01 00:00:00",
    pickupReadyTime: pickupDetailsObj.pickupReadyTime ? moment
      .utc(
        `${pickedDate} ${pickupDetailsObj.pickupReadyTime}`,
        "MM/DD/yyyy h:mm A").format('YYYY-MM-DD HH:mm:ss') : "0001-01-01 00:00:00",
    pickupCloseTime: pickupDetailsObj.pickupCloseTime ? moment
      .utc(
        `${pickedDate} ${pickupDetailsObj.pickupCloseTime}`,
        "MM/DD/yyyy h:mm A").format('YYYY-MM-DD HH:mm:ss') : "0001-01-01 00:00:00",
    ...(deliveryDetailsObj.deliveryDate ? deliveryInformation : {}),
    transactionTime : moment().format('YYYY-MM-DD HH:mm:ss'),    
    releaseValue: referenceObj.releaseValue,
    sendBolToSender: shipperConsObj.shipper_toggle_button,
    sendBolToReceiver: shipperConsObj.consignee_toggle_button,
    sendLabelToSender: shipperConsObj.shipper_toggle_button,
    sendLabelToReceiver: shipperConsObj.consignee_toggle_button,
    specialInstructions: additionalInfoObj.specialInstructions != null ?  `${additionalInfoObj.specialInstructions} ${referenceObj.specialInstruction}` : referenceObj.specialInstruction,
    referenceNumbers: referenceObj.referenceNumbers,
    hazmatClass: referenceObj.hazmatClass,
    hazmatType: referenceObj.hazmatType,
    hazmatUN: referenceObj.hazmatUN,
    hazmatPackageGroup: referenceObj.hazmatPackageGroup,
    hazmatPackageType: referenceObj.hazmatPackageType,
    uuid: additionalInfoObj.uuid,
    price: parseFloat(additionalInfoObj.price?.replace(",", "")),
    freightItems: freightItemsList,
    billingTypeId: additionalInfoObj.billingTypeId,
    tariffDescription: additionalInfoObj.tariffDescription,
    franchiseCost: additionalInfoObj.franchiseCost,
    tariffId: additionalInfoObj.tariffId,
    accessorial: printQuoteObj.accessorial,
    transitTime: additionalInfoObj.transitTime,
    dutyTypeId: additionalInfoObj.dutyTypeId,
    providerQuoteItemId: additionalInfoObj.providerQuoteItemId,
    providerQuoteId: additionalInfoObj.providerQuoteId,
    carrierName: additionalInfoObj.carrierName,
    serviceType: additionalInfoObj.serviceType,
    providerId: additionalInfoObj.providerId,
    id: additionalInfoObj.id,
  };
};

export const DispatchButton = ({ row, options, ind, setItemInd, setIsSaving }: PropTypes) => {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const {
    shipperConsObj,
    referenceObj,
    additionalInfoObj,
    quotesObj,
    pickupDetailsObj,
    deliveryDetailsObj,
    printQuoteObj
  } = useSelector((state: RootState) => state.bol_InfoReducer);

  const handleDispatchAction = useCallback(()=> {
    setItemInd(ind)
    setIsClicked(true)
    setIsSaving(true)
  }, [ind, setItemInd, setIsSaving])

  useEffect(()=>{
    if(isClicked && additionalInfoObj.uuid){
      const reqPayload = getReqObjOnSavedQuotes(additionalInfoObj, referenceObj, shipperConsObj, quotesObj, pickupDetailsObj, deliveryDetailsObj, printQuoteObj)
      saveBolInfo(reqPayload).then(() => {
        setIsClicked(false)
        setIsSaving(false)
        navigate("/freight_history");
        dispatch({
          type: OPEN_FORWARDING_ROUTE
        })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isClicked, additionalInfoObj])

  return (
    <>
      <div
        className={`flex items-center justify-center text-blue-1 p-3 font-medium text-sbase transition-all duration-200 ${
          options.is_active
            ? "hover:text-green-1 cursor-pointer"
            : "opacity-20 cursor-default"
        }`}
        onClick={options.is_active ? handleDispatchAction : () => {
        }}
      >
        <BsFillArrowRightSquareFill size="1.3em" className="mr-3"/>
        {options.label}
      </div>
    </>
  );
};