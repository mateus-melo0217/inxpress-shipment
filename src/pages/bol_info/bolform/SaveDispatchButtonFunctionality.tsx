import { IoMdSave } from "react-icons/io";
import { BsBoxSeam } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/globalstore";
import { dispatchBolInfo, printDispatchDataApi, printLabelApi, saveBolInfo } from "../api/bol_api";
import moment from "moment";
import { DispatchShipment } from "../common/DispatchShipmentOrder";
import { useState } from "react";
import { checkValidObject, valIsAddressDataChanged } from "../utility/Utility";
import { AddressBookEntry, ERROR_MESSAGES, WARNING_MESSAGES, ShipmentValues } from "../constants/BOLConstants";
import { CLEAR_BOL_DATA, CLOSE_DISPATCH_MENU_DIALOG_MODAL, UPDATE_IS_VALIDATION_TRIGGERED, UPDATE_SHOW_ADDRESS_CHNG_CONF, UPD_ERR_OBJ, INITIALIZE_STATE, CLOSE_FORWARDING_ROUTE } from "actions";
import { useNavigate } from "react-router-dom";
import { Overlay } from "../common/AddressBookDialog";
import { DispatchedOrderConfirmationDialog } from "../common/DispatchedOrderConfirmationDialog";
import { InputSchema } from 'utils/constants/Interfaces';
import { moveScroll } from 'utils/validateHelpers';
import spinningWheel from "assets/images/spinningWheel.svg";

