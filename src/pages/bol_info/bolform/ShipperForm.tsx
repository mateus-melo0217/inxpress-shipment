import { useEffect, useState, useCallback } from "react";
import { LinkIconLabel } from "components/common/navigation/Links/LinkIconLabel/LinkIconLabel";
import { toast } from "react-toastify";
import { ImCancelCircle } from "react-icons/im";
import { IoIosPerson, IoMdSave } from "react-icons/io";
import { TextField } from "components/bol_components/TextField";
import { ToggleSwitch } from "../../../components/bol_components/ToggleSwitch";
import { CheckBox } from "../../../components/bol_components/CheckBox";
import { AddressBookDialog, Overlay } from "../common/AddressBookDialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/globalstore";
import {
  UPDATE_ADDRESS_BOOK_ENTRY,
  UPDATE_IS_SHIPPER_CONS_INFO_CHNGD,
  UPDATE_SEL_CONSIGNEE_ID,
  UPDATE_SEL_SHIPPER_ID,
  UPDATE_SHIPPER_CONS_ADDRESS_BOOK_INFO,
  UPDATE_SHIPPER_CONS_ADDRESS_INFO,
  UPDATE_SHIPPER_CONS_OTHER_INFO,
  UPDATE_SHOW_ADDRESS_CHNG_CONF,
  UPD_ERR_OBJ,
} from "actions";
import { AddressBookEntry, ErrorObj } from "../constants/BOLConstants";
import { ConfirmationDialog } from "../common/ConfirmationDialog";
import { updateAddressBookData } from "../api/bol_api";
import { MessageCnfDialog } from "../common/MessageCnfDialog";
import { HiOutlineRefresh } from "react-icons/hi";
import { ErrorDialog } from "../common/ErrorDialog";
import { FaInfoCircle } from "react-icons/fa";
import { cloneDeep, isEmpty } from "lodash";

interface TempData {
  key: string;
  value: string | number;
}

