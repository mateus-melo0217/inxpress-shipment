// @ts-nocheck
import {useCallback, useEffect, useState} from "react";
import {useLocation} from 'react-router-dom'
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Container } from "components/common/container/Container";
import RadioIcons from "components/forms/RadioIcons";
import InputText from "components/forms/InputText";
import { LinkIconLabel } from "components/common/navigation/Links/LinkIconLabel/LinkIconLabel";
import Button from "components/forms/buttons/Button";
import { FaExchangeAlt } from "react-icons/fa";
import DropdownCountry from "components/forms/DropdownCountry";
import {ExtraOptions} from "./extra_options/ExtraOptions";
import {LoadItemsInputs} from "./load_information/LoadItemsInputs";
import {FilterFormTypes} from "./FilterFormTypes";
import {defaultValues} from "./FilterFormDefaultValues";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/globalstore";
import { dispatchPricingData } from "pages/bol_info/utility/BolDataDispatcher";
import { isEmpty, isNil, isUndefined} from "lodash";
import {AddressBookDialog, Overlay} from "../../bol_info/common/AddressBookDialog";
import { PostalCodeSearchRes } from "pages/bol_info/constants/BOLConstants";
import {useAccessorials, useCommodities, useCountries, useDefaultAddresses, usePackageTypes, useData} from "./FilterFormQueries";
import AutoComplete from "components/forms/AutoComplete";
import CustomDatePicker from "components/forms/DatePicker";
import { Warning } from "./modals/Warning";
import ApiClient from "utils/apiClient";
import {validationLinearFt} from "utils/validateHelpers";
import {formatArray, getNameArray} from "utils/formatData"
import { UPDATE_POPULATION_OBJ, UPDATE_REFERENCE_OBJ } from "actions";

interface PropTypes {
  setFilters: Function;
  dataId: undefined|string
  addressUpdInfo: any;
  setOpenQuoteResult: Function;
  setIsRestricted: Function;
  setShowModal: Function;
  setIsInsuranceVal: Function;
}

