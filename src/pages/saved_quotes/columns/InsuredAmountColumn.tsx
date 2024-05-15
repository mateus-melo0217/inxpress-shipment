import Tooltip from "components/common/tooltip/Tooltip";
import React from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { isEmpty } from "lodash";
import { trimNumber } from "utils/numberHelpers";

interface PropTypes {
    cellContext: any,
}

export const InsuredAmountColumn = ({cellContext}: PropTypes) => {
    const insuredValueAmount = cellContext.freightQuoteRequest.insuranceInformation?.insuredValue?.insuredValueAmount ? cellContext.freightQuoteRequest.insuranceInformation?.insuredValue?.insuredValueAmount : "";
    const quoteId = cellContext.freightQuoteRequest.insuranceInformation?.quoteId ? cellContext.freightQuoteRequest.insuranceInformation.quoteId : "";
    const totalPremiumAmount = !isEmpty(cellContext.freightQuoteRequest.insuranceDispatchedQuoteResponse) ? cellContext.freightQuoteRequest.insuranceDispatchedQuoteResponse.totalPremiumAmount : (!isEmpty(cellContext.freightQuoteRequest.insuranceInformation) && cellContext.freightQuoteRequest.insuranceInformation.insuredValue.premiumAmount);

    return (
        <div className="text-ellipsis overflow-hidden break-all w-full flex justify-center border-dashed">
            { totalPremiumAmount ? 
            <Tooltip text={TooltipContent(insuredValueAmount, quoteId)} extClsName={`top-[-60px] w-[fit-content]`} position="top-left">
                <div className="flex items-center cursor-pointer">
                    <span className="ml-2 border-dashed border-black border-b-2 mr-2">
                        ${totalPremiumAmount}
                    </span>
                    <BsQuestionCircle/>
                </div>
            </Tooltip> : "" }
        </div>
    );
}   
    const TooltipContent = (insuredValueAmount: any, quoteId: any) => {
        return (
            <div className="p-2">
                <span className="">
                    <p className="ml-4 font-bold mr-4 border-solid border-black border-b-2">DETAILS</p>
                    <div className="mt-2">
                        {quoteId && (
                            <div className="">
                                <span className="ml-2 font-bold">
                                    Quote ID:
                                </span>
                                <span className="ml-2">
                                    {quoteId}
                                </span>
                            </div>
                        )}
                        <div className="">
                            <span className="ml-2 font-bold">
                                Value:
                            </span>
                            <span className="ml-2">
                                ${trimNumber(Number(insuredValueAmount))}
                            </span>
                        </div>
                    </div>
                </span>
            </div>
        )
    }