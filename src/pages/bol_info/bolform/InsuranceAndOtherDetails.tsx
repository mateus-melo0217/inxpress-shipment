import {useEffect, useState} from "react";
import {FaCalendarPlus, FaCreditCard} from "react-icons/fa";
import {ImInfo} from "react-icons/im";
import {TextField} from "components/bol_components/TextField";
import {Datepicker} from "components/bol_components/DatePicker";
import {ToggleSwitch} from "../../../components/bol_components/ToggleSwitch";
import {BsInfoCircle} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "store/globalstore";
import {
  UPDATE_BOL_TYPE_INFO,
  UPDATE_HIGHLIGHTED_TILL,
  UPDATE_IS_SECTION_VAL_TRIGGERED,
  UPDATE_PICK_UP_DETAILS_INFO,
  UPDATE_PICK_UP_DETAILS_OBJ,
  UPDATE_DELIVERY_DETAILS_INFO,
  UPDATE_DELIVERY_DETAILS_OBJ,
  UPDATE_SHOW_ADDRESS_CHNG_CONF,
  UPDATE_UPSCAPITAL_INSURANCE_INFO,
  UPDATE_VALID_SECTIONS,
} from "actions";
import {dateToString, getDefaultDeliveryTime, validateData, valIsAddressDataChanged} from "../utility/Utility";
import {
  AddressBookEntry,
  PICKUP_CLOSE_TIME_OPTIONS,
  PICKUP_READY_TIME_OPTIONS,
  ShipmentValues
} from "../constants/BOLConstants";
import TimePickDropdown from "components/bol_components/TimePickDropdown";
import Tippy from '@tippyjs/react';
import {getEstimatedDeliveryDate} from "../api/bol_api";
import {AxiosResponse} from "axios";
import {toNumber} from "lodash";