export const SaveDispatch = (props: any) => {
  const {
    shipperConsObj,
    referenceObj,
    shipmentDetailsWrapper,
    pickupDetailsObj,
    deliveryDetailsObj,
    upsCapitalInsuranceObj,
    salesPriceObj,
    additionalInfoObj,
    selectedShipperId,
    selectedConsigneeId,
    addressBookData,
    isShipperConsInfoChanged
  } = useSelector((state: RootState) => state.bolInfoReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dispatchedBol, setDispatchedBol] = useState({
    shipmentId: "",
    issuedBoLNumber: "",
    initialProNumber: "",
    pickupNumber: "",
  });
  const [openDispatchDialog, setOpenDispatchDialog] = useState(false);
  const [openDispatchConfDialog, setDispatchConfDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateAddressDataSave = () => {
    let isDataChanged = false;
    if (selectedShipperId !== 0) {
      isDataChanged = valIsAddressDataChanged(
        addressBookData.find(
          (item: AddressBookEntry) => item.addressBookAddressId === selectedShipperId
        ),
        shipperConsObj.shipperAddress
      );
      dispatch({
        type: UPDATE_SHOW_ADDRESS_CHNG_CONF,
        payload: isDataChanged
      });
    }

    if (!isDataChanged && selectedConsigneeId !== 0) {
      isDataChanged = valIsAddressDataChanged(
        addressBookData.find(
          (item: AddressBookEntry) => item.addressBookAddressId === selectedConsigneeId
        ),
        shipperConsObj.consigneeAddress
      );
      dispatch({
        type: UPDATE_SHOW_ADDRESS_CHNG_CONF,
        payload: isDataChanged
      });
    }
    return isDataChanged;
  }

  const saveBolData = () => {

    const reqObjForSave = getReqObjForSave();
    if( props.isAdmin > Number(reqObjForSave.price) ) {
      props.setIsValidatePrice(false);
      props.setIsChanged(false)
      return;
    }
    props.setIsValidatePrice(true)
    props.setIsChanged(true)
    setIsLoading(true);
    
    if (!(isShipperConsInfoChanged && validateAddressDataSave())) {
      saveBolInfo(getReqObjForSave()).then(() => {
        dispatch({
        type: CLEAR_BOL_DATA
        })
        setIsLoading(false);
        navigate("/freight_history");
        dispatch({
        type: CLOSE_DISPATCH_MENU_DIALOG_MODAL,
        payload: {
        showDispatchMenuDialog: false
        }
        })
        props.refetch();
        dispatch({
          type: CLOSE_FORWARDING_ROUTE
        })
        dispatch({
          type: INITIALIZE_STATE,
        })    
      });
    }
  };

  const dispatchBolData = () => {
    setIsLoading(true);
    const bolInfo = getReqObjForSave();
    const insurance_toggle_status = upsCapitalInsuranceObj.insurance_toggle_button;
    const bolInfoWithInsurance = insurance_toggle_status ? {
      ...bolInfo,
      totalPremiumAmount: upsCapitalInsuranceObj.totalPremiumAmount,
    } : bolInfo;
     
    dispatchBolInfo(bolInfoWithInsurance).then((res: any) => {      
      printLabel(res.data.id, res.data.issuedBoL.customerBolNumber);
      printDispatchDataApi(res.data.id, res.data.issuedBoL.customerBolNumber);     
      setDispatchedBol({
        ...dispatchedBol,
        shipmentId: res.data.id,
        issuedBoLNumber: res.data.issuedBoL.customerBolNumber ? res.data.issuedBoL.customerBolNumber : "Bill of Lading number is not available yet",
        initialProNumber: res.data.initialProNumber,
        pickupNumber: res.data.issuedBoL.pickupNumber ? res.data.issuedBoL.pickupNumber : "Pick up number is not available yet",
      });
      setIsLoading(false);    
      setDispatchConfDialog(true);
    }).catch(error => {
      if (error.code === 'ECONNABORTED') {
          dispatch({
              type: UPD_ERR_OBJ,
              payload: {
                  show: true,
                  ...WARNING_MESSAGES.TIME_OUT
              }   
          })
      } else if (error.response && error.response.status === 500) {
          dispatch({
              type: UPD_ERR_OBJ,
              payload: {
                  show: true,
                  ...ERROR_MESSAGES.ERROR_500
              }
          })
      } else {
          dispatch({
              type: UPD_ERR_OBJ,
              payload: {
                  show: true,
                  ...WARNING_MESSAGES.UNEXPECTED
              }
          })
      }
      setIsLoading(false);
    });
    setOpenDispatchDialog(!openDispatchDialog);            
  };

  const validateData = (dataObjArr: any[]) => {
    let isValid = true;
    for (let i = 0; i < dataObjArr.length; i++) {
      isValid = checkValidObject(dataObjArr[i].data, dataObjArr[i].skipKeys);
      if (!isValid) {
        break;
      }
    }
    return isValid;
  };
  
  const scrollBeforeDispatch = () => {
    const inputData: InputSchema[] = [
      { id: 'shipperCompanyName', label: 'Shipper Company Name' },
      { id: 'shipperEmail', label: 'Shipper Company Email' },
      { id: 'shipperAddress1', label: 'Shipper Address 1' },
      { id: 'shipperContactName', label: 'Shipper Contact Name' },
      { id: 'shipperPhone', label: 'Shipper Phone' },
      { id: 'consigneeCompanyName', label: 'Consignee Company Name' },
      { id: 'consigneeEmail', label: 'consignee Company Email' },
      { id: 'consigneeAddress1', label: 'Consignee Address 1' },
      { id: 'consigneeContactName', label: 'Consignee Contact Name' },
      { id: 'consigneePhone', label: 'Consignee Phone' },
    ];
    
    if(props.isModal){
      moveScroll(inputData, 'bol_detail_modal_content');
    }
    else{
      moveScroll(inputData, '');
    }
  }

  const validateBeforeDispatch = () => {

    const reqObjForSave = getReqObjForSave();
    if( props.isAdmin > Number(reqObjForSave.price) ) {
      props.setIsValidatePrice(false);
      props.setIsChanged(false)
      return;
    }
    props.setIsValidatePrice(true)
    props.setIsChanged(true)

    scrollBeforeDispatch();
    if (!(isShipperConsInfoChanged && validateAddressDataSave())) {
      const shipperConsSkipKeysList = ["address2", "address3", "addressBookAddressId",
        "countryCode", "department", "fax", "residential", "salutation"];
      const isValid = validateData([
        {
          data: shipperConsObj,
          skipKeys: ["shipperAddress", "consigneeAddress", "shipperReferenceCode", "consigneeReferenceCode"],
        },
        { data: shipperConsObj.shipperAddress, skipKeys: shipperConsSkipKeysList },
        { data: shipperConsObj.consigneeAddress, skipKeys: shipperConsSkipKeysList },
        ...shipmentDetailsWrapper.shipmentDetails.map((item: ShipmentValues) => ({
          data: { commodityDescription: item.commodityDescription, nmfc: item.nmfcCode },
          skipKeys: [],
        })),
        { data: pickupDetailsObj, skipKeys: [] },
      ]);

      if (isValid) {
        dispatch({
          type: UPDATE_IS_VALIDATION_TRIGGERED,
          payload: false,
        });
        setOpenDispatchDialog(!openDispatchDialog);
      } else {
        dispatch({
          type: UPDATE_IS_VALIDATION_TRIGGERED,
          payload: true,
        });
      }
    }
  };

  const getReqObjForSave = () => {
    const pickedDate = props.rePickDate ? props.rePickDate : pickupDetailsObj.pickupDate
    const price = props.price ? props.price : salesPriceObj.sales_price

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
      shipperAddress: { ...shipperConsObj.shipperAddress, residential: false },
      saveShipperAddress: shipperConsObj.shipper_addAddressBook_check,
      consigneeReferenceCode: shipperConsObj.consigneeReferenceCode,
      consigneeAddress: {
        ...shipperConsObj.consigneeAddress,
        residential: false,
      },
      saveConsigneeAddress: shipperConsObj.consignee_addAddressBook_check,
      freightItems: shipmentDetailsWrapper.shipmentDetails,
    
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
      price: price,
      hazmatClass: referenceObj.hazmatClass,
      hazmatType: referenceObj.hazmatType,
      hazmatUN: referenceObj.hazmatUN,
      hazmatPackageGroup: referenceObj.hazmatPackageGroup,
      hazmatPackageType: referenceObj.hazmatPackageType,

      insuranceTermsConditions: upsCapitalInsuranceObj.insurance_toggle_button,

      uuid: additionalInfoObj.uuid,
      billingTypeId: additionalInfoObj.billingTypeId,
      tariffDescription: additionalInfoObj.tariffDescription,
      tariffId: additionalInfoObj.tariffId,
      accessorial: props.accessorial,
      transitTime: additionalInfoObj.transitTime,
      dutyTypeId: additionalInfoObj.dutyTypeId,
      providerQuoteItemId: additionalInfoObj.providerQuoteItemId,
      providerQuoteId: additionalInfoObj.providerQuoteId,
      carrierName: additionalInfoObj.carrierName,
      serviceType: additionalInfoObj.serviceType,
      providerId: additionalInfoObj.providerId,
      id: additionalInfoObj.id,
      franchiseCost: additionalInfoObj.franchiseCost,
    };
  };


  const printLabel = (shipmentId: any, fileName: any) => {
      printLabelApi(shipmentId, fileName);
  };


  return (
    <main>
      <div className="w-full justify-center flex gap-16 mt-20">
        {openDispatchDialog ? (
          <>
            <Overlay />
            <DispatchShipment
              onDispatchClicked={dispatchBolData}
              onDialogClose={() => setOpenDispatchDialog(!openDispatchDialog)} 
            />
          </>
        ) : (
          <></>
        )}

          {isLoading ? (
            <>
            <Overlay />
            <div className="fixed top-0 left-0 h-screen w-full flex items-center justify-center">
              <div role="status">
                <img src={spinningWheel} className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" alt="Loading..." />
                <span className="sr-only">Loading...</span>
              </div>
            </div>
            </>) : 
            (<></>)
          }

        {openDispatchConfDialog ? (
          <>
            <Overlay />
            <DispatchedOrderConfirmationDialog            
              issuedBoLNumber = {dispatchedBol.issuedBoLNumber}
              pickupNumber = {dispatchedBol.pickupNumber}
              onDialogClose={() => {
                setDispatchConfDialog(false)
                navigate("/freight_history");
                dispatch({
                  type: INITIALIZE_STATE,
                })
                dispatch({
                type: CLOSE_DISPATCH_MENU_DIALOG_MODAL,
                payload: {
                showDispatchMenuDialog: false
                }
                })
              }}
            />
          </>
        ) : (
          <></>
        )}

        <button
          type="button"
          className="btn btn-primary relative border-solid border-blue-1 border w-40 h-16 justify-center text-center rounded-md text-blue-1 bg-white"
        >
          <div
            className="w-full justify-center gap-3 flex mt-5"
            onClick={()=>saveBolData()}
          >
            <label className="mb-4 text-lg text-start cursor-pointer">
              SAVE
            </label>
            <IoMdSave className="justify-items-end cursor-pointer" />
          </div>
        </button>
        <button
          type="button"
          className="btn btn-primary relative w-48 h-16 justify-center text-center border rounded-md text-white bg-green-1"
        >
          <div
            className="w-full justify-center gap-3 flex mt-5"
            onClick={()=>validateBeforeDispatch()}
          >
            <label className="mb-4 text-lg relative text-center cursor-pointer">
              DISPATCH
            </label>
            <BsBoxSeam className="relative text-center cursor-pointer" />
          </div>
        </button>
      </div>
    </main>
  );
};
