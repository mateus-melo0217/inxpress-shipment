import React from "react";
import { FaTruckMoving } from "react-icons/fa";
import { TextField } from "../../../components/bol_components/TextField";
import { AddressBookEntry, ShipmentValues } from "../constants/BOLConstants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/globalstore";
import { UPDATE_HIGHLIGHTED_TILL, UPDATE_IS_SECTION_VAL_TRIGGERED, UPDATE_SHIPMENT_DETAILS_FIELD, UPDATE_SHOW_ADDRESS_CHNG_CONF, UPDATE_VALID_SECTIONS } from "actions";
import { validateData, valIsAddressDataChanged } from "../utility/Utility";

export const ShippmentDetails = (props: any) => {
  
  const dispatch = useDispatch();
  const shipmentDetailsWrapper = useSelector((state: RootState) => state.bolInfoReducer.shipmentDetailsWrapper);
  const isValidationTriggered = useSelector((state: RootState) => state.bolInfoReducer.isValidationTriggered);
  const shipperConsObj = useSelector((state: RootState) => state.bolInfoReducer.shipperConsObj);
  const isSectionValidationTriggered = useSelector(
    (state: RootState) => state.bolInfoReducer.isSectionValidationTriggered
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

  const validatePrevSections = () => {
    if (!props.isBolDetail || props.isBolMenu) {
      let isShipperDataChanged = false;
      if (selectedShipperId !== 0) {
        isShipperDataChanged = valIsAddressDataChanged(
          addressBookData.find(
            (item: AddressBookEntry) => item.addressBookAddressId === selectedShipperId
          ),
          shipperConsObj.shipperAddress
        );
        dispatch({
          type: UPDATE_SHOW_ADDRESS_CHNG_CONF,
          payload: isShipperDataChanged
        });
      }
      if (!isShipperDataChanged && selectedConsigneeId !== 0) {
        dispatch({
          type: UPDATE_SHOW_ADDRESS_CHNG_CONF,
          payload: valIsAddressDataChanged(
            addressBookData.find(
              (item: AddressBookEntry) => item.addressBookAddressId === selectedConsigneeId
            ),
            shipperConsObj.consigneeAddress
          ),
        });
      }

      dispatch({
        type: UPDATE_HIGHLIGHTED_TILL,
        payload: 3
      });
      dispatch({
        type: UPDATE_IS_SECTION_VAL_TRIGGERED,
        payload: 3
      });

      dispatch({
        type: UPDATE_VALID_SECTIONS,
        payload: [
          {
            index: 1, isValid: validateData([
              { data: shipperConsObj, skipKeys: ['shipperAddress', 'consigneeAddress'] },
              { data: shipperConsObj.shipperAddress, skipKeys: ['address2'] },
              { data: shipperConsObj.consigneeAddress, skipKeys: ['address2'] }])
          }
        ]
      });
    }

  }
 

  React.useEffect(()=>{
      // create new dispatch for avoiding conflict
    const shipmentKey = "reference";
    const shipmentDispatch = () =>{
      let ref = props.bolAddressBeforeReQuote.shipmentDetailsWrapper.shipmentDetails[0];
      let i = 0;
        dispatch({
          type: UPDATE_SHIPMENT_DETAILS_FIELD,
          payload: {
            updIndex: i,
            updKey: shipmentKey,
            updVal: ref[shipmentKey],
          }
        });
      
    }
    
    const saveAllInformation = () => {
      shipmentDispatch();
    } 
    if(props.bolAddressBeforeReQuote) saveAllInformation();
  },[props.bolAddressBeforeReQuote, dispatch]);



  return (
    <div className={`${props.isBolDetail ? '' : 'border-[1px] rounded-md box border-light-gray p-7'} 
          mt-10 h-11/12 md:${props.isBolDetail ? '' : 'w-11/12'} text-blue-1`} onClick={validatePrevSections}>
      <div className={`w-full justify-start items-center flex ${props.isBolDetail ? 'bg-lightest-gray py-4 pl-2' : 'pl-4'}`}>
        <FaTruckMoving className="text-slg"/>
        <label className={`${props.isBolDetail ? 'text-slg pl-2 font-bold leading-[0]' : 'text-lg pl-2 font-bold'}`}>SHIPMENT DETAILS</label>
      </div>

      <div className="md:grid md:grid-cols-12 md:gap-10">
        {shipmentDetailsWrapper.shipmentDetails.map((obj: ShipmentValues, index: number) => (
          <div key={index} className="grid grid-cols-2 col-span-12 md:grid-cols-11 sm:grid-cols-5 md:col-span-12 sm:col-span-12 gap-5 bg-white sm:p-3">
            <TextField
              className=""
              id={`length=${index}`}
              label="Length"
              name={`length=${index}`}
              value={typeof (obj.dimensions.length) == 'boolean' ?
                "" : obj.dimensions.length}
              type="number"
              disabled
              isValidationTriggered={false}
            />
            <TextField
              className=""
              id={`width=${index}`}
              label="Width"
              name={`width=${index}`}
              value={typeof (obj.dimensions.width) == 'boolean' ?
                "" : obj.dimensions.width}
              type="number"
              disabled
              isValidationTriggered={false}
            />
            <TextField
              className=""
              id={`height=${index}`}
              label="Height"
              name={`height=${index}`}
              value={typeof (obj.dimensions.height) == 'boolean' 
              ? "" : obj.dimensions.height}
              type="number"
              disabled
              isValidationTriggered={false}
            />

            <TextField
              className=""
              id={`weight=${index}`}
              label="Weight"
              name={`weight=${index}`}
              value={typeof (obj.weight) == 'boolean' ? "" : obj.weight}
              type="number"
              disabled
              isValidationTriggered={false}
            />

            <TextField
              className=""
              id={`commodity=${index}`}
              label="Commodities"
              name={`commodity=${index}`}
              value={typeof (obj.commodityDescription) == 'boolean' ? "" : obj.commodityDescription}
              disabled

              type="text"
              isValidationTriggered={false}
            />
            <TextField
              className=""
              id={`nmfcCode=${index}`}
              label="NMFC"
              name={`nmfcCode=${index}`}
              value={typeof (obj.nmfcCode) == 'boolean' ? "" : obj.nmfcCode}
              type="text"
              onChange={(val: string) => dispatch({
                type: UPDATE_SHIPMENT_DETAILS_FIELD,
                payload: {
                  updIndex: index,
                  updKey: "nmfcCode",
                  updVal: val
                }
              })}
              onFocus={() => validatePrevSections()}
              isValidationTriggered={isValidationTriggered || isSectionValidationTriggered[2]}
            />
            <TextField
              className=""
              id={`classCode=${index}`}
              label="Class"
              name={`classCode=${index}`}
              value={typeof (obj.classCode) == 'boolean' ? "" : obj.classCode}
              type="text"
              disabled
              isValidationTriggered={false}
            />
            <TextField
              className=""
              id={`reference=${index}`}
              label="Reference#"
              name={`reference=${index}`}
              value={typeof (obj.reference) == 'boolean' ? "" : 
              props.bolAddressBeforeReQuote?.shipmentDetailsWrapper?.shipmentDetails[0].reference ? props.bolAddressBeforeReQuote?.shipmentDetailsWrapper?.shipmentDetails[0].reference : obj.reference}
              onChange={(val: string) => dispatch({
                  type: UPDATE_SHIPMENT_DETAILS_FIELD,
                  payload: {
                    updIndex: index,
                    updKey: "reference",
                    updVal: val
                  }
                })}
              onFocus={() => validatePrevSections()}
              type="text"
              isValidationTriggered={false}
            />
            <TextField
              className=""
              id={`packageType=${index}`}
              label="Type"
              name={`packageType=${index}`}
              value={typeof (obj.packageType) == 'boolean' ? "" : obj.packageType}
              type="text"
              disabled
              isValidationTriggered={false}
            />
            <TextField
              className=""
              id={`numberOfUnits=${index}`}
              label="Unit"
              name={`numberOfUnits=${index}`}
              value={typeof (obj.numberOfUnits) == 'boolean' ? "" : obj.numberOfUnits}
              type="number"
              disabled
              isValidationTriggered={false}
            />
          </div>))}
      </div>
    </div>
  );
};
