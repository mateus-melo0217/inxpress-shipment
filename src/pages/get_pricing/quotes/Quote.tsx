import React,{useState} from "react";
import {QuoteTypes} from "./QuoteTypes";
import {QuoteDetails} from "./QuoteDetails";
import {FilterFormTypes} from "../filter_form/FilterFormTypes";
import {QuoteItem} from "./QuoteItem";

interface PropTypes {
    data: QuoteTypes;
    filters: FilterFormTypes;
    index: number;
    selectedQuoteIndex: number;
    setSelectedQuoteIndex: Function;
    updQuoteCheck: Function;
    uuid: string;
    marshQuoteResponse: any;
    upsCapitalGenerateQuoteResponse: any;
}

export const Quote = ({data, filters, index, selectedQuoteIndex, setSelectedQuoteIndex, updQuoteCheck, uuid, marshQuoteResponse, upsCapitalGenerateQuoteResponse}: PropTypes) => {
    const [showQuoteDetails, setShowQuoteDetails] = useState(false);
    return (
        <>
            <QuoteItem {...{filters, data, showQuoteDetails, setShowQuoteDetails, index, selectedQuoteIndex, setSelectedQuoteIndex, updQuoteCheck, uuid }} />
            <QuoteDetails {...{filters, data, showQuoteDetails, marshQuoteResponse, upsCapitalGenerateQuoteResponse}} />
        </>
    );
};