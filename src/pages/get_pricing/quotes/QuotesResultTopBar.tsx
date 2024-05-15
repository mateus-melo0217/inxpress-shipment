import { useState} from "react";
import ButtonTopResult from "components/forms/buttons/ButtonTopResult";
import "components/forms/ToggleButton.scss"
import {IoMdPrint} from "react-icons/io";
import {Paginator} from "./QuotesResultPaginator";

interface PropTypes {
    quotes: any;
    topBarFilter: {bestValue: boolean, quickest: boolean}
    setTopBarFilter: Function;
    setPaginator: Function;
    isControlEnabled: boolean;
    printSelQuotes: Function;
    selectAllQuotes: Function;
    clearAllQuotes: Function;
    marshQuoteResponse: any;
    upsCapitalGenerateQuoteResponse: any;
    isInsuranceVal: boolean;
}

export const QuotesResultTopBar = ({quotes, topBarFilter, setTopBarFilter,
     setPaginator, isControlEnabled, printSelQuotes, selectAllQuotes, 
     clearAllQuotes, marshQuoteResponse, upsCapitalGenerateQuoteResponse, isInsuranceVal}: PropTypes) => {
    const [option, setOption] = useState(false);
    const quoteBestValue = quotes?.bestValue;
    const quoteQuickest = quotes?.quickest;
    const toggle = () => {
        setOption(!option);
        if (!option) {
            selectAllQuotes();
        } else {
            clearAllQuotes();
        }
        
    };
    const controlBtnColor = isControlEnabled || option ? 'text-blue-1' : 'text-gray-1';
    const controlBtnCursor = isControlEnabled || option? 'cursor-pointer' : 'cursor-not-allowed';

    const onClickFilterBestValue = () => {
        setTopBarFilter({bestValue: true, quickest: false});
        setPaginator((prevState: Paginator) => ({
            ...prevState,
            page: 1
        }));
    }

    const onClickFilterQuickest = () => {
        setTopBarFilter({bestValue: false, quickest: true});
        setPaginator((prevState:any) => ({
            ...prevState,
            page: 1
        }));
    }
     
    return (
        <div className="px-16 mt-6 text-3xl">
            {isInsuranceVal && upsCapitalGenerateQuoteResponse == null ? <div className="font-bold text-red-700">Your request to insure this shipment cannot be processed at this time. For assistance, please contact your InXpress Freight Representative.</div> : ""}
            <div className="px-12 lg:mx-6 mt-6 flex flex-col items-center customMd:flex-row  justify-between">
                <div className="flex flex-col customXl:flex-row">
                    <ButtonTopResult
                        balance={quoteBestValue.displayPrice}
                        borderColor="#167979"
                        bgColor="#d0e5bd"
                        label="best value"
                        transitTime={quoteBestValue.transitTime}
                        isSelected={topBarFilter.bestValue}
                        onClick={onClickFilterBestValue}
                    />
                    <ButtonTopResult
                        balance={quoteQuickest.displayPrice}
                        borderColor="#bdc268"
                        bgColor="#e5e5bd"
                        label="quickest"
                        transitTime={quoteQuickest.transitTime}
                        isSelected={topBarFilter.quickest}
                        onClick={onClickFilterQuickest}
                        className="mt-2 customXl:mt-0 customXl:ml-2"
                    />
                </div>
                <div className="flex flex-row items-center">
                    <div className="flex flex-row items-center" >
                        <div className="text-green-1 uppercase font-medium whitespace-nowrap">quote id:</div>
                        <div className="ml-2 mr-5">{quotes.uuid}</div>
                    </div>
                    <div className="flex flex-row items-center">
                        <div className="flex items-center">
                            <div className="text-green-1 mr-4 whitespace-nowrap">Select all</div>
                            <div className="toggleBtn" onClick={toggle}>
                                <label className={`labelToggle before:!h-12 -mt-1 ${option ? 'toggleOptionActive' : ''}`} />
                            </div>
                        </div>
                        <IoMdPrint size="1.8em" onClick={() => printSelQuotes()}
                            className={`${controlBtnColor} ${controlBtnCursor} lg:mx-6 mx-2 mt-2 lg:mt-0`} />
                    </div>
                </div>
            </div>
        </div> 
    )
};