export const InsuranceAndOtherDetails = (props: any) => {
  const upsCapitalInsuranceObj = useSelector(
    (state: RootState) => state.bol_InfoReducer.upsCapitalInsuranceObj
  );
  const pickupDetailsObj = useSelector(
    (state: RootState) => state.bolInfoReducer.pickupDetailsObj
  );
  const deliveryDetailsObj = useSelector(
    (state: RootState) => state.bolInfoReducer.deliveryDetailsObj
  );
  const salesPriceObj = useSelector(
    (state: RootState) => state.bolInfoReducer.salesPriceObj
  );
  const bolTypeObj = useSelector(
    (state: RootState) => state.bolInfoReducer.bolTypeObj
  );
  const shipperConsObj = useSelector(
    (state: RootState) => state.bolInfoReducer.shipperConsObj
  );
  const referenceObj = useSelector(
    (state: RootState) => state.bolInfoReducer.referenceObj
  );
  const isHazmat = useSelector(
    (state: RootState) => state.bolInfoReducer.isHazmat
  );
  const shipmentDetailsWrapper = useSelector(
    (state: RootState) => state.bolInfoReducer.shipmentDetailsWrapper
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
  const [salesPriceValue, setSalesPriceValue] = useState('');

  const [transitTime, setTransitTime] = useState<number>(0);

  const dispatch = useDispatch();

  const validateAddressDataSave = () => {
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
  }

  const validatePrevSectionsForMarsh = () => {
    if (!props.isBolDetail || props.isBolMenu) {
      validateAddressDataSave();
      dispatch({
        type: UPDATE_HIGHLIGHTED_TILL,
        payload: 4
      });
      dispatch({
        type: UPDATE_IS_SECTION_VAL_TRIGGERED,
        payload: 4
      });
      dispatch({
        type: UPDATE_VALID_SECTIONS,
        payload: getCommonValidationPayload(),
      });
    }
  };

  const validatePrevSectionsForPickUp = () => {
    if (!props.isBolDetail || props.isBolMenu) {
      validateAddressDataSave();
      dispatch({
        type: UPDATE_HIGHLIGHTED_TILL,
        payload: 5
      });
      dispatch({
        type: UPDATE_IS_SECTION_VAL_TRIGGERED,
        payload: 5
      });
      dispatch({
        type: UPDATE_VALID_SECTIONS,
        payload: getCommonValidationPayload(),
      });
    }
  };

  const validatePrevSectionsForBolTypeSalesPrice = () => {
    if (!props.isBolDetail || props.isBolMenu) {
      validateAddressDataSave();
      dispatch({
        type: UPDATE_HIGHLIGHTED_TILL,
        payload: 6
      });
      dispatch({
        type: UPDATE_IS_SECTION_VAL_TRIGGERED,
        payload: 6
      });
      dispatch({
        type: UPDATE_VALID_SECTIONS,
        payload: [...getCommonValidationPayload(),
          {data: pickupDetailsObj, skipKeys: []}
        ]
      });
    }
  };

  const getCommonValidationPayload = () => {
    let refSkipKeysNonHazmat: string[] = [];
    if (!isHazmat) {
      refSkipKeysNonHazmat = [
        "hazmatClass",
        "hazmatType",
        "hazmatUN",
        "hazmatPackageGroup",
        "hazmatPackageType",
        "specialInstruction",
      ];
    }
    return [
      {
        index: 1,
        isValid: validateData([
          {
            data: shipperConsObj,
            skipKeys: ["shipperAddress", "consigneeAddress"],
          },
          {data: shipperConsObj.shipperAddress, skipKeys: ["address2"]},
          {data: shipperConsObj.consigneeAddress, skipKeys: ["address2"]},
        ]),
      },
      {
        index: 2,
        isValid: validateData([
          {
            data: referenceObj,
            skipKeys: [...refSkipKeysNonHazmat, "referenceNumbers"],
          },
          ...referenceObj.referenceNumbers.map((item: string) => ({
            data: {referenceNumber: item},
            skipKeys: [],
          })),
        ]),
      },
      {
        index: 3,
        isValid: validateData([
          ...shipmentDetailsWrapper.shipmentDetails.map(
            (item: ShipmentValues) => ({
              data: {
                commodityDescription: item.commodityDescription,
                reference: item.reference,
              },
              skipKeys: [],
            })
          ),
        ]),
      },
    ];
  };

  const getCloseTime = (time: string | null) => {
    if (time === null) {
      return PICKUP_CLOSE_TIME_OPTIONS;
    }
    const readyTimeIdx = PICKUP_READY_TIME_OPTIONS.findIndex((item) => item.value === time);
    return PICKUP_CLOSE_TIME_OPTIONS.slice(readyTimeIdx);
  }

  const deliveryDateDispatch = (date:string, transitTime: number) => {
    getEstimatedDeliveryDate(date, transitTime).then((res: AxiosResponse<string>) => {
      dispatch({
        type: UPDATE_DELIVERY_DETAILS_INFO,
        payload: {
          updKey: "deliveryDate",
          updValue: res,
        },
      });
    }).catch((error) => {
      console.error('Cannot get delivery time', error);
      const defaultDeliveryDate = getDefaultDeliveryTime(date, 10);
      dispatch({
        type: UPDATE_DELIVERY_DETAILS_INFO,
        payload: {
          updKey: "deliveryDate",
          updValue: defaultDeliveryDate,
        },
      });
    });
  }

  const handleSalesPriceChange = (val: string) => {
    setSalesPriceValue(val);
  }

  useEffect(() => {
    if (props.setIsChanged) {
      props.setIsChanged(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salesPriceValue])

  useEffect(() => {
    if (props.setPrice) {
      props.setPrice(salesPriceValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salesPriceValue])

  useEffect(() => {
    if (props.pickupDate) {
      dispatch({
        type: UPDATE_PICK_UP_DETAILS_INFO,
        payload: {
          updKey: "pickupDate",
          updValue: dateToString(props.pickupDate),
        },
      });
    }
  }, [dispatch, props.pickupDate])

  useEffect(() => {
    if (!props.pickupDate || transitTime === toNumber(props.transitTime)) return;
    const date = dateToString(props.pickupDate) || pickupDetailsObj.pickupDate;
    const newTransitTime = toNumber(props.transitTime);
    setTransitTime(newTransitTime);
    deliveryDateDispatch(date, newTransitTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.transitTime, pickupDetailsObj.pickupDate]);

  useEffect(() => {
    // create new dispatch for avoiding conflict
    const insuranceKey = "totalPremiumAmount";
    const insuranceDispatch = () => {
      dispatch({
        type: UPDATE_UPSCAPITAL_INSURANCE_INFO,
        payload: {
          updKey: insuranceKey,
          updValue: props.bolAddressBeforeReQuote.upsCapitalInsuranceObj[insuranceKey],
        },
      });
    }

    const timeDispatch = () => {
      const startTime = props.bolAddressBeforeReQuote.pickupDetailsObj.pickupReadyTime;
      const closeTime = props.bolAddressBeforeReQuote.pickupDetailsObj.pickupCloseTime;
      dispatch({
        type: UPDATE_PICK_UP_DETAILS_OBJ,
        payload: {
          pickupReadyTime: startTime,
          pickupCloseTime: closeTime
        }
      });
    }

    const allDispatch = () => {
      insuranceDispatch();
      timeDispatch();
    }
    const saveAllInformation = () => {
      allDispatch();
    }
    if (props.bolAddressBeforeReQuote) saveAllInformation();
  }, [props.bolAddressBeforeReQuote, dispatch]);

  useEffect(() => {
    if (props.premiumAmount) {
      dispatch({
        type: UPDATE_UPSCAPITAL_INSURANCE_INFO,
        payload: {
          updKey: "totalPremiumAmount",
          updValue: props.premiumAmount,
        },
      })
    }
  }, [props.premiumAmount, dispatch])

  return (
    <div className={`md:grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 
    col-span-12 md:col-span-12 sm:col-span-12 bg-white text-blue-1`}>
      <div
        className={`box border-[1px] rounded-md pt-7 pb-7 pl-7 pr-7
        border-light-gray mt-10 h-11/12 w-[83vw] md:h-64 md:col-span-1 
        sm:h-11/12 sm:w-11/12 
        ${props.isStep4Valid ? "border-green-1" : "border-light-gray"}`}
        onClick={validatePrevSectionsForMarsh}
      >
        <div className="grid grid-cols-3 col-span-12 md:col-span-6 sm:col-span-6 gap-10 bg-white sm:p-2 mt-0">
          <div className="col-span-2 flex items-center">
            <TextField
              className="text-xs"
              id="insurance_premium"
              label="Shipping Protection Premium"
              name="insurance_premium"
              value={
                props.bolAddressBeforeReQuote?.upsCapitalInsuranceObj.totalPremiumAmount
                  ? props.bolAddressBeforeReQuote.upsCapitalInsuranceObj.totalPremiumAmount.toFixed(2)
                  : upsCapitalInsuranceObj.totalPremiumAmount
                    ? Number(upsCapitalInsuranceObj.totalPremiumAmount).toFixed(2)
                    : props.premiumAmount
                      ? Number(props.premiumAmount).toFixed(2)
                      : ""
              }
              onChange={(val: string) =>
                dispatch({
                  type: UPDATE_UPSCAPITAL_INSURANCE_INFO,
                  payload: {
                    updKey: "totalPremiumAmount",
                    updValue: val,
                  },
                })
              }
              onFocus={() => validatePrevSectionsForMarsh()}
              type="number"
              isValidationTriggered={false}
              disabled={true}
            />
          </div>
          <div className="items-center flex font-bold">
            <ToggleSwitch
              label="BUY"
              value={props.premiumAmount ? upsCapitalInsuranceObj.insurance_toggle_button : false}
              onChange={(value: boolean) => {
                dispatch({
                  type: UPDATE_UPSCAPITAL_INSURANCE_INFO,
                  payload: {
                    updKey: "insurance_toggle_button",
                    updValue: props.premiumAmount ? value : false,
                  },
                });
              }}
              disabled={!props.premiumAmount}
            />
          </div>
        </div>
        <div>
          {props.premiumAmount ? (
            <p className={upsCapitalInsuranceObj.insurance_toggle_button ? "text-xl font-bold" : "text-xl"}>
              By proceeding, you acknowledge that you have read and agree to the{' '}
              <a href={props.insuranceTermsAndConditionsDocument} className="text-blue-600" target="_blank"
                 rel="noopener noreferrer">
                Program Terms And Conditions
              </a>
              . Shipping Protection is recommended/provided by UPS Capital Insurance Agency, Inc.
            </p>
          ) : null}
        </div>
      </div>

      <div className={`box border-[1px] rounded-md pt-7 pb-7 pl-7 pr-7
          border-light-gray mt-10 h-11/12 w-[120vw] md:w-[96%] md:col-span-2 
          sm:h-11/12 sm:max-w-[60rem] ${props.isStep5Valid ? "border-green-1" : "border-light-gray"}`}
           onClick={validatePrevSectionsForPickUp}
      >
        <div className="w-full justify-start flex">
          <FaCalendarPlus/>
          <label className="text-lg pl-2 font-bold">PICK UP DETAILS</label>
        </div>
        <div className="w-full justify-start mt-2 gap-4 flex">
          <Datepicker
            selectedDate={props.pickupDate ? dateToString(props.pickupDate) : pickupDetailsObj.pickupDate}
            onChange={(date: any) => {
              dispatch({
                type: UPDATE_PICK_UP_DETAILS_OBJ,
                payload: {
                  pickupDate: date
                },
              });
            }}
            isValidationTriggered={isValidationTriggered || isSectionValidationTriggered[4]}
            minDate/>
          <div className="w-full justify-start gap-4 mt-4 flex items-center">
            <TimePickDropdown
              time={pickupDetailsObj.pickupReadyTime}
              placeholder="Ready Time"
              name="ready_time"
              options={PICKUP_READY_TIME_OPTIONS}
              onChange={(time: any) => {
                dispatch({
                  type: UPDATE_PICK_UP_DETAILS_OBJ,
                  payload: {
                    pickupReadyTime: time.value,
                    pickupCloseTime: getCloseTime(time.value)[0].value
                  },
                });
              }}
              initialValue={PICKUP_READY_TIME_OPTIONS.find((opt: any) => opt.value === (pickupDetailsObj.pickupReadyTime ? pickupDetailsObj.pickupReadyTime : props.bolAddressBeforeReQuote?.pickupDetailsObj?.pickupReadyTime))}
              isValidationTriggered={isValidationTriggered || isSectionValidationTriggered[4]}/>
            <TimePickDropdown
              time={pickupDetailsObj.pickupCloseTime}
              placeholder="Close Time"
              name="close_time"
              options={getCloseTime(pickupDetailsObj.pickupReadyTime)}
              onChange={(time: any) => {
                dispatch({
                  type: UPDATE_PICK_UP_DETAILS_INFO,
                  payload: {
                    updKey: "pickupCloseTime",
                    updValue: time.value,
                  },
                });
              }}
              initialValue={getCloseTime(pickupDetailsObj.pickupReadyTime ? pickupDetailsObj.pickupReadyTime : props.bolAddressBeforeReQuote?.pickupDetailsObj?.pickupReadyTime).find((opt: any) => opt.value === (pickupDetailsObj.pickupCloseTime ? pickupDetailsObj.pickupCloseTime : props.bolAddressBeforeReQuote?.pickupDetailsObj?.pickupCloseTime))}
              isValidationTriggered={isValidationTriggered || isSectionValidationTriggered[4]}/>
            <Tippy content="This is the time zone for the origin of the shipment" theme="light">
              <span><BsInfoCircle size={20}/></span>
            </Tippy>
          </div>
        </div>

        {props.isBlueGrace && <>
          <div className="w-full justify-start flex pt-2">
            <FaCalendarPlus/>
            <label className="text-lg pl-2 font-bold">DELIVERY DETAILS</label>
          </div>
          <div className="w-full justify-start mt-2 gap-4 flex">
            <Datepicker
              selectedDate={deliveryDetailsObj.deliveryDate}
              onChange={() => {
              }}
              isValidationTriggered={isValidationTriggered || isSectionValidationTriggered[4]}
              minDate
              disabled/>
            <div className="w-full justify-start gap-4 mt-4 flex items-center">
              <TimePickDropdown
                time={deliveryDetailsObj.deliveryReadyTime}
                placeholder="Ready Time"
                name="delivery_ready_time"
                options={PICKUP_READY_TIME_OPTIONS}
                onChange={(time: any) => {
                  dispatch({
                    type: UPDATE_DELIVERY_DETAILS_OBJ,
                    payload: {
                      deliveryReadyTime: time.value,
                      deliveryCloseTime: time.value > deliveryDetailsObj.deliveryCloseTime ? getCloseTime(time.value)[0].value : deliveryDetailsObj.deliveryCloseTime,
                    },
                  });
                }}
                initialValue={PICKUP_READY_TIME_OPTIONS.find((opt: any) => opt.value === deliveryDetailsObj.deliveryReadyTime)}
                isValidationTriggered={isValidationTriggered || isSectionValidationTriggered[4]}/>
              <TimePickDropdown
                time={deliveryDetailsObj.deliveryCloseTime}
                placeholder="Close Time"
                name="delivery_close_time"
                options={getCloseTime(deliveryDetailsObj.deliveryReadyTime)}
                onChange={(time: any) => {
                  dispatch({
                    type: UPDATE_DELIVERY_DETAILS_INFO,
                    payload: {
                      updKey: "deliveryCloseTime",
                      updValue: time.value,
                    },
                  });
                }}
                initialValue={getCloseTime(deliveryDetailsObj.deliveryReadyTime).find((opt: any) => opt.value === deliveryDetailsObj.deliveryCloseTime)}
                isValidationTriggered={isValidationTriggered || isSectionValidationTriggered[4]}/>
              <Tippy
                content="This is the time zone for the destination of the shipment. Some carriers may apply a window fee if outside of business hours from 8am - 3pm."
                theme="light"><span><BsInfoCircle size={20}/></span>
              </Tippy>
            </div>
          </div>
        </>
        }
      </div>
      <div
        className={`box border-[1px] rounded-md pt-7 pb-7 pl-7 pr-7 
        border-light-gray mt-10 h-11/12 w-[20vw]
        ${props.isStep6Valid ? "border-green-1" : ""} 
       
        md:h-64 md:w-[92%] md:col-span-1
        sm:h-11/12 sm:w-11/12 
        `}
        onClick={validatePrevSectionsForBolTypeSalesPrice}
      >
        <div className="w-full justify-start flex">
          <ImInfo/>
          <label className="text-lg pl-2 font-bold">BOL TYPE</label>
        </div>
        <div className={`w-full justify-center mt-10 flex
          ${bolTypeObj.standard_toggle_button ? "" : "opacity-50"}`}>
          <ToggleSwitch
            label="Standard"
            value={typeof bolTypeObj.standard_toggle_button == "number" ? false : bolTypeObj.standard_toggle_button}
            onChange={(val: boolean) => dispatch({
              type: UPDATE_BOL_TYPE_INFO,
              payload: {
                updKey: "standard_toggle_button",
                updValue: val,
              },
            })}/>
        </div>
        <div className={`w-full justify-center mt-4 flex
          ${bolTypeObj.VICS_insurance_toggle_button ? "" : "opacity-50"}`}>
          <ToggleSwitch
            label="VICS"
            value={typeof bolTypeObj.VICS_insurance_toggle_button == "number"
              ? false
              : bolTypeObj.VICS_insurance_toggle_button}
            onChange={(val: boolean) => dispatch({
              type: UPDATE_BOL_TYPE_INFO,
              payload: {
                updKey: "VICS_insurance_toggle_button",
                updValue: val,
              },
            })}/>
        </div>
      </div>
      <div
        className={`box border-[1px] rounded-md pt-7 pb-7 pl-7 pr-7
         
          border-light-gray mt-10 h-11/12 md:w-full
          md:h-64 md:col-span-1 sm:h-11/12 sm:max-w-[44rem] w-[83vw]
          ${props.isStep7Valid ? "border-green-1" : "border-light-gray"}`}
        onClick={validatePrevSectionsForBolTypeSalesPrice}
      >
        <div className="w-full justify-start flex">
          <FaCreditCard/>
          <label className="text-lg pl-2 font-bold">SALES PRICE</label>
        </div>
        <div className="w-full mt-14">
          <TextField
            className=""
            id="sales_price"
            label="Sales Price"
            name="sales_price"
            disabled={!props.isAdmin}
            value={salesPriceObj.sales_price}
            onChange={handleSalesPriceChange}
            type="number"
            isValidationTriggered={isValidationTriggered}
          />
          {!props.isValidatePrice && !isValidationTriggered && !props.isChanged &&
            <p className="text-red-500 mt-[10px]">{props.isAdmin ? "This value must be over sales cost." : ""}</p>}
        </div>
      </div>
    </div>
  );
};