const ShipperForm = (props: any) => {

  const shipperConsObj = useSelector(
    (state: RootState) => state.bolInfoReducer.shipperConsObj
  );

  const populationObj = useSelector(
    (state: RootState) => state.freightHistoryInfoReducer.populationObj
  );
  
  const [openAddressChangeDialog, setOpenAddressChangeDialog] = useState(false);

  const [tempData, setTempData] = useState<TempData[]>([]);
  const isValidationTriggered = useSelector(
    (state: RootState) => state.bolInfoReducer.isValidationTriggered
  );
  const isSectionValidationTriggered = useSelector(
    (state: RootState) => state.bolInfoReducer.isSectionValidationTriggered
  );

  const showAddressChangeConf = useSelector(
    (state: RootState) => state.bolInfoReducer.showAddressChangeConf
  );
  const isShipperConsInfoChanged = useSelector(
    (state: RootState) => state.bolInfoReducer.isShipperConsInfoChanged
  );
  const selectedShipperId = useSelector(
    (state: RootState) => state.bolInfoReducer.selectedShipperId
  );
  const selectedConsigneeId = useSelector(
    (state: RootState) => state.bolInfoReducer.selectedConsigneeId
  );
  const addressBookData = useSelector(
    (state: RootState) => state.bolInfoReducer.addressBookData
  );
  const errorObj: ErrorObj = useSelector(
    (state: RootState) => state.bolInfoReducer.errorObj
  );

  const showError = (msg: string) => {
    toast.error(msg, {
      icon: <ImCancelCircle size="6em" color={"#E74C3B"} title="Volume" />,
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const [isShipperAddressBookOpen, setShipperAddressBookOpen] = useState(false);
  const [isConsigneeAddressBookOpen, setConsigneeAddressBookOpen] =
    useState(false);

  const [msgCnfrmIsOpen, setMsgCnfrmIsOpen] = useState(false);

  const openAddressBook = (isShipper: boolean) => {
    if (isShipper) {
      setShipperAddressBookOpen(true);
    } else {
      setConsigneeAddressBookOpen(true);
    }
  };

  const addAddressBookInfo = (
    isShipperInfo: boolean,
    addressInfo: AddressBookEntry
  ) => {
    const tempObj = cloneDeep(shipperConsObj);
    if (isShipperInfo) {
      const isShipperKeyFieldsChanged: boolean =
        (addressInfo.postalCode !== shipperConsObj.shipperAddress.postalCode ||
          addressInfo.stateCode !== shipperConsObj.shipperAddress.stateCode ||
          addressInfo.city !== shipperConsObj.shipperAddress.city);
      if (props.isBolDetail && isShipperKeyFieldsChanged) {
        showError("Not allowed");
        setShipperAddressBookOpen(false);
        return;
      }

      tempObj.shipperAddress.companyName = addressInfo.companyName;
      tempObj.shipperAddress.email = addressInfo.email;
      tempObj.shipperAddress.address1 = addressInfo.address1;
      tempObj.shipperAddress.address2 = addressInfo.address2;
      tempObj.shipperAddress.postalCode = addressInfo.postalCode;
      tempObj.shipperAddress.stateCode = addressInfo.stateCode;
      tempObj.shipperAddress.city = addressInfo.city;
      tempObj.shipperAddress.contactName = addressInfo.contactName;
      tempObj.shipperAddress.phone = addressInfo.phone.toString().replace(/[\s-]/g, "");

      if (isShipperKeyFieldsChanged) {
        const updInfoArr: TempData[] = [];
        updInfoArr.push({ key: 'origin_state', value: addressInfo.stateCode });
        updInfoArr.push({ key: 'origin_city', value: addressInfo.city });
        updInfoArr.push({ key: 'origin_post_code', value: addressInfo.postalCode });
        updInfoArr.push({ key: 'origin_address_id', value: addressInfo.addressBookAddressId });

        dispatch({
          type: UPDATE_SEL_SHIPPER_ID,
          payload: addressInfo.addressBookAddressId,
        });

        setTempData(updInfoArr);
        setOpenAddressChangeDialog(true);
      } else {        
        dispatch({
          type: UPDATE_SHIPPER_CONS_ADDRESS_BOOK_INFO,
          payload: tempObj,
        });
      }
    } else {
      const isConsKeyFieldsChanged: boolean =
        (addressInfo.postalCode !== shipperConsObj.consigneeAddress.postalCode ||
          addressInfo.stateCode !== shipperConsObj.consigneeAddress.stateCode ||
          addressInfo.city !== shipperConsObj.consigneeAddress.city);
      if (props.isBolDetail && isConsKeyFieldsChanged) {
        showError("Not allowed");
        setConsigneeAddressBookOpen(false);
        return;
      }
      tempObj.consigneeAddress.companyName = addressInfo.companyName;
      tempObj.consigneeAddress.email = addressInfo.email;
      tempObj.consigneeAddress.address1 = addressInfo.address1;
      tempObj.consigneeAddress.address2 = addressInfo.address2;
      tempObj.consigneeAddress.postalCode = addressInfo.postalCode;
      tempObj.consigneeAddress.stateCode = addressInfo.stateCode;
      tempObj.consigneeAddress.city = addressInfo.city;
      tempObj.consigneeAddress.contactName = addressInfo.contactName;
      tempObj.consigneeAddress.phone = addressInfo.phone.toString().replace(/[\s-]/g, "");
      
      if (isConsKeyFieldsChanged) {
        const updInfoArr: TempData[] = [];
        updInfoArr.push({ key: 'destination_state', value: addressInfo.stateCode });
        updInfoArr.push({ key: 'destination_city', value: addressInfo.city });
        updInfoArr.push({ key: 'destination_post_code', value: addressInfo.postalCode });
        updInfoArr.push({ key: 'destination_address_id', value: addressInfo.addressBookAddressId });

        dispatch({
          type: UPDATE_SEL_CONSIGNEE_ID,
          payload: addressInfo.addressBookAddressId,
        });

        setTempData(updInfoArr);
        setOpenAddressChangeDialog(true);
      } else {
        dispatch({
          type: UPDATE_SHIPPER_CONS_ADDRESS_BOOK_INFO,
          payload: tempObj,
        });
      }
    }
    setShipperAddressBookOpen(false);
    setConsigneeAddressBookOpen(false);
  };

  const dispatch = useDispatch();

  const saveUpdAddressBookData = () => {
    if (selectedShipperId !== 0) {
      const addressBookEntry = {
        ...addressBookData.find(
          (item: AddressBookEntry) => item.addressBookAddressId === selectedShipperId
        ),
        contactName: shipperConsObj.shipperAddress.contactName,
        companyName: shipperConsObj.shipperAddress.companyName,
        address1: shipperConsObj.shipperAddress.address1,
        address2: shipperConsObj.shipperAddress.address2,
        phone: shipperConsObj.shipperAddress.phone,
        email: shipperConsObj.shipperAddress.email,
      };
      updateAddressBookData(addressBookEntry, selectedShipperId).then(res => {
        dispatch({
          type: UPDATE_ADDRESS_BOOK_ENTRY,
          payload: res.data
        });
        saveConsigneeAddressBookData(true);
      });
    } else {
      saveConsigneeAddressBookData(false)
    }

  };

  const saveConsigneeAddressBookData = (isShipperUpdated: boolean) => {
    if (selectedConsigneeId !== 0) {
      const addressBookEntry = {
        ...addressBookData.find(
          (item: AddressBookEntry) => item.addressBookAddressId === selectedConsigneeId
        ),
        contactName: shipperConsObj.consigneeAddress.contactName,
        companyName: shipperConsObj.consigneeAddress.companyName,
        address1: shipperConsObj.consigneeAddress.address1,
        address2: shipperConsObj.consigneeAddress.address2,
        phone: shipperConsObj.consigneeAddress.phone,
        email: shipperConsObj.consigneeAddress.email,
      };
      updateAddressBookData(addressBookEntry, selectedConsigneeId).then(res => {
        dispatch({
          type: UPDATE_ADDRESS_BOOK_ENTRY,
          payload: res.data
        });
        dispatch({
          type: UPDATE_SHOW_ADDRESS_CHNG_CONF,
          payload: false
        });
        setMsgCnfrmIsOpen(true);
      });
    } else {
      if (isShipperUpdated) {
        dispatch({
          type: UPDATE_SHOW_ADDRESS_CHNG_CONF,
          payload: false
        });
        setMsgCnfrmIsOpen(true);
      }
    }
  }

  const captureShipperConsInfoChange = useCallback((isShipper: boolean)=>{
    if ((isShipper && selectedShipperId !== 0) || selectedConsigneeId !== 0) {
      dispatch({
        type: UPDATE_IS_SHIPPER_CONS_INFO_CHNGD,
        payload: true,
      });
    }
  },[dispatch, selectedConsigneeId, selectedShipperId])

  
  useEffect(()=>{
    // create new dispatch for avoiding conflict
    const consigneeKey = ["companyName","email", "address1","address2","contactName","phone"]
    const consigneeOtherInfoKey = ["consigneeReferenceCode"];
    const consigneeDispatch = () =>{
      for(let key of consigneeKey){
        dispatch({
          type: UPDATE_SHIPPER_CONS_ADDRESS_INFO,
          payload: {
          shipperConsKey: "consigneeAddress",
          updKey: key,
          updValue: props.bolAddressBeforeReQuote.shipperConsObj.consigneeAddress[key],
          },
        });
      }
    }
    const consigneeOtherInfoDispatch = () =>{
      for(let key of consigneeOtherInfoKey){
        dispatch({
          type: UPDATE_SHIPPER_CONS_OTHER_INFO,
          payload: {
          updKey: key,
          updValue: props.bolAddressBeforeReQuote.shipperConsObj[key],
          },
        });
      }
    }
    const allDispatch = ()=>{
      consigneeDispatch();
      consigneeOtherInfoDispatch();
    }
    const saveAllInformation = () => {
        captureShipperConsInfoChange(true);
        allDispatch();
    } 
    if(props.bolAddressBeforeReQuote) saveAllInformation();
  },[props.bolAddressBeforeReQuote, dispatch, captureShipperConsInfoChange]);

  // Store the populate data from freight history into redux store
  useEffect(()=>{
    if(!isEmpty(populationObj) && !isEmpty(populationObj.consigneeAddress) && !isEmpty(populationObj.shipperAddress)){
      const shipmentKey = ["companyName","email", "address1","address2","contactName","phone"]
    
      const shipperDispatch = () =>{
        for(let key of shipmentKey){
          dispatch({
            type: UPDATE_SHIPPER_CONS_ADDRESS_INFO,
            payload: {
            shipperConsKey: "shipperAddress",
            updKey: key,
            updValue: populationObj.shipperAddress[key],
            },
          });
        }
      }

      const consigneeDispatch = () =>{
        for(let key of shipmentKey){
          dispatch({
            type: UPDATE_SHIPPER_CONS_ADDRESS_INFO,
            payload: {
            shipperConsKey: "consigneeAddress",
            updKey: key,
            updValue: populationObj.consigneeAddress[key],
            },
          });
        }
      }
      captureShipperConsInfoChange(true);
      consigneeDispatch();
      shipperDispatch();
    }
  },[populationObj, dispatch, captureShipperConsInfoChange]);

  return (
    <div
      className={`${props.isBolDetail ? '' : 'border-[1px] rounded-md box p-7'} 
     md:mt-10 h-11/12 border-light-gray md:${props.isBolDetail ? '' : 'w-11/12 pr-7'}
     ${props.isStep1Valid ? "border-green-1" : "border-light-gray"} text-blue-1`}
    >
      {props.isBolDetail && (<div className={`w-full justify-start items-center flex ${props.isBolDetail ? 'bg-lightest-gray py-4 pl-2' : 'pl-4'}`}>
        <FaInfoCircle className="text-slg"/>
        <label className={`${props.isBolDetail ? 'text-slg pl-2 font-bold leading-[0]' : 'text-lg pl-2 font-bold'}`} >DETAILS INFORMATION</label>
      </div>)}
      {isShipperAddressBookOpen ? (
        <>
          <Overlay />
          <AddressBookDialog
            fromShipperForm={true}
            isShipper={false}
            onClick={(isShipperClicked: boolean, address: AddressBookEntry) =>
              addAddressBookInfo(isShipperClicked, address)
            }
            onDialogClose={() => setShipperAddressBookOpen(false)}
          />
        </>
      ) : (
        <></>
      )}

      {openAddressChangeDialog ? (
        <>
          <Overlay />
          <ConfirmationDialog
            headerLabel="You have changed the origin or destination of your shipment."
            yesLabel="RE-QUOTE"
            noLabel="CANCEL"
            yesHandler={() => props.setAddressUpdInfo(tempData)}
            yesIcon={<HiOutlineRefresh className="relative text-center cursor-pointer" />}
            noHandler={() => {
              setOpenAddressChangeDialog(false);
              setTempData([]);
            }}
          />
        </>
      ) : (
        <></>
      )}

      {showAddressChangeConf && isShipperConsInfoChanged ? (
        <>
          <Overlay />
          <ConfirmationDialog
            headerLabel="Would you like to update these changes to your address book?"
            yesLabel="SAVE"
            noLabel="CANCEL"
            yesHandler={() => saveUpdAddressBookData()}
            yesIcon={<div><IoMdSave className="justify-items-end cursor-pointer" /></div>}
            noHandler={() => {
              dispatch({
                type: UPDATE_IS_SHIPPER_CONS_INFO_CHNGD,
                payload: false,
              });
              dispatch({
                type: UPDATE_SHOW_ADDRESS_CHNG_CONF,
                payload: false,
              });
            }}
          />
        </>
      ) : (
        <></>
      )}

      {msgCnfrmIsOpen && <>
        <Overlay />
        <MessageCnfDialog
          headerLabel="Changes have been saved to your address book."
          yesLabel="OK"
          yesHandler={() => setMsgCnfrmIsOpen(false)}
        />
      </>}

      {errorObj.show &&
        <>
          <Overlay />
          <ErrorDialog
            errorImg={<></>}
            closeHandler={() => {
              dispatch({
                type: UPD_ERR_OBJ,
                payload: {
                  show: false
                }
              })
            }}
            errorCode={errorObj.errorCode}
            errorMsg={errorObj.errorMsg}
            contactName={errorObj.contactName}
            deptName={errorObj.deptName}
            phone={errorObj.phone}
            email={errorObj.email} />
        </>
      }

      <div className="md:grid grid-cols-1 md:grid-cols-2 md:gap-20">
        <div className="grid grid-cols-6 gap-2">
          <div className={`flex col-span-6 justify-between pl-3 ${props.isBolDetail ? 'mt-4' : ''}`}>
            <div className="col-span-4">
              <div className={`w-full flex ${props.isBolDetail ? 'items-center' : ''}`}>
                <IoIosPerson className={`w-8 h-8 ${props.isBolDetail ? 'text-slg': 'text-lg'}`} />
                <label className={`text-lg pl-2 font-bold ${props.isBolDetail ? 'leading-[0] text-slg' : ''}`}>SHIPPER</label>
              </div>
            </div>
            <div className="col-span-2">
              <LinkIconLabel
                icon="RiContactsBook2Fill"
                onClick={() => openAddressBook(true)}
                label="Address Book"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 col-span-12 sm:col-span-6 md:col-span-6 gap-10 bg-white sm:p-2">
            <TextField
              className=""
              id="shipperCompanyName"
              label="Name"
              name="shipperCompanyName"
              value={
                typeof shipperConsObj.shipperAddress.companyName == "boolean"
                  ? ""
                  : shipperConsObj.shipperAddress.companyName ? shipperConsObj.shipperAddress.companyName : (!isEmpty(populationObj) && populationObj.shipperAddress?.companyName)
              }
              onChange={(val: string) => {
                if (shipperConsObj.shipperAddress.companyName !== val) {
                  captureShipperConsInfoChange(true);
                  dispatch({
                    type: UPDATE_SHIPPER_CONS_ADDRESS_INFO,
                    payload: {
                      shipperConsKey: "shipperAddress",
                      updKey: "companyName",
                      updValue: val,
                    },
                  });
                }
              }}
              isValidationTriggered={
                isValidationTriggered || isSectionValidationTriggered[0]
              }
              type="text"
            />

            <TextField
              className=""
              id="shipperEmail"
              label=" Email Address"
              name="shipperEmail"
              value={
                typeof shipperConsObj.shipperAddress.email == "boolean"
                  ? ""
                  : shipperConsObj.shipperAddress.email ? shipperConsObj.shipperAddress.email : (!isEmpty(populationObj) && populationObj.shipperAddress?.email)
              }
              onChange={(val: string) => {
                if (shipperConsObj.shipperAddress.email !== val) {
                  captureShipperConsInfoChange(true);
                  dispatch({
                    type: UPDATE_SHIPPER_CONS_ADDRESS_INFO,
                    payload: {
                      shipperConsKey: "shipperAddress",
                      updKey: "email",
                      updValue: val,
                    },
                  });
                }
              }}
              showError={showError}
              type="text"
              isValidationTriggered={
                isValidationTriggered || isSectionValidationTriggered[0]
              }
              isEmail={true}
            />
          </div>
          <div className="grid grid-cols-2 col-span-12 md:col-span-6 sm:col-span-6 gap-10 bg-white sm:p-2">
            <TextField
              className=""
              id="shipperAddress1"
              label="Address 1"
              name="shipperAddress1"
              type="text"
              value={
                typeof shipperConsObj.shipperAddress.address1 == "boolean"
                  ? ""
                  : shipperConsObj.shipperAddress.address1 ? shipperConsObj.shipperAddress.address1 : (!isEmpty(populationObj) && populationObj.shipperAddress?.address1)
              }
              onChange={(val: string) => {
                if (shipperConsObj.shipperAddress.address1 !== val) {
                  captureShipperConsInfoChange(true);
                  dispatch({
                    type: UPDATE_SHIPPER_CONS_ADDRESS_INFO,
                    payload: {
                      shipperConsKey: "shipperAddress",
                      updKey: "address1",
                      updValue: val,
                    },
                  });
                }
              }}
              isValidationTriggered={
                isValidationTriggered || isSectionValidationTriggered[0]
              }
            />

            <TextField
              className=""
              id="shipperAddress2"
              label="Address 2"
              name="shipperAddress2"
              value={
                typeof shipperConsObj.shipperAddress.address2 == "boolean"
                  ? ""
                  : shipperConsObj.shipperAddress.address2 ? shipperConsObj.shipperAddress.address2 : (!isEmpty(populationObj) && populationObj.shipperAddress?.address2)
              }
              onChange={(val: string) => {
                const isEmptyValue = val.trim() === "";
                const updValue = isEmptyValue ? null : val;
                if (shipperConsObj.shipperAddress.address2 !== updValue) {
                  captureShipperConsInfoChange(true);
                  dispatch({
                    type: UPDATE_SHIPPER_CONS_ADDRESS_INFO,
                    payload: {
                      shipperConsKey: "shipperAddress",
                      updKey: "address2",
                      updValue: updValue,
                    },
                  });
                }
              }}
              type="text"
              isValidationTriggered={false}
            />
          </div>
          <div className="grid grid-cols-3 col-span-12 md:col-span-6 sm:col-span-6 gap-10 bg-white sm:p-2">
            <TextField
              className=""
              id="shipperPostalCode"
              label="Zip Code"
              name="shipperPostalCode"
              key={
                tempData.find(item => item.key === "origin_post_code")
                  ? "origin_post_code"
                  : "shipperPostalCode"
              }
              disabled={props.isBolDetail}
              value={
                typeof shipperConsObj.shipperAddress.postalCode == "boolean"
                  ? ""
                  : shipperConsObj.shipperAddress.postalCode
              }
              onChange={(val: string) => {
                if (shipperConsObj.shipperAddress.postalCode !== val) {
                  setTempData([{ key: "origin_post_code", value: val }]);
                  setOpenAddressChangeDialog(true);
                }
              }}
              type="text"
              isValidationTriggered={
                isValidationTriggered || isSectionValidationTriggered[0]
              }
            />
            <TextField
              className=""
              id="shipperStateCode"
              label="State"
              name="shipperStateCode"
              key={
                tempData.find(item => item.key === "origin_state")
                  ? "origin_state"
                  : "shipperStateCode"
              }
              disabled={props.isBolDetail}
              value={
                typeof shipperConsObj.shipperAddress.stateCode == "boolean"
                  ? ""
                  : shipperConsObj.shipperAddress.stateCode
              }
              onChange={(val: string) => {
                if (shipperConsObj.shipperAddress.stateCode !== val) {
                  setTempData([{ key: "origin_state", value: val }]);
                  setOpenAddressChangeDialog(true);
                }
              }}
              type="text"
              isValidationTriggered={
                isValidationTriggered || isSectionValidationTriggered[0]
              }
            />
            <TextField
              className=""
              id="shipperCity"
              label="City"
              name="shipperCity"
              key={
                tempData.find(item => item.key === "origin_city")
                  ? "origin_city"
                  : "shipperCity"
              }
              disabled={props.isBolDetail}
              value={
                typeof shipperConsObj.shipperAddress.city == "boolean"
                  ? ""
                  : shipperConsObj.shipperAddress.city
              }
              onChange={(val: string) => {
                if (shipperConsObj.shipperAddress.city !== val) {
                  setTempData([{ key: "origin_city", value: val }]);
                  setOpenAddressChangeDialog(true);
                }
              }}
              type="text"
              isValidationTriggered={
                isValidationTriggered || isSectionValidationTriggered[0]
              }
            />
          </div>
          <div className="grid grid-cols-2 col-span-12 md:col-span-6 sm:col-span-6 gap-10 bg-white sm:p-2">
            <TextField
              className=""
              id="shipperContactName"
              label="Contact Name"
              name="shipperContactName"
              value={
                typeof shipperConsObj.shipperAddress.contactName == "boolean"
                  ? ""
                  : shipperConsObj.shipperAddress.contactName ? shipperConsObj.shipperAddress.contactName : (!isEmpty(populationObj) && populationObj.shipperAddress?.contactName)
              }
              onChange={(val: string) => {
                if (shipperConsObj.shipperAddress.contactName !== val) {
                  captureShipperConsInfoChange(true);
                  dispatch({
                    type: UPDATE_SHIPPER_CONS_ADDRESS_INFO,
                    payload: {
                      shipperConsKey: "shipperAddress",
                      updKey: "contactName",
                      updValue: val,
                    },
                  });
                }
              }}
              type="text"
              isValidationTriggered={
                isValidationTriggered || isSectionValidationTriggered[0]
              }
            />

            <TextField
              className=""
              id="shipperPhone"
              label="Phone"
              name="shipperPhone"
              value={
                typeof shipperConsObj.shipperAddress.phone == "boolean"
                  ? ""
                  : shipperConsObj.shipperAddress.phone ? shipperConsObj.shipperAddress.phone : (!isEmpty(populationObj) && populationObj.shipperAddress?.phone)
              }
              onChange={(val: string) => {
                const newVal = val.replace(/[\s-]/g, "");
                if (
                  shipperConsObj.shipperAddress.phone.replace(/[\s-]/g, "") !== newVal
                ) {
                  captureShipperConsInfoChange(true);
                  dispatch({
                    type: UPDATE_SHIPPER_CONS_ADDRESS_INFO,
                    payload: {
                      shipperConsKey: "shipperAddress",
                      updKey: "phone",
                      updValue: newVal,
                    },
                  });
                }
              }}
              type="text"
              isValidationTriggered={
                isValidationTriggered || isSectionValidationTriggered[0]
              }
            />
          </div>
          <div className="grid grid-cols-2 col-span-12 md:col-span-6 sm:col-span-6 gap-10 bg-white sm:p-2">
            <TextField
              className=""
              id="shipperReferenceCode"
              label="Ref. Code"
              name="shipperReferenceCode"
              value={
                typeof shipperConsObj.shipperReferenceCode == "boolean"
                  ? ""
                  : shipperConsObj.shipperReferenceCode
              }
              onChange={(val: string) =>
                dispatch({
                  type: UPDATE_SHIPPER_CONS_OTHER_INFO,
                  payload: {
                    updKey: "shipperReferenceCode",
                    updValue: val,
                  },
                })
              }
              type="text"
              isValidationTriggered={
                false
              }
            />
            {!props.isBolDetail && <ToggleSwitch
              label="Email BOL & Label"
              value={
                typeof shipperConsObj.shipper_toggle_button == "string" ||
                  typeof shipperConsObj.shipper_toggle_button == "number"
                  ? false
                  : shipperConsObj.shipper_toggle_button
              }
              onChange={(val: boolean) =>
                dispatch({
                  type: UPDATE_SHIPPER_CONS_OTHER_INFO,
                  payload: {
                    updKey: "shipper_toggle_button",
                    updValue: val,
                  },
                })
              }
            />}
          </div>
          {!props.isBolDetail && <div className="grid grid-cols-1 col-span-12 md:col-span-6 sm:col-span-6 gap-10 bg-white sm:p-2">
            <div className="w-full justify-start flex pl-3">
              <CheckBox
                id="shipper_addAddressBook_check"
                label="Add to my Address Book"
                disabled={selectedShipperId !== 0}
                onChange={(val: boolean) =>
                  dispatch({
                    type: UPDATE_SHIPPER_CONS_OTHER_INFO,
                    payload: {
                      updKey: "shipper_addAddressBook_check",
                      updValue: val,
                    },
                  })
                }
              />
            </div>
          </div>}
        </div>
        <div className="grid grid-cols-6 md:mt-0 sm:mt-10 mt-10 gap-2">
          {isConsigneeAddressBookOpen ? (
            <>
              <Overlay />
              <AddressBookDialog
                fromShipperForm={true}
                isShipper={true}
                onClick={(isShipperClicked: boolean, address: any) =>
                  addAddressBookInfo(isShipperClicked, address)
                }
                onDialogClose={() => setConsigneeAddressBookOpen(false)}
              />
            </>
          ) : (
            <></>
          )}

          <div className={`flex col-span-6 justify-between pl-3 ${props.isBolDetail ? 'mt-4' : ''}`}>
            <div className="col-span-4">
              <div className={`w-full flex ${props.isBolDetail ? 'items-center' : ''}`}>
                <IoIosPerson className={`w-8 h-8 ${props.isBolDetail ? 'text-slg': 'text-lg'}`} />
                <label className={`text-lg pl-2 font-bold ${props.isBolDetail ? 'leading-[0] text-slg' : ''}`}>CONSIGNEE</label>
              </div>
            </div>
            <div className="col-span-2">
              <LinkIconLabel
                icon="RiContactsBook2Fill"
                onClick={() => openAddressBook(false)}
                label="Address Book"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 col-span-12 md:col-span-6 sm:col-span-6 gap-10 bg-white sm:p-2">
            <TextField
              className=""
              id="consigneeCompanyName"
              label="Name"
              name="consigneeCompanyName"
              value={
                typeof shipperConsObj.consigneeAddress.companyName == "boolean"
                  ? ""
                  : props.bolAddressBeforeReQuote?.shipperConsObj?.consigneeAddress?.companyName ? props.bolAddressBeforeReQuote?.shipperConsObj?.consigneeAddress.companyName : shipperConsObj.consigneeAddress.companyName ? shipperConsObj.consigneeAddress.companyName : (!isEmpty(populationObj) && populationObj.consigneeAddress?.companyName)
              }
              onChange={(val: string) => {
                if (shipperConsObj.consigneeAddress.companyName !== val) {
                  captureShipperConsInfoChange(true);
                  dispatch({
                    type: UPDATE_SHIPPER_CONS_ADDRESS_INFO,
                    payload: {
                      shipperConsKey: "consigneeAddress",
                      updKey: "companyName",
                      updValue: val,
                    },
                  });
                }
              }}
              type="text"
              isValidationTriggered={
                isValidationTriggered || isSectionValidationTriggered[0]
              }
            />

            <TextField
              className=""
              id="consigneeEmail"
              label=" Email Address"
              name="consigneeEmail"
              value={
                typeof shipperConsObj.consigneeAddress.email == "boolean"
                  ? ""
                  : props.bolAddressBeforeReQuote?.shipperConsObj?.consigneeAddress?.email ? props.bolAddressBeforeReQuote?.shipperConsObj?.consigneeAddress.email : shipperConsObj.consigneeAddress.email ? shipperConsObj.consigneeAddress.email : (!isEmpty(populationObj) && populationObj.consigneeAddress?.email)
              }
              onChange={(val: string) => {
                if (shipperConsObj.consigneeAddress.email !== val) {
                  captureShipperConsInfoChange(true);
                  dispatch({
                    type: UPDATE_SHIPPER_CONS_ADDRESS_INFO,
                    payload: {
                      shipperConsKey: "consigneeAddress",
                      updKey: "email",
                      updValue: val,
                    },
                  });
                }
              }}
              showError={showError}
              type="text"
              isEmail={true}
              isValidationTriggered={
                isValidationTriggered || isSectionValidationTriggered[0]
              }
            />
          </div>
          <div className="grid grid-cols-2 col-span-12 md:col-span-6 sm:col-span-6 gap-10 bg-white sm:p-2">
            <TextField
              className=""
              id="consigneeAddress1"
              label="Address 1"
              name="consigneeAddress1"
              type="text"
              value={
                typeof shipperConsObj.consigneeAddress.address1 == "boolean"
                  ? ""
                  : props.bolAddressBeforeReQuote?.shipperConsObj?.consigneeAddress?.address1 ? props.bolAddressBeforeReQuote?.shipperConsObj?.consigneeAddress.address1 : shipperConsObj.consigneeAddress.address1 ? shipperConsObj.consigneeAddress.address1 : (!isEmpty(populationObj) && populationObj.consigneeAddress?.address1)
              }
              onChange={(val: string) => {
                if (shipperConsObj.consigneeAddress.address1 !== val) {
                  captureShipperConsInfoChange(true);
                  dispatch({
                    type: UPDATE_SHIPPER_CONS_ADDRESS_INFO,
                    payload: {
                      shipperConsKey: "consigneeAddress",
                      updKey: "address1",
                      updValue: val,
                    },
                  });
                }
              }}
              isValidationTriggered={
                isValidationTriggered || isSectionValidationTriggered[0]
              }
            />

            <TextField
              className=""
              id="consigneeAddress2"
              label="Address 2"
              name="consigneeAddress2"
              value={
                typeof shipperConsObj.consigneeAddress.address2 == "boolean"
                  ? ""
                  : props.bolAddressBeforeReQuote?.shipperConsObj?.consigneeAddress?.address2 ? props.bolAddressBeforeReQuote?.shipperConsObj?.consigneeAddress.address2 : shipperConsObj.consigneeAddress.address2 ? shipperConsObj.consigneeAddress.address2 : (!isEmpty(populationObj) && populationObj.consigneeAddress?.address2)
              }
              onChange={(val: string) => {                
                const isEmptyValue = val.trim() === "";
                const updValue = isEmptyValue ? null : val;
                if (shipperConsObj.consigneeAddress.address2 !== updValue) {
                  captureShipperConsInfoChange(true);
                  dispatch({
                    type: UPDATE_SHIPPER_CONS_ADDRESS_INFO,
                    payload: {
                      shipperConsKey: "consigneeAddress",
                      updKey: "address2",
                      updValue: updValue,
                    },
                  });
                }
              }}
              type="text"
              isValidationTriggered={false}
            />
          </div>
          <div className="grid grid-cols-3 col-span-12 md:col-span-6 sm:col-span-6 gap-10 bg-white sm:p-2">
            <TextField
              className=""
              id="consigneePostalCode"
              label="Zip Code"
              name="consigneePostalCode"
              key={
                tempData.find(item => item.key === "destination_post_code")
                  ? "destination_post_code"
                  : "consigneePostalCode"
              }
              disabled={props.isBolDetail}
              value={
                typeof shipperConsObj.consigneeAddress.postalCode == "boolean"
                  ? ""
                  : shipperConsObj.consigneeAddress.postalCode
              }
              onChange={(val: string) => {
                if (shipperConsObj.consigneeAddress.postalCode !== val) {
                  setTempData([{ key: "destination_post_code", value: val }]);
                  setOpenAddressChangeDialog(true);
                }
              }}
              type="text"
              isValidationTriggered={
                isValidationTriggered || isSectionValidationTriggered[0]
              }
            />
            <TextField
              className=""
              id="consigneeStateCode"
              label="State"
              name="consigneeStateCode"
              key={
                tempData.find(item => item.key === "destination_state")
                  ? "destination_state"
                  : "consigneeState"
              }
              disabled={props.isBolDetail}
              value={
                typeof shipperConsObj.consigneeAddress.stateCode == "boolean"
                  ? ""
                  : shipperConsObj.consigneeAddress.stateCode
              }
              onChange={(val: string) => {
                if (shipperConsObj.consigneeAddress.stateCode !== val) {
                  setTempData([{ key: "destination_state", value: val }]);
                  setOpenAddressChangeDialog(true);
                }
              }}
              type="text"
              isValidationTriggered={
                isValidationTriggered || isSectionValidationTriggered[0]
              }
            />
            <TextField
              className=""
              id="consigneeCity"
              label="City"
              name="consigneeCity"
              key={
                tempData.find(item => item.key === "destination_city")
                  ? "destination_city"
                  : "consigneeCity"
              }
              disabled={props.isBolDetail}
              value={
                typeof shipperConsObj.consigneeAddress.city == "boolean"
                  ? ""
                  : shipperConsObj.consigneeAddress.city
              }
              onChange={(val: string) => {
                if (shipperConsObj.consigneeAddress.city !== val) {
                  setTempData([{ key: "destination_city", value: val }]);
                  setOpenAddressChangeDialog(true);
                }
              }}
              type="text"
              isValidationTriggered={
                isValidationTriggered || isSectionValidationTriggered[0]
              }
            />
          </div>
          <div className="grid grid-cols-2 col-span-12 md:col-span-6 sm:col-span-6 gap-10 bg-white sm:p-2">
            <TextField
              className=""
              id="consigneeContactName"
              label="Contact Name"
              name="consigneeContactName"
              value={
                typeof shipperConsObj.consigneeAddress.contactName == "boolean"
                  ? ""
                  : props.bolAddressBeforeReQuote?.shipperConsObj?.consigneeAddress?.contactName ? props.bolAddressBeforeReQuote?.shipperConsObj?.consigneeAddress.contactName : shipperConsObj.consigneeAddress.contactName ? shipperConsObj.consigneeAddress.contactName : (!isEmpty(populationObj) && populationObj.consigneeAddress?.contactName)
              }
              onChange={(val: string) => {
                if (shipperConsObj.consigneeAddress.contactName !== val) {
                  captureShipperConsInfoChange(true);
                  dispatch({
                    type: UPDATE_SHIPPER_CONS_ADDRESS_INFO,
                    payload: {
                      shipperConsKey: "consigneeAddress",
                      updKey: "contactName",
                      updValue: val,
                    },
                  });
                }
              }}
              type="text"
              isValidationTriggered={
                isValidationTriggered || isSectionValidationTriggered[0]
              }
            />

            <TextField
              className=""
              id="consingeePhone"
              label="Phone"
              name="consingeePhone"
              value={
                typeof shipperConsObj.consigneeAddress.phone == "boolean"
                  ? ""
                  : props.bolAddressBeforeReQuote?.shipperConsObj?.consigneeAddress?.phone ? props.bolAddressBeforeReQuote?.shipperConsObj?.consigneeAddress.phone : shipperConsObj.consigneeAddress.phone ? shipperConsObj.consigneeAddress.phone : (!isEmpty(populationObj) && populationObj.consigneeAddress?.phone)
              }
              onChange={(val: string) => {
                const newVal = val.replace(/[\s-]/g, "");
                if (
                  shipperConsObj.consigneeAddress.phone.replace(/[\s-]/g, "") !==
                  newVal
                ) {
                  captureShipperConsInfoChange(true);
                  dispatch({
                    type: UPDATE_SHIPPER_CONS_ADDRESS_INFO,
                    payload: {
                      shipperConsKey: "consigneeAddress",
                      updKey: "phone",
                      updValue: newVal,
                    },
                  });
                }
              }}
              type="text"
              isValidationTriggered={
                isValidationTriggered || isSectionValidationTriggered[0]
              }
            />
          </div>
          <div className="grid grid-cols-2 col-span-12 md:col-span-6 sm:col-span-6 gap-10 bg-white sm:p-2">
            <TextField
              className=""
              id="consigneeReferenceCode"
              label="Ref. Code"
              name="consigneeReferenceCode"
              value={
                typeof shipperConsObj.consigneeReferenceCode == "boolean"
                  ? ""
                  : props.bolAddressBeforeReQuote?.shipperConsObj?.consigneeReferenceCode ? props.bolAddressBeforeReQuote?.shipperConsObj?.consigneeReferenceCode : shipperConsObj.consigneeAddress.consigneeReferenceCode
              }
              onChange={(val: string) =>
                dispatch({
                  type: UPDATE_SHIPPER_CONS_OTHER_INFO,
                  payload: {
                    updKey: "consigneeReferenceCode",
                    updValue: val,
                  },
                })
              }
              type="text"
              isValidationTriggered={
                false
              }
            />
            {!props.isBolDetail && <ToggleSwitch
              label="Email BOL & Label"
              value={
                typeof shipperConsObj.consignee_toggle_button == "string" ||
                  typeof shipperConsObj.consignee_toggle_button == "number"
                  ? false
                  : shipperConsObj.consignee_toggle_button
              }
              onChange={(val: boolean) =>
                dispatch({
                  type: UPDATE_SHIPPER_CONS_OTHER_INFO,
                  payload: {
                    updKey: "consignee_toggle_button",
                    updValue: val,
                  },
                })
              }
            />}
          </div>
          {!props.isBolDetail && <div className="grid grid-cols-1 col-span-12 md:col-span-6 sm:col-span-6 gap-10 bg-white sm:p-2">
            <div className="w-full justify-start flex pl-3">
              <CheckBox
                id="consignee_addAddressBook_check"
                label="Add to my Address Book"
                disabled={selectedConsigneeId !== 0}
                onChange={(val: boolean) =>
                  dispatch({
                    type: UPDATE_SHIPPER_CONS_OTHER_INFO,
                    payload: {
                      updKey: "consignee_addAddressBook_check",
                      updValue: val,
                    },
                  })
                }
              />
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
};
export default ShipperForm;
