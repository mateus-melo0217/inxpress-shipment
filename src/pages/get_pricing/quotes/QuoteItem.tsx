import React,{useState} from "react";
import {Container} from "components/common/container/Container";
import ButtonQuote from "components/forms/buttons/ButtonQuote";
import {FaTruckMoving, FaMapMarkerAlt, FaBoxes} from "react-icons/fa";
import {AiOutlineClockCircle} from "react-icons/ai";
import {IoMdInformationCircle} from "react-icons/io";
import {RiContactsBook2Fill} from "react-icons/ri"
import {FaInfoCircle, FaCheck, FaCaretDown, FaTimes} from "react-icons/fa";
import {CgArrowLongDownC} from "react-icons/cg";
import {LottieCanvas} from "components/common/LottieCanvas";
import LottieTruck from "assets/animations/truck.json";
import {QuoteTypes} from "./QuoteTypes";
import {FilterFormTypes} from "../filter_form/FilterFormTypes";
import {isNull, isUndefined} from "lodash";
import { useDispatch } from "react-redux";
import { dispatchAdditionalInfoData, dispatchQuotePriceData } from "pages/bol_info/utility/BolDataDispatcher";
import {roundFn} from "utils/round"
import Tippy from "@tippyjs/react";

interface PropTypes {
    data: QuoteTypes;
    filters: FilterFormTypes;
    showQuoteDetails: boolean;
    setShowQuoteDetails: Function;
    selectedQuote?: Number;
    selectedQuoteIndex: Number;
    setSelectedQuoteIndex: Function;
    index: number;
    updQuoteCheck: Function;
    uuid: string;
}

