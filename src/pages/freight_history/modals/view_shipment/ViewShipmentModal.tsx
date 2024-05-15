import {useCallback, useRef, useState} from "react";
import {MdClose} from "react-icons/md";
import {useDispatch} from "react-redux";
import {CLOSE_VIEW_SHIPMENT_MODAL} from "actions";
import {formatDate, formatTime} from "utils/dateHelpers";
import './print.css';
import {useReactToPrint} from "react-to-print";
import {roundFn} from "../../../../utils/round"

interface PropTypes {
    row: any;
}

export const ViewShipmentModal = ({row}: PropTypes) => {
    const dispatch = useDispatch();
    const componentRef = useRef(null);
    const [closeButtonClass, setCloseButtonClass] = useState("text-blue-1");

    const onShipmentNotesModalClose = useCallback(() => {
        dispatch({
            type: CLOSE_VIEW_SHIPMENT_MODAL,
            payload: {
                isOpen: false,
            }
        })
    }, [dispatch])

    const printShipmentDetail = useReactToPrint({content: () => componentRef.current});

    const getTotalChargeAmount = (items: { chargeAmount: number, code: string }[]): number => {
        return items.reduce((total, item) => total + item.chargeAmount, 0);
    }

    const getBaseCharge = (row: any) => {
        return row.quotedAmount - getTotalChargeAmount(row.quoteAccessorials.length > 0 ? row.quoteAccessorials : row.accessorials)
    }
    
    const getSenderAddress = (row: any) => `${row.senderCompanyName || ""} ${row.senderAddress1 || ""} ${row.senderAddress2 || ""} ${row.senderAddress3 || ""} ${row.senderCity}, ${row.senderStateCode}, ${row.senderPostalCode}, ${row.senderCountryCode}`.replace(/\s\s+/g, ' ')

    const getReceiverAddress = (row: any) => `${row.receiverCompanyName || ""} ${row.receiverAddress1 || ""} ${row.receiverAddress2 || ""} ${row.receiverAddress3 || ""} ${row.receiverCity}, ${row.receiverStateCode}, ${row.receiverPostalCode}, ${row.receiverCountryCode}`.replace(/\s\s+/g, ' ')

    return (
        <div className="fixed overflow-hidden w-full h-full z-50 bg-gray-modal bottom-0 left-0">
            <div className="w-3/4 absolute overflow-y-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl flex flex-col items-center modal">
                <div ref={componentRef} className="bg-white w-full modal-content">
                    <div className="bg-blue-1 flex items-center justify-between w-full p-4 rounded-t-xl modal-title">
                        <div className="uppercase text-white font-bold">shipment detail</div>
                        <MdClose
                            onClick={onShipmentNotesModalClose}
                            size="0.7em"
                            className={`${closeButtonClass} bg-blue-1 text-5xl cursor-pointer`}
                            onMouseOver={() => setCloseButtonClass("text-white")}
                            onMouseOut={() => setCloseButtonClass("text-blue-1")}
                        />
                    </div>
                    <div className="w-full min-h-[800px] bg-white">
                        <div className="w-full my-10 px-10 flex justify-between flex-wrap gap-x-8 gap-y-4">
                            <div className="flex flex-col" style={{width:'calc((100% - 40px) / 2)'}}>
                                <div className="flex items-center justify-between">
                                    <div className="text-blue-1">Carrier and Service Type</div>
                                    <input type="text" className="text-medium-gray px-4 py-6 w-3/5 bg-[#eaeef1] rounded-md modal-input" value={`${row.carrierName} - ${row.serviceType}`} disabled/>
                                </div>
                            </div>
                            <div className="flex flex-col" style={{width:'calc((100% - 40px) / 2)'}}>
                                <div className="flex items-center justify-between">
                                    <div className="text-blue-1">Pickup date</div>
                                    <input type="text" className="text-medium-gray px-4 py-6 w-3/5 bg-[#eaeef1] rounded-md" value={formatDate(row.pickupDateTime)} disabled/>
                                </div>
                            </div>
                            <div className="flex flex-col" style={{width:'calc((100% - 40px) / 2)'}}>
                                <div className="flex items-center justify-between">
                                    <div className="text-blue-1">Transaction Date</div>
                                    <input type="text" className="text-medium-gray px-4 py-6 w-3/5 bg-[#eaeef1] rounded-md" value={formatDate(row.transactionTime)} disabled/>
                                </div>
                            </div>
                            <div className="flex flex-col" style={{width:'calc((100% - 40px) / 2)'}}>
                                <div className="flex items-center justify-between">
                                    <div className="text-blue-1">Ready and Close Time</div>
                                    <input type="text" className="text-medium-gray px-4 py-6 w-3/5 bg-[#eaeef1] rounded-md" value={`${formatTime(row.readyTime)} ~ ${formatTime(row.closingTime)}`} disabled/>
                                </div>
                            </div>
                            <div className="flex flex-col" style={{width:'calc((100% - 40px) / 2)'}}>
                                <div className="flex items-center justify-between">
                                    <div className="text-blue-1">Dispatch Date</div>
                                    <input type="text" className="text-medium-gray px-4 py-6 w-3/5 bg-[#eaeef1] rounded-md" value={formatDate(row.shipDate)} disabled/>
                                </div>
                            </div>
                            <div className="flex flex-col" style={{width:'calc((100% - 40px) / 2)'}}>
                                <div className="flex items-center justify-between">
                                    <div className="text-blue-1">Customer #</div>
                                    <input type="text" className="text-medium-gray px-4 py-6 w-3/5 bg-[#eaeef1] rounded-md" value={row.customerCode} disabled/>
                                </div>
                            </div>
                            <div className="flex flex-col" style={{width:'calc((100% - 40px) / 2)'}}>
                                <div className="flex items-center justify-between">
                                    <div className="text-blue-1">PRO #</div>
                                    <input type="text" className="text-medium-gray px-4 py-6 w-3/5 bg-[#eaeef1] rounded-md" value={row.customerProNumber} disabled/>
                                </div>
                            </div>
                            <div className="flex flex-col" style={{width:'calc((100% - 40px) / 2)'}}>
                                <div className="flex items-center justify-between">
                                    <div className="text-blue-1">Quote #</div>
                                    <input type="text" className="text-medium-gray px-4 py-6 w-3/5 bg-[#eaeef1] rounded-md" value={row.quoteNumber} disabled/>
                                </div>
                            </div>
                            <div className="flex flex-col" style={{width:'calc((100% - 40px) / 2)'}}>
                                <div className="flex items-center justify-between">
                                    <div className="text-blue-1">BOL #</div>
                                    <input type="text" className="text-medium-gray px-4 py-6 w-3/5 bg-[#eaeef1] rounded-md" value={row.issuedBoLNumber} disabled/>
                                </div>
                            </div>
                            <div className="flex flex-col" style={{width:'calc((100% - 40px) / 2)'}}>
                                <div className="flex items-center justify-between">
                                    <div className="text-blue-1">Total Units</div>
                                    <input type="text" className="text-medium-gray px-4 py-6 w-3/5 bg-[#eaeef1] rounded-md" value={row.numberOfItems} disabled/>
                                </div>
                            </div>
                            <div className="flex flex-col" style={{width:'calc((100% - 40px) / 2)'}}>
                                <div className="flex items-center justify-between">
                                    <div className="text-blue-1">Pickup Confirmation</div>
                                    <input type="text" className="text-medium-gray px-4 py-6 w-3/5 bg-[#eaeef1] rounded-md" value={row.pickupNumber} disabled/>
                                </div>
                            </div>
                            <div className="flex flex-col" style={{width:'calc((100% - 40px) / 2)'}}>
                                <div className="flex items-center justify-between">
                                    <div className="text-blue-1">Total Weight</div>
                                    <input type="text" className="text-medium-gray px-4 py-6 w-3/5 bg-[#eaeef1] rounded-md" value={row.totalWeight} disabled/>
                                </div>
                            </div>
                            <div className="flex flex-col" style={{width: 'calc((100% - 40px) / 2)'}}>
                                <div className="flex items-center justify-between">
                                    <div className="text-blue-1">From</div>
                                    <div className="text-medium-gray px-4 py-6 w-3/5 bg-[#eaeef1] rounded-md">{getSenderAddress(row)}</div>
                                </div>
                            </div>
                            <div className="flex flex-col" style={{width: 'calc((100% - 40px) / 2)'}}>
                                <div className="flex items-center justify-between">
                                    <div className="text-blue-1">To</div>
                                    <div className="text-medium-gray px-4 py-6 w-3/5 bg-[#eaeef1] rounded-md">{getReceiverAddress(row)}</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full my-40 px-10 flex justify-between gap-x-4">
                            <div className="flex flex-col" style={{width:'calc((100% - 40px) / 2)'}}>
                                <div className="flex justify-between gap-x-1">
                                    <div className="w-1/2 border-[1px] light-gray h-[fit-content]">
                                        <p className="text-lightest-gray bg-black-1 p-4 modal-tag-title">Shipping Protection</p>
                                        <div className="my-[20px] px-[20px] bg-white">
                                            <p className="text-blue-1">Premium: $ {row.insuranceTermsConditions && row.insuranceInformation?.insuredValue.premiumAmount}</p>
                                            <p className="text-blue-1">Value: $ {row.insuranceTermsConditions && row.insuranceInformation?.insuredValue.insuredValueAmount}</p>
                                            <p className="text-blue-1 break-all">Reference #: {row.insuranceTermsConditions && row.insuranceInformation?.quoteId}</p>
                                            {row.insuranceTermsConditions &&
                                                <><br/><span className="text-gray-1 italic font-light">This premium is not included in the cost of the quote(s) above.</span></>}
                                        </div>
                                    </div>
                                    <div className="w-1/2 border-[1px] light-gray">
                                        <p className="text-lightest-gray bg-black-1 p-4">Description</p>
                                        <div className="my-[20px] px-[20px] bg-white">
                                            <p className="text-blue-1 overflow-y-auto max-h-[25vh]">{row.tariffDescription}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col" style={{width:'calc((100% - (100% - 40px) / 2) - 10px)'}}>
                                <div className="w-full border-[1px] light-gray">
                                    <p className="text-lightest-gray bg-black-1 p-4">Quote Detail</p>
                                    <div className="my-[20px] px-[20px] bg-white">
                                        <div className="flex items-center justify-between">
                                            <div className="text-blue-1">Base Charge</div>
                                            <input type="text" className="text-medium-gray px-4 py-6 w-3/5 bg-[#eaeef1] rounded-md" value={`$ ${roundFn(getBaseCharge(row))}`} disabled/>
                                        </div>
                                        {(row.quoteAccessorials.length > 0 ? row.quoteAccessorials : row.accessorials).map((accessorial:any) => (
                                            accessorial.chargeAmount ? (<div className="flex items-center justify-between mt-4">
                                                <div className="text-blue-1">{accessorial.name}</div>
                                                <input type="text" className="text-medium-gray px-4 py-6 w-3/5 bg-[#eaeef1] rounded-md" value={`$ ${accessorial.chargeAmount}`} disabled/>
                                            </div>) : null 
                                        ))}
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="text-blue-1">Total Charge</div>
                                            <input type="text" className="text-medium-gray px-4 py-6 w-3/5 bg-[#eaeef1] rounded-md" value={`$ ${row.quotedAmount}`} disabled/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white w-full flex items-center justify-end rounded-b-xl p-6 modal-btn">
                     <div
                        className="bg-green-1 text-[rgba(255,255,255,.8)] px-10 py-4 cursor-pointer rounded-lg flex items-center justify-center border-[1.5px] border-green-1 hover:bg-transparent hover:text-blue-1 transition-all duration-[500ms] ease-out"
                        onClick={()=>printShipmentDetail()}
                    >
                        Print
                    </div>
                    <div
                        className="bg-transparent text-medium-gray px-10 py-4 cursor-pointer rounded-lg flex items-center justify-center border-[1.5px] border-green-1 hover:bg-green-1 transition-all duration-[500ms] ease-out ml-4"
                        onClick={onShipmentNotesModalClose}
                    >
                        Close
                    </div>
                </div>
            </div>
        </div>
    );
};