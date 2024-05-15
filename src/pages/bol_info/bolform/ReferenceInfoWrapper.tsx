import { LinkIconLabel } from "components/common/navigation/Links/LinkIconLabel/LinkIconLabel";
import { FaBook } from "react-icons/fa";
import { TextField } from "components/bol_components/TextField";
import { TiDeleteOutline } from "react-icons/ti";
import { TextArea } from "../../../components/bol_components/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/globalstore";
import {
  UPDATE_HIGHLIGHTED_TILL,
  UPDATE_IS_SECTION_VAL_TRIGGERED,
  UPDATE_REFERENCE_INFO,
  UPDATE_REFERENCE_INFO_ADD_REFNUM,
  UPDATE_REFERENCE_INFO_DEL_REFNUM,
  UPDATE_REFERENCE_INFO_REFNUM,
  UPDATE_SHOW_ADDRESS_CHNG_CONF,
  UPDATE_VALID_SECTIONS,
  UPDATE_REFERENCE_OBJ
} from "actions";
import React, { useCallback, useEffect } from "react";
import { validateData, valIsAddressDataChanged } from "../utility/Utility";
import { AddressBookEntry } from "../constants/BOLConstants";

export const ReferenceInfoWrapper = (props: any) => {
  const shipperConsObj = useSelector(
    (state: RootState) => state.bolInfoReducer.shipperConsObj
  );
  const additionalInfoObj = useSelector(
    (state: RootState) => state.bolInfoReducer.additionalInfoObj
  );
  const referenceObj = useSelector(
    (state: RootState) => state.bolInfoReducer.referenceObj
  );
  const isHazmat = useSelector(
    (state: RootState) => state.bolInfoReducer.isHazmat
  );
  const isValidationTriggered = useSelector(
    (state: RootState) => state.bolInfoReducer.isValidationTriggered
  );
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
  const dispatch = useDispatch();

  const updateAccessorials = useCallback((val: string)=> {
    dispatch({
        type: UPDATE_REFERENCE_INFO,
        payload: {
            updKey: "accessorials",
            updValue: val,
        },
    })
}, [dispatch])

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
          payload: isShipperDataChanged,
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
        payload: 2,
      });
      dispatch({
        type: UPDATE_IS_SECTION_VAL_TRIGGERED,
        payload: 2,
      });

      dispatch({
        type: UPDATE_VALID_SECTIONS,
        payload: [
          {
            index: 1,
            isValid: validateData([
              {
                data: shipperConsObj,
                skipKeys: ["shipperAddress", "consigneeAddress"],
              },
              { data: shipperConsObj.shipperAddress, skipKeys: ["address2"] },
              { data: shipperConsObj.consigneeAddress, skipKeys: ["address2"] },
            ]),
          },
        ],
      });
    }
  };

  useEffect(()=>{
    // create new dispatch for avoiding conflict
    const referenceKey = ["shipperNumber","poNumber", "releaseValue","specialInstruction", "accessorials"];
    const referenceDispatch = () =>{
      for(let key of referenceKey){
      dispatch({
        type: UPDATE_REFERENCE_INFO,
        payload: {
        updKey: key,
        updValue: props.bolAddressBeforeReQuote.referenceObj[key],
          },
        });
     }
    }
    const referenceOtherInfoDispatch = () =>{
      dispatch({
        type: UPDATE_REFERENCE_INFO_REFNUM,
        payload: {
        updKey: 0,
        updValue: props.bolAddressBeforeReQuote.referenceObj.referenceNumbers[0],
        },
      });
   
    }
    const allDispatch = ()=>{
      referenceDispatch();
      referenceOtherInfoDispatch();
    }  
    const saveAllInformation = () => {
      allDispatch();
    }
    if(props.bolAddressBeforeReQuote) saveAllInformation();
  },[props.bolAddressBeforeReQuote, dispatch]);

  useEffect(()=> {
    let val = '';
    
    if (props.accessorial) {
        val = props.accessorial.map((acc: {label: String, value: String}) => acc.label).join(', ');
        updateAccessorials(val);
    }

}, [props.accessorial, updateAccessorials])

  return (
    <div
      className={`${props.isBolDetail ? '' : 'border-[1px] rounded-md box p-7'} 
        mt-10 h-11/12 md:${props.isBolDetail ? '' : 'w-11/12'} border-light-gray text-blue-1
       `}
      onClick={validatePrevSections}
    >
      <div className={`w-full justify-start items-center flex ${props.isBolDetail ? 'bg-lightest-gray py-4 pl-2' : 'pl-4'}`}>
        <FaBook className="text-slg"/>
        <label className= {`${props.isBolDetail ? 'text-slg pl-2 font-bold leading-[0]' : 'text-lg pl-2 font-bold'}`} >REFERENCE INFORMATION</label>
      </div>
      <div className="md:grid sm:grid-cols-1 md:gap-1">
        <div
          className={`grid grid-cols-2 col-span-12 md:grid
          ${isHazmat ? "md:grid-cols-4" : "md:grid-cols-5"
            } sm:col-span-12 md:col-span-12 sm:grid-cols-3 gap-5 bg-white sm:p-3`}
        >
          <TextField
            className=""
            id="shipperNumber"
            label="Shipper#"
            name="shipperNumber"
            value={
              typeof referenceObj.shipperNumber == "boolean"
                ? ""
                : props.bolAddressBeforeReQuote?.referenceObj?.shipperNumber ? props.bolAddressBeforeReQuote?.referenceObj.shipperNumber : referenceObj.shipperNumber
            }
            onFocus={validatePrevSections}
            onChange={(val: string) =>
              dispatch({
                type: UPDATE_REFERENCE_INFO,
                payload: {
                  updKey: "shipperNumber",
                  updValue: val,
                },
              })
            }
            type="text"
            isValidationTriggered={
              false
            }
          />

          <TextField
            className=""
            id="poNumber"
            label="PO#"
            name="poNumber"
            value={
              typeof referenceObj.poNumber == "boolean"
                ? ""
                : props.bolAddressBeforeReQuote?.referenceObj?.poNumber ? props.bolAddressBeforeReQuote?.referenceObj.poNumber : referenceObj.poNumber
            }
            onChange={(val: string) =>
              dispatch({
                type: UPDATE_REFERENCE_INFO,
                payload: {
                  updKey: "poNumber",
                  updValue: val,
                },
              })
            }
            type="text"
            isValidationTriggered={
              false
            }
          />

          <TextField
            className=""
            id="releaseValue"
            label="Release Value"
            name="releaseValue"
            value={
              typeof referenceObj.releaseValue == "boolean"
                ? ""
                : props.bolAddressBeforeReQuote?.referenceObj?.releaseValue ? props.bolAddressBeforeReQuote?.referenceObj.releaseValue : referenceObj.releaseValue
            }
            onChange={(val: string) =>
              dispatch({
                type: UPDATE_REFERENCE_INFO,
                payload: {
                  updKey: "releaseValue",
                  updValue: val,
                },
              })
            }
            type="text"
            isValidationTriggered={
              false
            }
          />
          <TextField
            className=""
            id="referenceNumber-0"
            label="Reference"
            name="referenceNumber-0"
            value={
              typeof referenceObj.referenceNumbers[0] == "boolean"
                ? ""
                : props.bolAddressBeforeReQuote?.referenceObj?.referenceNumbers[0] ? props.bolAddressBeforeReQuote?.referenceObj.referenceNumbers[0] : referenceObj.referenceNumbers[0]
            }
            onChange={(val: string) =>
              dispatch({
                type: UPDATE_REFERENCE_INFO_REFNUM,
                payload: {
                  updIndex: 0,
                  updData: val,
                },
              })
            }
            type="text"
            isValidationTriggered={
              false
            }
          />
          {!isHazmat && (
            <div className="-mt-4 mb-4 md:mt-2.5 sm:mt-2.5 w-[100px]">
              <LinkIconLabel
                icon="FiPlusCircle"
                label="Add Reference"
                onClick={() => {
                  dispatch({
                    type: UPDATE_REFERENCE_INFO_ADD_REFNUM,
                  });
                }}
              />
            </div>
          )}
        </div>

        <div key={referenceObj.referenceNumbers.length}>
          {referenceObj.referenceNumbers.map((refNum: string, index: number) =>
            index === 0 ? (
              <React.Fragment key={index}></React.Fragment>
            ) : (
              <div
                key={index}
                className="grid grid-cols-2 col-span-12 md:grid md:grid-cols-5 sm:col-span-12 md:col-span-12 sm:grid-cols-3 gap-5 bg-white sm:p-3"
              >
                <div className="md:col-span-4 mb-5 md:w-[99rem] ">
                  <TextField
                    className=""
                    id={`referenceNumber-${index}`}
                    label="Reference"
                    name={`referenceNumber-${index}`}
                    value={refNum}
                    onChange={(val: string) =>
                      dispatch({
                        type: UPDATE_REFERENCE_INFO_REFNUM,
                        payload: {
                          updIndex: index,
                          updData: val,
                        },
                      })
                    }
                    type="text"
                    isValidationTriggered={
                      isValidationTriggered || isSectionValidationTriggered[1]
                    }
                  />
                </div>

                <div className="md:col-span-1 md:ml-8 flex items-center bg-transparent border-none right-0 -mt-4 mb-4 md:mt-1 md:mb-0 sm:mb-0 text-red-1 text-xl focus:outline-none">
                  <TiDeleteOutline
                    className="cursor-pointer"
                    color="#dc3848"
                    size="2em"
                    onClick={() =>
                      dispatch({
                        type: UPDATE_REFERENCE_INFO_DEL_REFNUM,
                        payload: {
                          delIndex: index,
                        },
                      })
                    }
                  />
                  <span
                    className="pl-2 text-xl cursor-pointer"
                    onClick={() =>
                      dispatch({
                        type: UPDATE_REFERENCE_INFO_DEL_REFNUM,
                        payload: {
                          delIndex: index,
                        },
                      })
                    }
                  >
                    Delete
                  </span>
                </div>
              </div>
            )
          )}
        </div>
        {/* Hazmat Implementation  */}

        {isHazmat && (
          <>
            <div className="grid grid-cols-1 sm:col-span-12 col-span-12 gap-5 bg-white sm:p-3">
              <label className="text-lg pl-2 font-bold">
                HAZMAT INFORMATION
              </label>
            </div>
            <div className="md:grid sm:grid-cols-1 col-span-12">
              <div className="grid grid-cols-2 col-span-12 md:grid md:grid-cols-5 sm:col-span-12 md:col-span-12 sm:grid-cols-3 gap-5 bg-white sm:p-3">
                <TextField
                  className=""
                  id="hazmatClass"
                  label="Hazmat Class"
                  name="hazmatClass"
                  value={
                    typeof referenceObj.hazmatClass == "boolean"
                      ? ""
                      : referenceObj.hazmatClass
                  }
                  onChange={(val: string) =>
                    dispatch({
                      type: UPDATE_REFERENCE_INFO,
                      payload: {
                        updKey: "hazmatClass",
                        updValue: val,
                      },
                    })
                  }
                  type="text"
                  isValidationTriggered={
                    isValidationTriggered || isSectionValidationTriggered[1]
                  }
                />
                <TextField
                  className=""
                  id="hazmatType"
                  label="Hazmat Type"
                  name="hazmatType"
                  value={
                    typeof referenceObj.hazmatType == "boolean"
                      ? ""
                      : referenceObj.hazmatType
                  }
                  onChange={(val: string) =>
                    dispatch({
                      type: UPDATE_REFERENCE_INFO,
                      payload: {
                        updKey: "hazmatType",
                        updValue: val,
                      },
                    })
                  }
                  type="text"
                  isValidationTriggered={
                    isValidationTriggered || isSectionValidationTriggered[1]
                  }
                />
                <TextField
                  className=""
                  id="hazmatUN"
                  label="Formatted UN or NA#"
                  name="hazmatUN"
                  value={
                    typeof referenceObj.hazmatUN == "boolean"
                      ? ""
                      : referenceObj.hazmatUN
                  }
                  onChange={(val: string) =>
                    dispatch({
                      type: UPDATE_REFERENCE_INFO,
                      payload: {
                        updKey: "hazmatUN",
                        updValue: val,
                      },
                    })
                  }
                  type="text"
                  isValidationTriggered={
                    isValidationTriggered || isSectionValidationTriggered[1]
                  }
                />
                <TextField
                  className=""
                  id="hazmatPackageGroup"
                  label="Pkg. Group"
                  name="hazmatPackageGroup"
                  value={
                    typeof referenceObj.hazmatPackageGroup == "boolean"
                      ? ""
                      : referenceObj.hazmatPackageGroup
                  }
                  onChange={(val: string) =>
                    dispatch({
                      type: UPDATE_REFERENCE_INFO,
                      payload: {
                        updKey: "hazmatPackageGroup",
                        updValue: val,
                      },
                    })
                  }
                  type="text"
                  isValidationTriggered={
                    isValidationTriggered || isSectionValidationTriggered[1]
                  }
                />
                <TextField
                  className=""
                  id="hazmatPackageType"
                  label="Pkg. Type Name"
                  name="hazmatPackageType"
                  value={
                    typeof referenceObj.hazmatPackageType == "boolean"
                      ? ""
                      : referenceObj.hazmatPackageType
                  }
                  onChange={(val: string) =>
                    dispatch({
                      type: UPDATE_REFERENCE_INFO,
                      payload: {
                        updKey: "hazmatPackageType",
                        updValue: val,
                      },
                    })
                  }
                  type="text"
                  isValidationTriggered={
                    isValidationTriggered || isSectionValidationTriggered[1]
                  }
                />
              </div>
            </div>
          </>
        )}

        <div className="grid grid-cols-1 sm:col-span-12 col-span-12 gap-5 bg-white sm:p-3">
          <TextArea
            className=""
            id="specialInstruction"
            label="Special Instruction"
            name="specialInstruction"
            rows={4}
            value={
              typeof referenceObj.specialInstruction == "boolean"
                ? ""
                : props.specialInstructions ? props.specialInstructions : referenceObj.specialInstruction
            }
            onChange={(val: string) =>
              dispatch({
                type: UPDATE_REFERENCE_OBJ,
                payload: {
                  specialInstruction : val,
                },
              })
            }
            isValidationTriggered={
              isHazmat &&
              (isValidationTriggered || isSectionValidationTriggered[1])
            }
          />
        </div>

        <div className="grid grid-cols-1 sm:col-span-12 col-span-12 gap-5 bg-white sm:p-3">
          <TextField
              className=""
              id={`accessorials`}
              label="Accessorials"
              name={`accessorials`}
              value={
                typeof referenceObj.accessorials == "boolean"
                ? ""
                : props.bolAddressBeforeReQuote?.referenceObj?.accessorials ? props.bolAddressBeforeReQuote?.referenceObj.accessorials : additionalInfoObj.accessorials != null ? additionalInfoObj.accessorials : referenceObj.accessorials
              }
              type="string"
              disabled
              isValidationTriggered={false}
            />
        </div>
      </div>
    </div>
  );
};