export const FilterForm = ({ setFilters, dataId, addressUpdInfo, setOpenQuoteResult, setIsRestricted, setShowModal, isAddedBookInfo, setIsAddedBookInfo, setIsInsuranceVal }: PropTypes) => {
  const dispatch = useDispatch();
  const shipperConsObj = useSelector(
    (state: RootState) => state.bolInfoReducer.shipperConsObj
  );
  const addressBookData = useSelector((state: RootState) => state.bolInfoReducer.addressBookData);
  const location = useLocation();
  const pathName = location.pathname.split('/');
  const isShipment = pathName[2] === 'shipment'
  const { data: countries } = useCountries();
  const { data: commodities } = useCommodities();
  const { data: accessorials } = useAccessorials();
  const { data: packageTypes } = usePackageTypes();
  const { data: defaultAddresses } = useDefaultAddresses();
  const { data: populateData } = useData(dataId, isShipment);
  const [isWarning, setIsWarning] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isReject, setIsReject] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [isDesCountryChanged, setIsDesCountryChanged] = useState(false);
  const [isOriCountryChanged, setIsOriCountryChanged] = useState(false);
  const [isShowDesWarning, setIsShowDesWarning] = useState(false);
  const [isShowOriWarning, setIsShowOriWarning] = useState(false);
  const [isOriCodeChanged, setIsOriCodeChanged] = useState(false);
  const [isDesCodeChanged, setIsDesCodeChanged] = useState(false);


  const formMethods = useForm<FilterFormTypes>({
    defaultValues: defaultValues,
  });
  // monitor total weight value and load_information.
  formMethods.watch('totalWeight');
  formMethods.watch('totalCubic');
  formMethods.watch('totalPCF');
  formMethods.watch('load_information');
  formMethods.watch('load_item');
  formMethods.watch('linearFt');
  formMethods.watch('parcel_type');
  formMethods.watch('origin_country');
  formMethods.watch('destination_country');
  formMethods.watch('origin_post_code');
  formMethods.watch('destination_post_code');

  // get total weight and freight type from react-hook-form context
  const totalWeight = formMethods.getValues().totalWeight;
  const totalCubic = formMethods.getValues().totalCubic;
  const totalPCF = formMethods.getValues().totalPCF;
  const freightType = formMethods.getValues().parcel_type;
  const linearFt = formMethods.getValues().linearFt;
  const load_item = formMethods.getValues().load_item;
  // const load_information = formMethods.getValues().load_information;

  useEffect(() => {
    // check total weight and freight type, and display modal 
    if (validationLinearFt(load_item) && linearFt && totalWeight) {
      if (!isCancel && !isConfirm && freightType.length === 2) {
        setIsWarning(true);
      }
      if ((totalCubic >= 350 && totalPCF <= 3) || (!isCancel && !isAccept && freightType.length === 1 && (((linearFt >= 12 || totalWeight >= 5000) && freightType[0] === 'LTL') || (linearFt < 12 && totalWeight < 5000 && freightType[0] === 'VOLUME')))) {
        setIsWarning(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalWeight, linearFt, freightType, totalCubic, totalPCF, load_item])

  const setUserDefaultValues = useCallback(() => {

    // get default origin address
    const defaultOriginAddress = defaultAddresses?.defaultOriginAddress;
    if(!isNil(defaultOriginAddress)){
      formMethods.setValue('origin_country', countries.find(obj => obj.code === defaultOriginAddress.countryCode));
      formMethods.setValue('origin_state', defaultOriginAddress.stateCode);
      formMethods.setValue('origin_city', defaultOriginAddress.city);
      formMethods.setValue('origin_post_code', defaultOriginAddress.postalCode);     
      formMethods.setValue('origin_address1', defaultOriginAddress.address1);
      formMethods.setValue('origin_address2', defaultOriginAddress.address2);
      formMethods.setValue('origin_companyName', defaultOriginAddress.companyName);
      formMethods.setValue('origin_contactName', defaultOriginAddress.contactName);
      formMethods.setValue('origin_email', defaultOriginAddress.email);
      formMethods.setValue('origin_phone', defaultOriginAddress.phone.replace(/ /g, ''));
      formMethods.setValue('origin_address_id', defaultOriginAddress.addressBookAddressId);
    }

    // get default destination address
    const defaultDestinationAddress = defaultAddresses?.defaultDestinationAddress;
    if(!isNil(defaultDestinationAddress)){
      formMethods.setValue('destination_country',
          countries.find(obj => obj.code === defaultDestinationAddress.countryCode)
      );
      formMethods.setValue('destination_state', defaultDestinationAddress.stateCode);
      formMethods.setValue('destination_city', defaultDestinationAddress.city);
      formMethods.setValue('destination_post_code', defaultDestinationAddress.postalCode); 
      formMethods.setValue('destination_address1', defaultDestinationAddress.address1);
      formMethods.setValue('destination_address2', defaultDestinationAddress.address2);
      formMethods.setValue('destination_companyName', defaultDestinationAddress.companyName);
      formMethods.setValue('destination_contactName', defaultDestinationAddress.contactName);
      formMethods.setValue('destination_email', defaultDestinationAddress.email);
      formMethods.setValue('destination_phone', defaultDestinationAddress.phone.replace(/ /g, ''));    
    } else {
      formMethods.setValue('destination_country', countries.find(obj => obj.code === 'US'))
      formMethods.setValue('destination_state', '');
      formMethods.setValue('destination_city', '');
      formMethods.setValue('destination_post_code', '');
      formMethods.setValue('destination_address1', '');
      formMethods.setValue('destination_address2', '');
      formMethods.setValue('destination_companyName', '');
      formMethods.setValue('destination_contactName', '');
      formMethods.setValue('destination_email', '');
      formMethods.setValue('destination_phone', ''); 
    }

  }, [formMethods, countries, defaultAddresses]);

  const setShipmentRequoteValues = useCallback(() => {
    if(!isNil(populateData.shipperAddress)){
    // origin address
    formMethods.setValue('origin_country', countries.find(obj => obj.code === populateData.shipperAddress.countryCode));
    formMethods.setValue('origin_state', populateData.shipperAddress.stateCode);
    formMethods.setValue('origin_city', populateData.shipperAddress.city);
    formMethods.setValue('origin_post_code', populateData.shipperAddress.postalCode);
    }
    // destination address
    formMethods.setValue('destination_country', countries.find(obj => obj.code === populateData?.consigneeAddress.countryCode));
    formMethods.setValue('destination_state', populateData?.consigneeAddress.stateCode);
    formMethods.setValue('destination_city', populateData?.consigneeAddress.city);
    formMethods.setValue('destination_post_code', populateData?.consigneeAddress.postalCode);

    // load items
    formMethods.setValue('load_item', populateData?.freightItems.map(item => ({
      dimension_length: item.dimensions.length,
      dimension_width: item.dimensions.width,
      dimension_height: item.dimensions.height,
      weight: item.weight,
      weight_unit: { value: 'Lbs', label: 'Lbs' },
      commodity: typeof item.commodityDescription === 'string' ? {value: item.commodityDescription, label: item.commodityDescription} : commodities.find(obj => obj.label === item.commodityDescription),
      commodity_nmfc: item.nmfcCode,
      class: {value: item.classCode, label: item.classCode},
      type: {value: item.packageType, label: item.packageType},
      units: item.numberOfUnits,
      is_stackable: item.stackable,
      is_hazmat: item.hazmat
    })))

    // load information
    formMethods.setValue("accessorial", formatArray(populateData?.accessorials, accessorials));

  }, [formMethods, countries, populateData, commodities, accessorials]);

  const setQuoteRequoteValues = useCallback(() => {
    if(!isNil(populateData.freightQuoteRequest)){
      // origin address
      formMethods.setValue('origin_country', countries.find(obj => obj.code === 'US'));
      formMethods.setValue('origin_state', populateData.freightQuoteRequest.originState);
      formMethods.setValue('origin_city', populateData.freightQuoteRequest.originCity);
      formMethods.setValue('origin_post_code', populateData.freightQuoteRequest.originAddressCode);
    }
    // destination address
    formMethods.setValue('destination_country', countries.find(obj => obj.code === populateData.freightQuoteRequest.destinationCountry));
    formMethods.setValue('destination_state', populateData.freightQuoteRequest.destinationState);
    formMethods.setValue('destination_city', populateData.freightQuoteRequest.destinationCity);
    formMethods.setValue('destination_post_code', populateData.freightQuoteRequest.destinationAddressCode);

    // load information
    formMethods.setValue('load_item', populateData.freightQuoteRequest.freightItems.map(item => ({
      dimension_length: item.dimensions.length,
      dimension_width: item.dimensions.width,
      dimension_height: item.dimensions.height,
      weight: item.weight,
      weight_unit: { value: 'Lbs', label: 'Lbs' },
      commodity: typeof item.commodityDescription === 'string' ? {value: item.commodityDescription, label: item.commodityDescription} : commodities.find(obj => obj.label === item.commodityDescription),
      commodity_nmfc: item.nmfcCode,
      class: {value: item.classCode, label: item.classCode},
      type: {value: item.packageType, label: item.packageType},
      units: item.numberOfUnits,
      is_stackable: item.stackable,
      is_hazmat: item.hazmat
    })))

    // load freight information
    formMethods.setValue('parcel_type', populateData.freightQuoteRequest.serviceTypes);

     // load information
  
     formMethods.setValue("accessorial", formatArray(getNameArray(populateData?.accessorials), accessorials)); 

  }, [formMethods, countries, populateData, commodities, accessorials]);

  useEffect(()=>{
    if(!isEmpty(populateData)){
      dispatch({
        type: UPDATE_POPULATION_OBJ,
        payload: populateData
      })
    }
  },[populateData, dispatch])

  useEffect(() => {
    if(countries) {
      if(isUndefined(populateData)){
        const urlSegments = window.location.pathname.split("/");
        const lastSegment = urlSegments[urlSegments.length - 1];
        if(lastSegment === "get_pricing") setUserDefaultValues();
      } else {
        if (isShipment) {
          setShipmentRequoteValues();
        } else {
          setQuoteRequoteValues();
        }
      }
    }
  }, [countries, populateData, setUserDefaultValues, setShipmentRequoteValues, setQuoteRequoteValues, isShipment]);

  useEffect(() => {
    if (Array.isArray(addressUpdInfo)) {
      addressUpdInfo.forEach((item: any) => {
        if (item.key.indexOf('origin') !== -1) {
          formMethods.setValue('origin_state', '');
          formMethods.setValue('origin_city', '');
          formMethods.setValue('origin_post_code', '');
        } else if (item.key.indexOf('destination') !== -1) {
          formMethods.setValue('destination_state', '');
          formMethods.setValue('destination_city', '');
          formMethods.setValue('destination_post_code', '');
        }
      });
    }
  }, [formMethods, addressUpdInfo])

  useEffect(() => {
    if(isDesCountryChanged){
      formMethods.setValue('destination_state', '');
      formMethods.setValue('destination_city', '');
      formMethods.setValue('destination_post_code', '');
      setIsShowDesWarning(false);
    }
  }, [isDesCountryChanged, formMethods])

  useEffect(() => {
    if(isOriCountryChanged){
      formMethods.setValue('origin_state', '');
      formMethods.setValue('origin_city', '');
      formMethods.setValue('origin_post_code', '');    
      setIsShowOriWarning(false);
    }
  }, [isOriCountryChanged, formMethods])

  const checkAreaRestricted = async (postCode, state) => {
      const restrictedArea = await ApiClient.get('citystatelookup/restrictarea');
      if (restrictedArea.postalCodes.includes(postCode.destination) || restrictedArea.postalCodes.includes(postCode.origin) || restrictedArea.states.includes(state.destination) || restrictedArea.states.includes(state.origin)) {
        return true;
      } else {
        return false;
      }
  }

  const onSubmit: SubmitHandler<FilterFormTypes> = async (data) => {
    // display warning message for confirmation
    if(!isAccept && isCancel && !isConfirm) {
      setIsWarning(true);
      setIsConfirm(true);
      return;
    }

    const {destination_country, destination_post_code, destination_state, origin_country, origin_post_code, origin_state} = data;
    if (destination_country.value === 'CA' && origin_country.value === 'CA') {
        setIsRestricted({
            status: true,
            case: 'There are no suitable services available from Canada to Canada.'
        })
        setShowModal(true);
        return;
    }

    const postCode = {
      destination: destination_post_code,
      origin: origin_post_code
    }
    const state = {
      destination: destination_state,
      origin: origin_state
    }

    const isRestricted = await checkAreaRestricted(postCode, state);
    // format request data to send it to the backend
    let formatDatas = {};
    if(isAccept){
      if (data.linearFt < 12 && data.totalWeight < 5000) {
        formatDatas = {...data, "acceptLtl": true, "acceptVolume": null}
      } else if (data.linearFt >= 12 || data.totalWeight >= 5000) {
        formatDatas = {...data, "acceptLtl": null, "acceptVolume": true}
      }
    }
    else if (isReject) {
      if (data.linearFt < 12 && data.totalWeight < 5000) {
        formatDatas = {...data, "acceptLtl": false, "acceptVolume": null}
      } else if (data.linearFt >= 12 || data.totalWeight >= 5000) {
        formatDatas = {...data, "acceptLtl": null, "acceptVolume": false}
      }
    } 
    else {
      formatDatas = {...data, "acceptLtl": null, "acceptVolume": null}
    }
    setIsConfirm(false);
    setIsCancel(false);
    setIsAccept(false);
    setIsReject(false);

    if (isRestricted) {
      setIsRestricted({
          status: true,
          case: 'There are no suitable services available to or from Alaska and Hawaii.'
      });
      setOpenQuoteResult(true);
      setFilters(formatDatas);
    } else {
      setIsRestricted(false);
      setOpenQuoteResult(true);
      setFilters(formatDatas);
      dispatchPricingData(formatDatas, addressBookData, dispatch, isAddedBookInfo, setIsAddedBookInfo, shipperConsObj);
    }
    setShowModal(true);
  };

  const [isShipperAddressBookOpen, setShipperAddressBookOpen] = useState(false);

  const addAddressBookInfo = (isShipperInfo: boolean, addressInfo: AddressBookEntry) => {
    setIsAddedBookInfo(true);
    setShipperAddressBookOpen(false);

    if (isShipperInfo) {
      formMethods.setValue('origin_country', countries.find(obj => obj.code === addressInfo.countryCode));
      formMethods.setValue('origin_state', addressInfo.stateCode);
      formMethods.setValue('origin_city', addressInfo.city);
      formMethods.setValue('origin_post_code', addressInfo.postalCode);

      /* Additional info required for bol form */
      formMethods.setValue('origin_address_id', addressInfo.addressBookAddressId);
      /********************************************/

      return null;
    }

    formMethods.setValue('destination_country', countries.find(obj => obj.code === addressInfo.countryCode));
    formMethods.setValue('destination_state', addressInfo.stateCode);
    formMethods.setValue('destination_city', addressInfo.city);
    formMethods.setValue('destination_post_code', addressInfo.postalCode);

    /* Additional info required for bol form */
    formMethods.setValue('destination_address_id', addressInfo.addressBookAddressId);
    /********************************************/

  }

  const swapValue = (srcKey, destinationKey, srcVal, destinationVal) => {
    formMethods.setValue(srcKey, destinationVal);
    formMethods.setValue(destinationKey, srcVal);
  }

  const swapOriginDestination = () => {
    formMethods.trigger(['origin_post_code', 'origin_state', 'origin_city', 'destination_post_code','destination_state', 'destination_city'])
    swapValue('origin_country', 'destination_country', formMethods.getValues("origin_country"), formMethods.getValues("destination_country"));
    swapValue('origin_state', 'destination_state', formMethods.getValues("origin_state"), formMethods.getValues("destination_state"));
    swapValue('origin_city', 'destination_city', formMethods.getValues("origin_city"), formMethods.getValues("destination_city"));
    swapValue('origin_post_code', 'destination_post_code', formMethods.getValues("origin_post_code"), formMethods.getValues("destination_post_code"));
    swapValue('origin_address_id', 'destination_address_id', formMethods.getValues("origin_address_id"), formMethods.getValues("destination_address_id"));
    swapValue('origin_address1', 'destination_address1', formMethods.getValues("origin_address1"), formMethods.getValues("destination_address1"));
    swapValue('origin_address2', 'destination_address2', formMethods.getValues("origin_address2"), formMethods.getValues("destination_address2"));
    swapValue('origin_companyName', 'destination_companyName', formMethods.getValues("origin_companyName"), formMethods.getValues("destination_companyName"));
    swapValue('origin_contactName', 'destination_contactName', formMethods.getValues("origin_contactName"), formMethods.getValues("destination_contactName"));
    swapValue('origin_email', 'destination_email', formMethods.getValues("origin_email"), formMethods.getValues("destination_email"));
    swapValue('origin_phone', 'destination_phone', formMethods.getValues("origin_phone"), formMethods.getValues("destination_phone"));
  }

  const handleResetQuote = (e) => {
    e.preventDefault()
    // state for quote result
    setOpenQuoteResult(false);
    // reset form
    formMethods.reset(defaultValues)
    setUserDefaultValues();
  }

  const clearAddress = (id) => {
    if(id === "origin"){
      formMethods.setValue('origin_state', '');
      formMethods.setValue('origin_city', '');
      setIsShowOriWarning(false);
    }
    else {
      formMethods.setValue('destination_state', '');
      formMethods.setValue('destination_city', '');
      setIsShowDesWarning(false);
    }
  }

  useEffect(() => {
    const urlSegments = window.location.pathname.split("/");
    const lastSegment = urlSegments[urlSegments.length - 1];
    if(lastSegment === "get_pricing") {
      ApiClient.get(`freight/default-settings`)
        .then((response: any) => {
            const accessorialLists = response.data.accessorials.map((item: any) => ({value:item.accessorialCode.code, label: item.accessorialCode.name}));
            formMethods.setValue('accessorial', accessorialLists);
            formMethods.setValue('load_item.0.is_stackable', response.data.stackable)
            dispatch({
              type: UPDATE_REFERENCE_OBJ,
              payload: {
                specialInstruction: response.data.specialInstructions,
              }
            });
        }).catch((err: any) => {
          console.log("Network Error:", err)
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

    return (
      <Container>
        <FormProvider {...formMethods}>
          <form
              className={isWarning?"flex flex-col gap-y-16 opacity-50":"flex flex-col gap-y-16"}
              onSubmit={formMethods.handleSubmit(onSubmit)}
          >
            {isShipperAddressBookOpen ? (
                <>
                  <Overlay />
                  <AddressBookDialog
                      fromShipperForm={false}
                      isShipper={true}
                      onClick={(isShipperClicked: boolean, address: AddressBookEntry) => addAddressBookInfo(isShipperClicked, address)}
                      onDialogClose={() => setShipperAddressBookOpen(false)} />
                </>
            ) : (
                <></>
            )}
            <div className="flex justify-between flex-col customXl:flex-row">
              <div className="mt-8 customXl:w-[30%]">
                <h4 className="text-sxl capitalize text-medium-gray font-medium">Freight Information</h4>
                <RadioIcons
                    id="parcel_type"
                    label="type"
                    validation={{ required: "Required Field" }}
                    setIsCancel={setIsCancel}
                    setIsAccept={setIsAccept}
                    setIsConfirm={setIsConfirm}
                    setIsReject={setIsReject}
                />
              </div>
              <div className="mt-8 customXl:w-[65%]">
                <div className="flex justify-between">
                  <h4 className="text-sxl capitalize text-medium-gray font-medium">Origin and destination</h4>
                  <LinkIconLabel
                      icon="RiContactsBook2Fill"
                      onClick={() => setShipperAddressBookOpen(true)}
                      label="Address Book"
                  />
                </div>
                <div className="flex flex-col customMd:justify-between customMd:flex-row customMd:items-center">
                  <div className="customMd:w-[45%] mb-5">
                    <div className="relative">
                      <div className="flex flex-col">
                        <div className="flex gap-4">
                            <AutoComplete
                              type="origin_country"
                              id="origin_post_code"
                              label="Post Code"
                              placeholder="post code"
                              validation={{ required: "Required Field" }}
                              onSuggestionClicked={(suggestion: PostalCodeSearchRes) => {
                                formMethods.setValue('origin_state', suggestion.stateCode);
                                formMethods.setValue('origin_city', suggestion.cityName);
                                formMethods.setValue('origin_post_code', suggestion.postalCode);
                                formMethods.clearErrors('origin_city');
                                formMethods.clearErrors('origin_state');
                              }}
                              country={formMethods.getValues().origin_country?.label}
                              clearAddress={clearAddress}
                              setIsOriCodeChanged={setIsOriCodeChanged}
                              setIsShowOriWarning={setIsShowOriWarning}
                          />
                            <InputText
                                className="w-64"
                                id="origin_state"
                                label="State"
                                placeholder="state"
                                validation={{ required: "Required Field", maxLength: {value:2, message: "Must be two characters."}}}
                            />
                            <InputText
                                className="w-full"
                                id="origin_city"
                                label="City"
                                placeholder="city"
                                validation={{ required: "Required Field" }}
                            />
                        </div>
                        {isOriCodeChanged && isShowOriWarning && <p className="text-center text-[#dc012f] font-bold mt-[5px]">Your Postcode does not match the format country!</p>}
                        <DropdownCountry
                            id="origin_country"
                            label="Country"
                            placeholder="country"
                            options={countries}
                            className="w-full"
                            validation={{ required: "Required Field" }}
                            setIsOriCountryChanged={setIsOriCountryChanged}
                            isOriCountryChanged={isOriCountryChanged}
                        />
                      </div>
                    </div>
                  </div>
                  <button className="bg-transparent border-none w-[30px] h-[30px] p-0 m-0 transform rotate-y-180 rotate-90 customMd:rotate-0"
                   onClick={() => swapOriginDestination()} type='button'>
                    <FaExchangeAlt color="#167979" size="2em"/>
                  </button>
                  <div className="customMd:w-[45%]">
                    <div className="relative">
                      <div className="flex flex-col">
                        <div className="flex gap-4">
                            <AutoComplete
                              type='destination_country'
                              id="destination_post_code"
                              label="Post Code"
                              placeholder="post code"
                              validation={{ required: "Required Field" }}
                              onSuggestionClicked={(suggestion: PostalCodeSearchRes) => {
                                formMethods.setValue('destination_state', suggestion.stateCode);
                                formMethods.setValue('destination_city', suggestion.cityName);
                                formMethods.setValue('destination_post_code', suggestion.postalCode);
                                formMethods.clearErrors('destination_city');
                                formMethods.clearErrors('destination_state');
                              }}
                              country={formMethods.getValues().destination_country?.label}
                              clearAddress={clearAddress}
                              setIsDesCodeChanged={setIsDesCodeChanged}
                              setIsShowDesWarning={setIsShowDesWarning}
                          />
                            <InputText
                                className="w-64"
                                id="destination_state"
                                label="State"
                                placeholder="state"
                                validation={{ required: "Required Field", maxLength: {value:2, message: "Must be two characters."}}}
                            />
                            <InputText
                                className="w-full"
                                id="destination_city"
                                label="City"
                                placeholder="city"
                                validation={{ required: "Required Field" }}
                            />
                        </div>
                        {isDesCodeChanged && isShowDesWarning && <p className="text-center text-[#dc012f] font-bold">Your Postcode does not match the format country!</p>}
                        <DropdownCountry
                            id="destination_country"
                            label="Country"
                            placeholder="country"
                            options={countries}
                            className="w-full"
                            validation={{ required: "Required Field" }}
                            setIsDesCountryChanged={setIsDesCountryChanged}
                            isDesCountryChanged={isDesCountryChanged}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block w-full h-px -mt-8 border-b border-dashed border-light-gray"></div>
            <div className="">
              <LoadItemsInputs {...{ commodities, packageTypes }} />
            </div>
            <div>
              <h4 className="text-sxl capitalize text-medium-gray font-medium mb-8">Load Information</h4>
              <div className="flex flex-col customMd:flex-row" id="load_information">
                  <CustomDatePicker name="pickupDate" validation={{ required: "Required Field" }} label="PickUp Date"/>
                  <ExtraOptions accessorials={accessorials} setIsInsuranceVal={setIsInsuranceVal}/>
              </div>
            </div>
            <div className="flex">
              <Button id="btn" label="get pricing" />
              <button className="absolute right-[10px] top-[50px] customMs:top-[73px] customMd:top-[95px] p-5 text-[1.5rem] customMs:text-sxl rounded-md bg-white" onClick={handleResetQuote}><span className="text-green-1 font-bold text-[1.5rem] customMs:text-sxl">+</span> Create a new quote</button>
            </div>
          </form>
          {isWarning && <Warning setIsWarning={setIsWarning} setIsAccept={setIsAccept} setIsCancel={setIsCancel} isConfirm={isConfirm} setIsReject={setIsReject}/>}
        </FormProvider>
      </Container>
  );
};