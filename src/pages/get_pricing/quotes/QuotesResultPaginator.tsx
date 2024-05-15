import React, { useState } from "react";
import ButtonQuote from "components/forms/buttons/ButtonQuote";
import {Pagination} from "components/common/Pagination";

type OptionType = {
    value: string;
    label: string;
};

export type Paginator = {
    perPage: number,
    page: number
};

const PAGE_OPTIONS:OptionType[] = [
    {value: '100', label: '100'},
    {value: '200', label: '200'},
    {value: '500', label: '500'}
];

interface PropTypes {
    paginator: Paginator;
    setPaginator?: Function;
    totalCount?: number;
    currentPage?: number;
    setCurrentPage?: Function;
}

export const QuotesResultPaginator = ({ paginator, setPaginator = () => {}, totalCount = 0}: PropTypes) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const pageNum = Math.floor(totalCount / paginator?.perPage) + (totalCount % paginator?.perPage > 0 ? 1: 0)
    const setPerPage = (item: OptionType) => {
        const perPage = parseInt(item.value,10);
        let paginatorCopy = JSON.parse(JSON.stringify(paginator))
        paginatorCopy.perPage = perPage
        paginatorCopy.page = 1
        setPaginator(paginatorCopy)
    }
    const setCurrentPage = (page: number) => {
        let paginatorCopy = JSON.parse(JSON.stringify(paginator))
        paginatorCopy.page = page;
        setPaginator(paginatorCopy)
    }
    return (
        <div className="w-full fixed overflow-visible z-10 bottom-0 left-0 shadow-sxl border-[#cecece] rounded-sm">
            <div className="bg-white px-24 py-6">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-4 font-medium">
                        <div className="text-sbase">Show</div>

                        <div className="relative min-w-[56px]" onClick={() => setShowDropdown(!showDropdown)}>
                            <div className="flex items-center justify-between w-full px-4 py-1 cursor-pointer border border-solid border-disabled-gray-2 rounded">
                                <div>{paginator.perPage}</div>
                                <svg
                                    className="icon"
                                    viewBox="0 0 1024 1024"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    p-id="1325"
                                    width="12"
                                    height="12"
                                >
                                    <path
                                        d="M859.8528 292.9664H164.1472c-40.1408 0-60.3136 48.5376-31.8464 77.0048L480.1536 717.824c17.6128 17.6128 46.1824 17.6128 63.7952 0l347.8528-347.8528c28.3648-28.4672 8.2944-77.0048-31.9488-77.0048z"
                                        p-id="1326"
                                    ></path>
                                </svg>
                            </div>
                            {
                                showDropdown && (
                                    <div className="bg-white min-h-[100px] absolute bottom-0 left-0 z-30 min-w-[56px] shadow-sxl">
                                        {
                                            PAGE_OPTIONS.length && PAGE_OPTIONS.map((item, index) => {
                                                return (
                                                    <div key={`option_${index}`} className={`flex items-center p-2 cursor-pointer hover:bg-[#f7f7f7] ${item.value === paginator.perPage.toString() ? ' bg-[#f7f7f7]': ''}`} onClick={() =>setPerPage(item)}>{item.label}</div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            }
                        </div>

                        <div className="text-sbase">entries</div>
                        <Pagination
                            pageNum={pageNum}
                            toSpecifiedPage={(page: number) => {
                                setCurrentPage(page)
                            }}
                            setCurrent={(current: number) => {
                                setCurrentPage(current);
                            }}
                            currentPage={paginator.page}
                            prev={() => {
                                setCurrentPage(paginator.page-1)
                            }}
                            next={() => {
                                setCurrentPage(paginator.page+1)
                            }}
                            totalCnt={totalCount}
                            perPage={paginator.perPage}
                        />
                        <div className="items-center hidden md:flex">
                            <div className="text-sbase">
                                Showing &nbsp;<span className="text-green-1">{(paginator.page - 1)  * paginator.perPage + 1}</span> to &nbsp;
                                <span className="text-green-1">{paginator.page  * paginator.perPage >= totalCount ? totalCount : paginator.page  * paginator.perPage}</span> &nbsp; of &nbsp;
                                <span className="text-green-1">{totalCount}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-8">
                        <ButtonQuote disabled={paginator.page <= 1} label="previous" type="button" className={`uppercase  py-4 px-5 rounded-lg text-sbase font-medium flex justify-center items-center ${paginator.page > 1 ? ' bg-green-1 text-white':' bg-disabled-gray text-disabled-graytext'}`}
                                     onClick={() => setCurrentPage(paginator.page -1)}
                        />
                        <ButtonQuote disabled={paginator.page >= pageNum} label="next" type="button" className={`uppercase bg-green-1 py-4 px-5 text-white rounded-lg text-sbase font-medium flex justify-center items-center ${paginator.page < pageNum ? ' bg-green-1 text-white' : ' bg-disabled-gray text-disabled-graytext'}`}
                                     onClick={() => setCurrentPage(paginator.page +1)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}