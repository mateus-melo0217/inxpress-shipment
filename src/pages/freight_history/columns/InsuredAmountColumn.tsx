import React from "react";
import Tooltip from "components/common/tooltip/Tooltip";
import { BsQuestionCircle } from "react-icons/bs";
import { trimNumber } from "utils/numberHelpers";

interface PropTypes {
    cellContext: any,
}

export const InsuredAmountColumn = ({cellContext}: PropTypes) => {
    const insuredValueAmount = cellContext.row.original.insuranceInformation?.insuredValue?.insuredValueAmount ? cellContext.row.original.insuranceInformation?.insuredValue?.insuredValueAmount : "";
    const quoteId = cellContext.row.original.insuranceInformation?.quoteId ? cellContext.row.original.insuranceInformation.quoteId : "";

    return (
        <div className="text-ellipsis overflow-hidden break-all max-w-[76px] flex justify-center border-dashed">
            { cellContext.row.original.insuranceInformation?.insuredValue?.premiumAmount ? 
            <Tooltip text={TooltipContent(insuredValueAmount, quoteId, cellContext.row.original.insuranceTermsConditions)} extClsName={`top-[-35px] left-[${quoteId ? '-100px' : '-10px'}] w-[fit-content]`}>
                <div className={`flex items-center cursor-pointer ${cellContext.row.original.insuranceTermsConditions ? 'opacity-[1]' : 'opacity-[0.5]'}`}>
                    <span className="ml-2 border-dashed border-black border-b-2 mr-2">
                        ${cellContext.row.original.insuranceInformation.insuredValue.premiumAmount}
                    </span>
                    <BsQuestionCircle/>
                </div>
            </Tooltip> : "" }
        </div>
    );
}   
    const TooltipContent = (insuredValueAmount: any, quoteId: any, insuranceTermsConditions:boolean) => {
        return (
            <div className="p-2">
                <span className="text-center">
                    <p className="ml-4 font-bold mr-4 border-solid border-black border-b-2">DETAILS</p>
                    <div className="mt-2">
                        {insuranceTermsConditions && quoteId ? (
                            <div className="">
                                <span className="ml-2 font-bold">
                                    Quote ID:
                                </span>
                                <span className={`ml-2 opacity-[1]`}>
                                    {quoteId}
                                </span>
                            </div>
                        ) : ""}
                        <div className="">
                            <span className="ml-2 font-bold">
                                Value:
                            </span>
                            <span className={`ml-2 ${insuranceTermsConditions ? 'opacity-[1]' : 'opacity-[0.5]'}`}>
                                ${trimNumber(Number(insuredValueAmount))}
                            </span>
                        </div>
                        {!insuranceTermsConditions ? (
                            <div className="">
                                <span className="ml-2">
                                    User did not accept the terms and conditions.
                                </span>
                            </div>
                        ) : ""}
                    </div>
                </span>
            </div>
        )
    }