export const QuoteItem = ({data, filters, showQuoteDetails, setShowQuoteDetails, selectedQuoteIndex, setSelectedQuoteIndex, index, updQuoteCheck, uuid}: PropTypes) => {
    const [isSelected, setIsSelected] = useState(false);
    const dispatch = useDispatch();
    const selectedQuoteIndexSetter = (index: number) => {
        if (selectedQuoteIndex === index) {
            setSelectedQuoteIndex(-1);
            return;
        }
        setSelectedQuoteIndex(index);
        setShowQuoteDetails(false);
        dispatchQuotePriceData(data.price, dispatch);
        dispatchAdditionalInfoData(
        {tariffDescription: data.tariffDescription, franchiseCost: data.baseRate, uuid: uuid, providerId: data.providerId, providerQuoteId: data.providerQuoteId, specialInstructions: data.specialInstructions,
            transitTime: data.transitTime, providerQuoteItemId: data.providerQuoteItemId, carrierName: data.carrierName, serviceType: data.serviceType, tariffId: data.markupToApply.freightPricingId}, dispatch);
    }
    if(isUndefined(setSelectedQuoteIndex)){
        return null;
    }

    let labelResult = "RESULT";
    let labelBg= " bg-field-gray border-light-gray";
    if (data.bestPriceSortIndex === 0) {
        labelResult = "BEST VALUE"
        labelBg = " bg-green-2 border-green-1"
    } else if (data.quickestSortIndex === 0) {
        labelResult = "QUICKEST"
        labelBg = "bg-yellow-1 border-yellow-2"
    } else if (data.bestPriceSortIndex !== 0 && data.quickestSortIndex !== 0) {
        labelResult = "RESULT"
        labelBg = " bg-field-gray border-light-gray"
    }

    const isQuoteItemOpened = (idx: number) => {
        return selectedQuoteIndex === idx;
    }

    return (
        <div
            onClick={() => setIsSelected(!isSelected)}
            onMouseOver={() => setIsSelected(true) }
            onMouseOut={() => setIsSelected(false)}
            onMouseLeave={() => setIsSelected(false)}
            className="px-1 relative"
        >
            <Container className="hover:border hover:border-blue-1 hover:border-solid">
                {/**grid-cols-auto-fit */}
                <div
                    className="relative font-medium flex flex-col customXXl:flex-row customXXl:justify-between" >
                    <div
                        className="relative
                                   lg:mb-0
                                   mb-12
                                   lg:pr-12
                                   pr-0
                                   after:hidden after:lg:block after:content-[''] after:border-r after:border-dashed after:border-light-gray
                                   after:absolute
                                   after:h-full
                                   after:top-0
                                   after:right-0">
                        <div className="flex items-center justify-between w-full">
                            <ButtonQuote
                                label={labelResult}
                                className={`uppercase rounded-md flex justify-center py-3 px-6 border border-solid ${labelBg}`}
                            />
                            <div className="text-5xl whitespace-nowrap font-medium lg:hidden overflow-hidden text-ellipsis max-w-[40%]">${data.price}</div>
                        </div>
                        <div className="flex items-center lg:hidden mt-6">
                            <RiContactsBook2Fill color="#167979" className="mr-2"/>
                            <span className="text-green-1 mr-5">Quote number:</span>
                            <span>{data.quoteNumber}</span>
                        </div>
                        <div className="flex flex-col customMd:flex-row customMd:justify-between customMd:items-center customMd:my-4 customXXl:flex-col customXXl:items-start">
                            <div className="flex mt-8 mb-4 customMd:my-0">
                                <div className="flex
                                                items-center
                                                relative
                                                pr-4
                                                after:absolute
                                                after:content-['']
                                                after:h-[65%]
                                                after:w-0.5
                                                after:bg-blue-1
                                                after:top-1/5 after:right-0">
                                    {data.serviceType === 'VOLUME' ? <FaBoxes size="2em" className="mr-2"/> : <FaTruckMoving size="2em" className="mr-2"/>}
                                    <span className="uppercase text-sxl">{data.serviceType}</span>
                                </div>
                                <div className="pl-4 flex items-center">
                                    <AiOutlineClockCircle size="1.2em" className="mx-2"/>
                                    <span className="mr-2">{data.transitTime} days</span>
                                    <IoMdInformationCircle size="1.3em"/>
                                </div>
                            </div>

                            <div className="flex items-center my-4 customMd:my-0 customXXl:mt-4">
                                <div>
                                    <FaMapMarkerAlt size="1.2em"/>
                                </div>

                                <div className="lg:mr-4  whitespace-nowrap">{filters.origin_city}, {filters.origin_state}</div>
                                <div
                                    className="relative
                                            mx-20
                                            after:absolute
                                            after:content-['']
                                            after:left-14
                                            after:top-1/2
                                            after:w-10
                                            after:border-b after:border-dashed after:border-light-gray
                                            before:absolute
                                            before:content-['']
                                            before:right-14
                                            before:top-1/2
                                            before:w-10
                                            before:border-b before:border-dashed before:border-light-gray">
                                    {data.serviceType === 'VOLUME' ? <FaBoxes size="1.5em"/> : <FaTruckMoving size="1.5em"/>}
                                </div>
                                <div className="lg:ml-4">{filters.destination_city}, {filters.destination_state}</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="my-4">{data.carrierName}</div>
                            <div className="uppercase text-blue-1 text-3xl font-medium text-center whitespace-nowrap py-6 lg:hidden">
                                {
                                    !isUndefined(filters.accessorial) && <p>{filters.accessorial.length} accessorial(s) requested</p>
                                }
                            </div>
                        </div>

                    </div>

                    <div
                        className="relative
                                   pr-0
                                   lg:pr-12
                                   lg:block
                                   after:hidden after:lg:block after:content-[''] after:border-r after:border-dashed after:border-light-gray
                                   after:absolute
                                   after:h-full
                                   after:top-0
                                   after:right-0">
                        <div className="hidden lg:flex items-center mb-12">
                            <RiContactsBook2Fill color="#167979" className="mr-2"/>
                            <span className="text-green-1 mr-5">Quote number:</span>
                            <span>{data.quoteNumber}</span>
                        </div>
                        <div className="flex justify-center mr-16">
                            <div className="absolute -top-9 lg:top-9 md:top-[6rem]">
                                <LottieCanvas width={100} height={100} animationData={LottieTruck}/>
                            </div>
                        </div>
                        <div className="grid grid-cols-6 gap-4 mt-20 lg:mt-20 md:mt-[14rem] lg:mr-12 mr-0">
                            <div
                                className="relative lg:col-start-2 col-start-1 lg:col-span-4 col-span-6  border-b-2 border-dashed border-blue-1 flex justify-center items-end lg:-ml-9 mx-1">
                                <div className="flex flex-col items-center absolute lg:-left-1 -left-6 -bottom-4 z-100">
                                    <CgArrowLongDownC size="2.3em" color="#000" className="-mb-4"/>
                                    <div className="w-14 h-6 rounded-rectangle bg-lighter-gray shadow-xl"></div>
                                </div>
                                <div className="flex flex-col items-center absolute lg:-right-1 -right-6 -bottom-4 z-100">
                                    <CgArrowLongDownC size="2.3em" color="#000" className="-mb-4"/>
                                    <div className="w-14 h-6 rounded-rectangle bg-lighter-gray shadow-xl"></div>
                                </div>
                            </div>
                            <div className="col-start-1 grid-cols-1 flex flex-col items-center">
                                <div className="lg:whitespace-nowrap whitespace-normal  mb-4">Origin Terminal</div>
                                <div className="pl-8 text-green-1 whitespace-nowrap lg:pl-0">{data.originPhone}</div>
                            </div>
                            <div className="col-span-4 flex items-center justify-center">
                                <div className="items-center mr-2 hidden lg:flex">
                                    <AiOutlineClockCircle color="#167979" size="1.2em" className="mr-2"/>
                                    <div className="text-green-1">Estimated Transit time:</div>
                                </div>
                                <div className="hidden lg:flex">{data.transitTime} days</div>
                            </div>
                            <div className="grid-cols-1 flex flex-col items-center">
                                <div className="lg:whitespace-nowrap whitespace-normal mb-4">Destination Terminal</div>
                                <div className="pr-8 text-green-1 whitespace-nowrap lg:pr-0">{data.destinationPhone}</div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="relative pr-10
                                   hidden
                                   lg:block
                                   after:absolute
                                   after:h-full
                                   after:top-0
                                   after:right-0
                                   after:content-[''] after:border-r after:border-dashed after:border-light-gray">
                        <div className="flex items-center">
                            <div className="pr-16" onClick={()=>setShowQuoteDetails(!showQuoteDetails)}>
                                <p className="text-green-1 underline text-center cursor-pointer">Details & Tariff <br/>Description</p>
                            </div>
                            <div className="flex justify-end my-3">
                                <Tippy content={data?.tariffDescription} theme="light">
                                    <div className="flex flex-col items-center justify-center">
                                        <FaInfoCircle size="1.1em"/>
                                        <div className="text-green-1 text-sm mt-1">more</div>
                                    </div>
                                </Tippy>
                            </div>
                        </div>
                        <div className={`hidden customXXl:flex pb-4 mt-4 relative w-80 border-b border-dashed border-light-gray`}>
                            <div
                                style={data.carrierLogo ? {}:{border: "1px solid red"}}
                                className="w-full h-32">
                                {!!data.carrierLogo && <img src={data.carrierLogo} alt={data.carrierName} className="h-full"/>}
                            </div>
                        </div>
                        <div className="uppercase text-3xl font-medium text-center whitespace-nowrap py-6">
                            {
                                !isUndefined(filters.accessorial) && <p>{filters.accessorial.length} accessorial(s) <br /> requested</p>
                            }
                        </div>
                    </div>
                    <div className="relative flex flex-col px-8 items-center justify-center">
                        <div className="hidden lg:flex text-5xl whitespace-nowrap font-medium flex-col items-end">
                            {data.serviceType === 'VOLUME' ? <span className="text-3xl font-medium">VOLUME</span> : null}
                            { !isNull(data.baseRate) &&
                                <span className="text-3xl font-medium mb-1">
                                    <span className="text-[#bbbbbb] mr-2">Cost</span>
                                    {`$ ${roundFn(data.baseRate)}`}
                                </span>
                            }
                            ${data.displayPrice}
                        </div>
                        <div className="hidden lg:flex items-center space-x-6 my-4 absolute right-0 top-0">
                            <input type="checkbox" checked={data.isChecked}
                                onChange={(e: any) => 
                                    updQuoteCheck(data.providerQuoteItemId,
                                        e.target.checked)}
                            />
                        </div>
                        <ButtonQuote
                            icon={isQuoteItemOpened(index) ? <FaTimes size="1.2em" color="#FFF" className="mr-4"/>: <FaCheck size="1.2em" color="#FFF" className="mr-4"/>}
                            hasIcon={true}
                            label={isQuoteItemOpened(index) ? 'Unselect quote': 'Select quote'}
                            className="mt-8 bg-green-1 py-4 px-5 text-white rounded-lg text-slg font-normal flex justify-center items-center min-w-[134px]"
                            onClick = {() => selectedQuoteIndexSetter(index)}
                        />
                    </div>
                </div>
            </Container>
            {
                        (isSelected) &&
                        (
                            <div
                                className="absolute cursor-pointer translate-x-1/2 mt-[-12px] top-[100%] left-[50%]">
                                <FaCaretDown
                                    onClick={() => setShowQuoteDetails(!showQuoteDetails)}
                                    size="2.5em"
                                    className="transform -translate-x-full"
                                />
                            </div>
                        )
            }
        </div>
    );
};