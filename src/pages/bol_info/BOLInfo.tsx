import React, {useEffect, useState} from "react";
import {Breadcrumb} from "components/common/breadcrumb/Breadcrumb";
import ShipperForm from "./bolform/ShipperForm";
import {ReferenceInfoWrapper} from "./bolform/ReferenceInfoWrapper";
import {ShippmentDetails} from "./bolform/ShippmentDetails";
import {InsuranceAndOtherDetails} from "./bolform/InsuranceAndOtherDetails";
import ProgressBar from "./common/ProgressBar";
import {SaveDispatch} from "./bolform/SaveDispatchButtonFunctionality";
import {RootState} from "store/globalstore";
import {useSelector} from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
const MAX_MOBILE_SCREEN_WIDTH = 768;

interface PropTypes {
  isBolDetail?: boolean,
  isBolMenu?: boolean,
  setAddressUpdInfo?: Function;
  marshQuoteResponse: any;
  upsCapitalGenerateQuoteResponse: any;
  insuranceInformation?: any;
  accessorial?: any;
  pickupDate?: Date;
  tariffId?: string;
  bolAddressBeforeReQuote?: any;
  data?: any;
  premiumAmount?: string;
  insuranceTermsAndConditionsDocument?: string;
  refetch?: Function;
  isModal?: boolean;
  transitTime?: number;
  isBlueGrace?: boolean;
}

const defaultValues = {
  is_stackable: false,
  specialInstruction: ""
};

type DefaultSettingFormTypes = {
  is_stackable: boolean,
  specialInstruction: string
}

export const BOLInfo = ({
                          isBolDetail,
                          isBolMenu,
                          setAddressUpdInfo,
                          marshQuoteResponse,
                          upsCapitalGenerateQuoteResponse,
                          insuranceInformation,
                          accessorial,
                          pickupDate,
                          tariffId,
                          bolAddressBeforeReQuote,
                          data,
                          premiumAmount,
                          insuranceTermsAndConditionsDocument,
                          refetch,
                          isModal,
                          transitTime,
                          isBlueGrace
                        }: PropTypes) => {
  const {insurance_toggle_button} = useSelector(
    (state: RootState) => state.bolInfoReducer.upsCapitalInsuranceObj
  );
  const [isMobileView, setIsMobileView] = useState(
    window.innerWidth <= MAX_MOBILE_SCREEN_WIDTH
  );
  const [price, setPrice] = useState("");
  const [rePickDate, setRePickDate] = useState("")
  const [isValidatePrice, setIsValidatePrice] = useState(true);
  const [isChanged, setIsChanged] = useState(false);
  const formMethods = useForm<DefaultSettingFormTypes>({
    defaultValues: defaultValues,
  });
  useEffect(() => {
    function checkForWindowResize() {
      if (window.innerWidth <= MAX_MOBILE_SCREEN_WIDTH) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
    }

    window.addEventListener("resize", checkForWindowResize);
  });

  return (
    <>
    <FormProvider {...formMethods}>
      {!isBolDetail && <Breadcrumb title="Bill of Lading Information" />}
      <div className="grid grid-cols-12">
        {!isBolDetail && !isMobileView && (
          <div className="col-span-2">
            <ProgressBar/>
          </div>
        )}

        <div className={`${isBolDetail || isMobileView ? "col-span-12" : "col-span-10 w-11/12"}`}>

          <ShipperForm setAddressUpdInfo={setAddressUpdInfo}
                       isBolDetail={isBolDetail} isBolMenu={isBolMenu}
                       bolAddressBeforeReQuote={bolAddressBeforeReQuote}/>
          <ReferenceInfoWrapper isBolDetail={isBolDetail} isBolMenu={isBolMenu} accessorial={accessorial}
                                specialInstructions={data?.specialInstructions}
                                bolAddressBeforeReQuote={bolAddressBeforeReQuote}/>
          <ShippmentDetails isBolDetail={isBolDetail} isBolMenu={isBolMenu}
                            bolAddressBeforeReQuote={bolAddressBeforeReQuote}/>
          <InsuranceAndOtherDetails isBolDetail={isBolDetail} isBolMenu={isBolMenu}
                                    marshQuoteResponse={marshQuoteResponse}
                                    upsCapitalGenerateQuoteResponse={upsCapitalGenerateQuoteResponse}
                                    pickupDate={pickupDate} bolAddressBeforeReQuote={bolAddressBeforeReQuote}
                                    isAdmin={data?.baseRate} setPrice={setPrice} setRePickDate={setRePickDate}
                                    isValidatePrice={isValidatePrice} isChanged={isChanged} setIsChanged={setIsChanged}
                                    premiumAmount={premiumAmount}
                                    insuranceTermsAndConditionsDocument={insuranceTermsAndConditionsDocument}
                                    transitTime={transitTime} isBlueGrace={isBlueGrace}/>
          <SaveDispatch insuranceInformation={insurance_toggle_button && insuranceInformation}
                        marshQuoteResponse={marshQuoteResponse}
                        upsCapitalGenerateQuoteResponse={upsCapitalGenerateQuoteResponse} tariffId={tariffId}
                        accessorial={accessorial} isAdmin={data?.baseRate} price={price} rePickDate={rePickDate}
                        setIsValidatePrice={setIsValidatePrice} setIsChanged={setIsChanged} refetch={refetch}
                        isModal={isModal}/>
        </div>
      </div>
    </FormProvider>
    </>
  );
};
