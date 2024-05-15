import React from 'react';
import { Container } from "components/common/container/Container";
import { FaTruckMoving } from "react-icons/fa";
import { FiTruck } from "react-icons/fi";
import { ImHammer2 } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { BsArrowRightSquare } from "react-icons/bs";
import { IoInformationCircleOutline } from "react-icons/io5";
import { RiOrganizationChart } from "react-icons/ri";
import { AiFillDollarCircle } from "react-icons/ai";
import { LottieCanvas } from "components/common/LottieCanvas";
import LottieTruck from "assets/animations/truck.json";
import {FilterFormTypes} from "../filter_form/FilterFormTypes";
import {QuoteTypes} from "./QuoteTypes";
import {isUndefined} from "lodash";

export interface PropTypes {
    filters: FilterFormTypes;
    data: QuoteTypes;
    showQuoteDetails: boolean;
    marshQuoteResponse: any;
    upsCapitalGenerateQuoteResponse: any;
}

export const QuoteDetails = ({ filters, showQuoteDetails, data, marshQuoteResponse, upsCapitalGenerateQuoteResponse }: PropTypes) => {

    if (!showQuoteDetails) {
        return null;
    }

    return (
        <div className={` ${!isUndefined(filters.insurance_amount) ? "md:min-h-[400px] h-[auto]" : "md:min-h-[250px] h-[auto]" } w-full transition-all duration-200 ease-in-out `}>
            <Container
                formClass="!gap-0"
                className="border border-blue-1 border-solid rounded-xl !px-0">
                <div className="px-6">
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                        <div className="items-center hidden md:flex">
                            <FaTruckMoving size="2em" className="mr-6" />
                            <div className="text-sxl text-blue-1">{filters.origin_city}, {filters.origin_state}</div>
                            <div
                                className="relative
                                           mb-8
                                           mx-24
                                           after:absolute
                                           after:content-['']
                                           after:left-20
                                           after:bottom-1/4
                                           after:w-16
                                           after:border-b after:border-dashed after:border-black
                                           before:absolute
                                           before:content-['']
                                           before:right-20
                                           before:bottom-1/4
                                           before:w-16
                                           before:border-b before:border-dashed before:border-black"
                            >
                                <LottieCanvas
                                    width={80}
                                    height={80}
                                    animationData={LottieTruck}
                                />
                            </div>
                            <div className="text-sxl text-blue-1">{filters.destination_city}, {filters.destination_state}</div>
                        </div>
                        <div className="col-start-1">
                            <div className="flex items-center space-x-2 mt-2">
                                <FiTruck color="#167979" />
                                <div className="text-green-1">Carrier:</div>
                                <div className="text-sbase">{data.carrierName}</div>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                                <ImHammer2 color="#167979" size="0.8em" />
                                <div className="text-green-1">Carrier rules:</div>
                                {!isUndefined(data?.markupToApply?.carrierRulesLink) && <a href={`${data?.markupToApply?.carrierRulesLink}`} target={'_blank'} rel={'noreferrer'}>{data?.markupToApply?.carrierRulesLink}</a>}
                            </div>
                        </div>

                        <div >
                            <div className="flex items-center space-x-2 mt-2">
                                <MdEmail color="#167979" size="0.8em" />
                                <div className="text-green-1">Email address:</div>
                                <div >{data?.markupToApply.carrierEmail}</div>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                                <BsArrowRightSquare color="#167979" size="0.8em" />
                                <div className="text-green-1">Other:</div>
                                <div >{data?.markupToApply.comments}</div>
                            </div>
                        </div>

                        <div className="flex items-start space-x-10 relative">
                            <IoInformationCircleOutline
                                color="#000"
                                size="1.5em"
                                className="absolute left-0"
                            />
                            <div className="text-green-1 text-sbase mr-2">Description</div>
                            <div className='px-4'>
                                <p className={`text-blue-1 text-sbase break-all`}>{data.tariffDescription}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {!isUndefined(filters.accessorial) && <>
                    <div className="flex items-center mb-4 mx-6">
                        <RiOrganizationChart size="2em" />
                        <div className=" text-blue-1 md:text-4xl text-2xl ml-2">
                            {filters.accessorial.length} Accessorial(s) Requested
                        </div>
                    </div>
                    <div className="bg-lightest-gray w-full flex items-center pl-6 py-4 space-x-4">
                        {filters.accessorial.map((accessorial: any, index: number) => (
                            <div key={index} className="relative flex items-center rounded-smd px-10 md:py-4 py-2 text-blue-1 text-sbase font-medium bg-dark-gray">
                                {accessorial.label}
                            </div>
                        ))}
                    </div>
                    <div className="items-center mb-4 mx-6 mt-16 hidden md:flex">
                        <AiFillDollarCircle size="2em" />
                        <div className=" text-blue-1 text-4xl ml-2">
                            Description
                        </div>
                    </div>

                    {!isUndefined(filters.insurance_amount) && <>
                        <table className="w-full hidden md:inline-grid mb-20">
                            <thead className="bg-lightest-gray">
                                <tr className="grid md:grid-cols-5 grid-cols-1 gap-4">
                                <th className="text-blue-1 text-sbase font-medium py-4 px-8">Shipping Protection</th>
                                    <th className="text-blue-1 text-sbase font-medium py-4 px-8"></th>
                                    <th className="text-blue-1 text-sbase font-medium py-4 px-8"></th>
                                    <th className="text-blue-1 text-sbase font-medium py-4 px-8">Protection Value</th>
                                    <th className="text-blue-1 text-sbase font-medium py-4 px-8">Premium Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-lightest-gray text-center grid border-solid md:grid-cols-5 grid-cols-1 gap-4">
                                    <td className="text-blue-1 text-sbase font-medium py-4 px-8">by UPS Capital Insurance Agency,Inc.</td>
                                    <td className="text-blue-1 text-sbase font-medium py-4 px-8"></td>
                                    <td className="text-blue-1 text-sbase font-medium py-4 px-8"></td>
                                    <td className="text-blue-1 text-sbase font-medium py-4 px-8">${filters.insurance_amount}</td>
                                    <td className="text-blue-1 text-sbase font-medium py-4 px-8">${upsCapitalGenerateQuoteResponse?.premiumAmount}</td>
                                </tr>
                            </tbody>
                        </table>
                    </>}
                </>}
                    <table className="w-full hidden md:inline-grid mb-10">
                        <thead className="bg-lightest-gray">
                            <tr className="grid md:grid-cols-5 grid-cols-1 gap-4">
                                <th className="text-blue-1 text-sbase font-medium py-4 px-8">Carrier Quote</th>
                                <th className="text-blue-1 text-sbase font-medium py-4 px-8"></th>
                                <th className="text-blue-1 text-sbase font-medium py-4 px-8"></th>
                                <th className="text-blue-1 text-sbase font-medium py-4 px-8"></th>
                                <th className="text-blue-1 text-sbase font-medium py-4 px-8">Amount</th>
                            </tr>
                        </thead>
                        {!isUndefined(data.accessorials) && data.accessorials && <>
                            <tbody>
                                <tr className="border-b border-lightest-gray text-center grid border-solid md:grid-cols-5 grid-cols-1 gap-4">
                                    <td className="text-blue-1 text-sbase font-medium py-4 px-8">Line Haul</td>
                                    <td className="text-blue-1 text-sbase font-medium py-4 px-8"></td>
                                    <td className="text-blue-1 text-sbase font-medium py-4 px-8"></td>
                                    <td className="text-blue-1 text-sbase font-medium py-4 px-8"></td>
                                    <td className="text-blue-1 text-sbase font-medium py-4 px-8">${data.displayPriceWithoutAccessorials}</td>
                                </tr>

                                {
                                    data.accessorials.map((accessorial) => {
                                        return <tr className="border-b border-lightest-gray text-center grid border-solid md:grid-cols-5 grid-cols-1 gap-4">
                                            <td className="text-blue-1 text-sbase font-medium py-4 px-8">{accessorial.description}</td>
                                            <td className="text-blue-1 text-sbase font-medium py-4 px-8"></td>
                                            <td className="text-blue-1 text-sbase font-medium py-4 px-8"></td>
                                            <td className="text-blue-1 text-sbase font-medium py-4 px-8"></td>
                                            <td className="text-blue-1 text-sbase font-medium py-4 px-8">${!accessorial.displayChargeAmount ? "0" : accessorial.displayChargeAmount}</td>
                                        </tr>;
                                    })
                                }

                            <tr className="border-b border-lightest-gray text-center grid border-solid md:grid-cols-5 grid-cols-1 gap-4">
                                <td className="text-blue-1 text-sbase font-medium py-4 px-8"></td>
                                <td className="text-blue-1 text-sbase font-medium py-4 px-8"></td>
                                <td className="text-blue-1 text-sbase font-medium py-4 px-8"></td>
                                <td className="text-blue-1 text-sbase font-medium py-4 px-8">Total</td>
                                <td className="text-blue-1 text-sbase font-medium py-4 px-8">${data.price}</td>
                            </tr>
                        </tbody>
                    </>
                    }
                    {(isUndefined(data.accessorials) || !data.accessorials) && <>
                        <tbody>
                            <tr className="border-b border-lightest-gray text-center grid border-solid md:grid-cols-5 grid-cols-1 gap-4">
                                <td className="text-blue-1 text-sbase font-medium py-4 px-8">Line Haul + Accessorial(s)</td>
                                <td className="text-blue-1 text-sbase font-medium py-4 px-8"></td>
                                <td className="text-blue-1 text-sbase font-medium py-4 px-8"></td>
                                <td className="text-blue-1 text-sbase font-medium py-4 px-8"></td>
                                <td className="text-blue-1 text-sbase font-medium py-4 px-8">${data.price}</td>
                            </tr>
                            <tr className="border-b border-lightest-gray text-center grid border-solid md:grid-cols-5 grid-cols-1 gap-4">
                                <td className="text-blue-1 text-sbase font-medium py-4 px-8"></td>
                                <td className="text-blue-1 text-sbase font-medium py-4 px-8"></td>
                                <td className="text-blue-1 text-sbase font-medium py-4 px-8"></td>
                                <td className="text-blue-1 text-sbase font-medium py-4 px-8">Total</td>
                                <td className="text-blue-1 text-sbase font-medium py-4 px-8">${data.price}</td>
                            </tr>
                        </tbody>
                    </>
                    }
                </table>
                { isUndefined(filters.accessorial) && !isUndefined(filters.insurance_amount) && <>
                    <div className="items-center mb-4 mx-6 mt-16 hidden md:flex">
                        <AiFillDollarCircle size="2em" />
                        <div className=" text-blue-1 text-4xl ml-2">
                            Description
                        </div>
                    </div>
                        <table className="w-full hidden md:inline-grid mb-20">
                            <thead className="bg-lightest-gray">
                                <tr className="grid md:grid-cols-5 grid-cols-1 gap-4">
                                    <th className="text-blue-1 text-sbase font-medium py-4 px-8">Shipping Protection</th>
                                    <th className="text-blue-1 text-sbase font-medium py-4 px-8"></th>
                                    <th className="text-blue-1 text-sbase font-medium py-4 px-8"></th>
                                    <th className="text-blue-1 text-sbase font-medium py-4 px-8">Protection Value</th>
                                    <th className="text-blue-1 text-sbase font-medium py-4 px-8">Premium Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-lightest-gray text-center grid border-solid md:grid-cols-5 grid-cols-1 gap-4">
                                    <td className="text-blue-1 text-sbase font-medium py-4 px-8">by UPS Capital Insurance Agency,Inc.</td>
                                    <td className="text-blue-1 text-sbase font-medium py-4 px-8"></td>
                                    <td className="text-blue-1 text-sbase font-medium py-4 px-8"></td>
                                    <td className="text-blue-1 text-sbase font-medium py-4 px-8">${filters.insurance_amount}</td>
                                    <td className="text-blue-1 text-sbase font-medium py-4 px-8">${upsCapitalGenerateQuoteResponse?.premiumAmount}</td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                    }
            </Container>
        </div>
    );
};