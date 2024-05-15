import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/globalstore";
import { Quote } from "./Quote";
import { useQuotes } from "./QuotesResultQueries";
import { LoadingIndicator } from "components/common/LoadingIndicator";
import { FilterFormTypes } from "../filter_form/FilterFormTypes";
import { isUndefined } from "lodash";
import { QuotesResultTopBar } from "./QuotesResultTopBar";
import { BOLInfo } from "pages/bol_info/BOLInfo";
import { QuotesResultPaginator, Paginator } from "./QuotesResultPaginator";
import moment from "moment";
import { printQuotes } from "pages/bol_info/api/bol_api";
import { PrintQuoteObj } from "pages/bol_info/constants/BOLConstants";
import { QuoteTypes } from "./QuoteTypes";
import { QuoteErrorModal } from "./QuoteErrorModal";

interface PropTypes {
  filters: FilterFormTypes;
  setFilters: Function;
  setAddressUpdInfo: Function;
  contactInfo: any;
  bolAddressBeforeReQuote: any;
  setBolAddressBeforeReQuote: Function;
  isInsuranceVal:boolean;
}

export const QuotesResult = ({
  filters,
  setFilters,
  setAddressUpdInfo,
  contactInfo,
  bolAddressBeforeReQuote,
  setBolAddressBeforeReQuote,
  isInsuranceVal
}: PropTypes) => {
  const [topBarFilter, setTopBarFilter] = useState({
    bestValue: false,
    quickest: false,
  });
  const [paginator, setPaginator] = useState({ perPage: 100, page: 1 });
  const [selectedQuoteIndex, setSelectedQuoteIndex] = useState(-1);
  const [checkedQuoteIds, setCheckedQuoteIds] = useState<string[]>([]);
  const {
    data: quotes,
    isLoading,
    isFetching,
    isError,
    error
  } = useQuotes(filters, paginator, topBarFilter, isInsuranceVal);
  const marshQuoteResponse = quotes?.marshQuoteResponse;
  const upsCapitalGenerateQuoteResponse = quotes?.upsCapitalGenerateQuoteResponse;
  const insuranceInformation = quotes?.insuranceInformation;
  const accessorial = quotes?.accessorial;
  const prevQuotesDataRef = useRef(quotes?.data);
  const pickupDate = filters?.pickupDate;
  const [showModal, setShowModal] = useState(!quotes?.allQuotes?.length)

  const {
    shipperConsObj,
    referenceObj,
    shipmentDetailsWrapper,
    marshInsuranceObj,
    upsCapitalInsuranceObj,
    pickupDetailsObj
  } = useSelector((state: RootState) => state.bolInfoReducer);

  useEffect(() => {
    if (prevQuotesDataRef.current !== quotes?.data) {
      setSelectedQuoteIndex(-1);
      prevQuotesDataRef.current = quotes?.data;
    }
  }, [quotes?.data]);

  const setAddressUpdInfoAndClearQuotes = (obj: any) => {
    setFilters({});
    setBolAddressBeforeReQuote({
      shipperConsObj: shipperConsObj,
      referenceObj: referenceObj,
      shipmentDetailsWrapper:shipmentDetailsWrapper,
      marshInsuranceObj:marshInsuranceObj,
      upsCapitalInsuranceObj: upsCapitalInsuranceObj,
      upsCapitalGenerateQuoteResponse: upsCapitalGenerateQuoteResponse,
      pickupDetailsObj:pickupDetailsObj
    })
    setSelectedQuoteIndex(-1);
    setAddressUpdInfo(obj);
  };

  if (isLoading || isFetching) {
    return <LoadingIndicator isLoading={true} />;
  }

  //TODO: improve error display
  if (isError) {
    if (error instanceof Error) {
      return <h1>{error.message}</h1>;
    }
  }

  if (isUndefined(quotes)) {
    return null;
  }

  if (!quotes?.allQuotes?.length) {
      return (
          <QuoteErrorModal showModal={showModal} setShowModal={setShowModal} title="We're sorry." content="There were no suitable services available for your freight shipment quote request." contactInfo={contactInfo}/>
      );
  }

  const updQuoteCheck = (quoteId: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedQuoteIds([...checkedQuoteIds, quoteId]);
    } else {
      setCheckedQuoteIds(
        checkedQuoteIds.filter((item) => item !== quoteId)
      );
    }
  };

  const selectAllQuotes = () => {
    setCheckedQuoteIds(quotes.allQuotes.map((quote: QuoteTypes) =>
        quote.providerQuoteItemId));
  };

  const clearAllQuotes = () => {
    setCheckedQuoteIds([]);
  };

  const printSelQuotes = () => {

    const checkedQuotes = quotes.allQuotes
      ? quotes.allQuotes.filter(
          (quote: QuoteTypes) =>
          checkedQuoteIds.indexOf(quote.providerQuoteItemId) !== -1
        )
      : [];

    if (checkedQuotes.length > 0) {
      let numberOfUnits = 0;
      const items = filters.load_item ?
        filters.load_item.map((loadItem: any) => {
        numberOfUnits += Number(loadItem.units);

        return {
          dimensions: {
            length: loadItem.dimension_length,
            width: loadItem.dimension_width,
            height: loadItem.dimension_height,
          },
          weight: loadItem.weight,
          classCode: loadItem.class.value,
          nmfcCode: loadItem.commodity_nmfc,
          packageType: loadItem.type.value,
          commodityDescription: loadItem.commodity.label,
          numberOfUnits: loadItem.units,
        };
      }) : [];

      const totalCubic = filters?.load_item?.reduce(
        (previousValue: any, currentValue: any) =>
          previousValue +
          ((Number(currentValue.dimension_length) *
            Number(currentValue.dimension_width) *
            Number(currentValue.dimension_height)) /
            1728) *
            Number(currentValue.units),
        0
      );

      const totalWeight = filters?.load_item?.reduce(
        (previousValue: any, currentValue: any) =>
          previousValue +
          Number(currentValue.weight) * Number(currentValue.units),
        0
      );

      const totalPcf = Number(totalWeight / totalCubic);

      const printQuoteObj: PrintQuoteObj = {
        quoteGenMoment: moment(),
        origin: {
          countryCode: filters.origin_country.value,
          postalCode: filters?.origin_post_code,
          stateCode: filters.origin_state,
          city: filters.origin_city,
        },
        destination: {
          countryCode: filters.destination_country.value,
          postalCode: filters.destination_post_code,
          stateCode: filters.destination_state,
          city: filters.destination_city,
        },
        items,
        units: numberOfUnits,
        totalCubic,
        totalPcf,
        totalWeight,
        accessorial: filters.accessorial ? filters.accessorial.map(item => item.label).join(", ") : "None accessorial requested",
        quotes: checkedQuotes,
        insuranceAmount: filters.insurance_amount || null,
        premiumAmount: parseInt(quotes.upsCapitalGenerateQuoteResponse?.totalPremiumAmount || quotes.upsCapitalGenerateQuoteResponse?.premiumAmount)
      };
      printQuotes(printQuoteObj);
    }
  };

  return (
    <>
      <QuotesResultTopBar
        {...{
          quotes,
          topBarFilter,
          setTopBarFilter,
          setPaginator,
          printSelQuotes,
          selectAllQuotes,
          clearAllQuotes,
          isControlEnabled: checkedQuoteIds.length > 0,
          marshQuoteResponse,
          upsCapitalGenerateQuoteResponse,
		      insuranceInformation,
          isInsuranceVal
        }}
      />
      <div className="mb-[100px]">
        {quotes.data && quotes.data.map((quote: any, index: number) => (
            <React.Fragment key={index}>
              <Quote
                  index={index}
                  data={{
                    ...quote,
                    isChecked: checkedQuoteIds.indexOf(quote.providerQuoteItemId) !== -1,
                  }}
                  filters={filters}
                  {...{ selectedQuoteIndex }}
                  {...{ updQuoteCheck }}
                  setSelectedQuoteIndex={setSelectedQuoteIndex}
                  uuid={quotes.uuid}
                  marshQuoteResponse={marshQuoteResponse}
                  upsCapitalGenerateQuoteResponse ={upsCapitalGenerateQuoteResponse}
              />
              {selectedQuoteIndex === index && (
                  <BOLInfo setAddressUpdInfo={setAddressUpdInfoAndClearQuotes} marshQuoteResponse={marshQuoteResponse} upsCapitalGenerateQuoteResponse ={upsCapitalGenerateQuoteResponse} insuranceInformation={insuranceInformation} accessorial={accessorial} pickupDate={pickupDate} tariffId={quote?.markupToApply?.freightPricingId} bolAddressBeforeReQuote={bolAddressBeforeReQuote} data={quote} premiumAmount={quotes.upsCapitalGenerateQuoteResponse?.premiumAmount} insuranceTermsAndConditionsDocument={quotes.insuranceTermsAndConditionsDocument} transitTime={quote.transitTime} isBlueGrace={quote.isBlueGrace}/>
              )}
            </React.Fragment>
        ))}
      </div>
      <QuotesResultPaginator
        paginator={paginator}
        setPaginator={(paginator: Paginator) => setPaginator(paginator)}
        totalCount={quotes.total}
      />
    </>
  );
};
