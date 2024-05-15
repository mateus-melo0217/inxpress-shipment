import { useState, useEffect } from "react";
import ButtonQuote from "components/forms/buttons/ButtonQuote";
import {Table} from "@tanstack/react-table";
import {ShipmentTypes} from "./FreightHistoryTypes";
import {TiArrowSortedDown} from "react-icons/ti";
import {FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight} from "react-icons/fa";
import { PAGE_OPTIONS, PageOptionType } from "./FreightHistoryController";

interface PropTypes {
    table: Table<ShipmentTypes>
    totalCount: number;
    resetPaginator: Boolean;
    setResetPaginator: Function;
    selectedPerPage: PageOptionType;
    setSelectedPerPage: Function;
}

export const FreightHistoryPaginator = ({ table, totalCount, resetPaginator, setResetPaginator, selectedPerPage, setSelectedPerPage }: PropTypes) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const pageOptions = slicePageOption(
        table.getPageOptions(),
        table.getState().pagination.pageIndex,
        table.getPageCount() - 1
    )

    useEffect(()=> {
        if (resetPaginator) {
            table.setPageIndex(0)
            setResetPaginator(false)
        }
    }, [resetPaginator, table, setResetPaginator])

    return (
        <div className="w-full fixed overflow-visible z-10 bottom-0 left-0 shadow-sxl border-[#cecece] rounded-sm">
            <div className="bg-white px-24 py-6">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-4 font-medium">
                        <div className="text-sbase">Show</div>

                        <div className="relative min-w-[56px]" onClick={() => setShowDropdown(!showDropdown)}>
                            <div className="flex items-center justify-between w-full px-4 py-1 cursor-pointer border border-solid border-disabled-gray-2 rounded">
                                <div>{selectedPerPage.label}</div>
                                <TiArrowSortedDown size="1.3em"/>
                            </div>
                            {
                                showDropdown && (
                                    <div className="bg-white min-h-[100px] absolute bottom-0 left-0 z-30 min-w-[56px] shadow-sxl">
                                        {
                                            PAGE_OPTIONS.length && PAGE_OPTIONS.map((item, index) => {
                                                return (
                                                    <div key={`option_${index}`}
                                                         className={`flex items-center p-2 cursor-pointer hover:bg-[#f7f7f7] ${item.value === selectedPerPage.value ? ' bg-[#f7f7f7]': ''}`}
                                                         onClick={ () => {
                                                             table.setPageSize(Number(item.value));
                                                             setSelectedPerPage(item);
                                                         }}>
                                                        {item.label}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            }
                        </div>

                        <div className="text-sbase">entries</div>

                        <div className="items-center lg:my-8 my-4 hidden md:flex">

                            <div
                                className={`w-12 h-12 text-sbase border-disabled-gray-2 border flex items-center justify-center rounded ${table.getCanPreviousPage() ? 'cursor-pointer hover:bg-green-1 hover:text-white':' text-disabled-gray-2'}`}
                                onClick={ () => table.setPageIndex(0) }
                            >
                                <FaAngleDoubleLeft />
                            </div>

                            <div
                                className={`w-12 h-12 text-sbase border-disabled-gray-2 border flex items-center justify-center rounded ${table.getCanPreviousPage() ? 'cursor-pointer hover:bg-green-1 hover:text-white':' text-disabled-gray-2'}`}
                                onClick={ () => table.previousPage() }
                            >
                                <FaAngleLeft />
                            </div>

                            {pageOptions.map( (page, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={`w-12 h-12 text-sbase cursor-pointer  border hover:bg-green-1 hover:text-white flex items-center justify-center rounded ${ page === table.getState().pagination.pageIndex ? 'bg-green-1 text-white':''}`}
                                        onClick={ () => table.setPageIndex(page)}
                                    >
                                        {page + 1}
                                    </div>
                                );
                            })}

                            <div
                                className={`w-12 h-12 text-sbase border-disabled-gray-2 border flex items-center justify-center rounded ${table.getCanNextPage() ? 'cursor-pointer hover:bg-green-1 hover:text-white':' text-disabled-gray-2'}`}
                                onClick={ () => table.nextPage() }
                            >
                                <FaAngleRight />
                            </div>

                            <div
                                className={`w-12 h-12 text-sbase border-disabled-gray-2 border flex items-center justify-center rounded ${table.getCanNextPage() ? 'cursor-pointer hover:bg-green-1 hover:text-white':' text-disabled-gray-2'}`}
                                onClick={ () => table.setPageIndex(table.getPageCount() - 1) }
                            >
                                <FaAngleDoubleRight />
                            </div>

                        </div>

                        <div className="flex items-center">
                            <div className="text-sbase">
                                Showing &nbsp;<span className="text-green-1">{table.getState().pagination.pageIndex * parseInt(selectedPerPage.value) + 1}</span> to &nbsp;
                                <span className="text-green-1">{ table.getCanNextPage() ? table.getState().pagination.pageIndex * parseInt(selectedPerPage.value) + parseInt(selectedPerPage.value) : totalCount}</span> &nbsp; of &nbsp;
                                <span className="text-green-1">{totalCount}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-8">
                        <ButtonQuote
                            className={`uppercase py-4 px-5 rounded-lg text-sbase font-medium flex justify-center items-center ${table.getCanPreviousPage() ? ' bg-green-1 text-white':' bg-disabled-gray text-disabled-graytext'}`}
                            disabled={!table.getCanPreviousPage()}
                            label="previous"
                            type="button"
                            onClick={() => table.previousPage()}
                        />
                        <ButtonQuote
                            className={`uppercase bg-green-1 py-4 px-5 text-white rounded-lg text-sbase font-medium flex justify-center items-center ${table.getCanNextPage() ? ' bg-green-1 text-white' : ' bg-disabled-gray text-disabled-graytext'}`}
                            disabled={!table.getCanNextPage()}
                            label="next"
                            type="button"
                            onClick={() => table.nextPage()}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

function slicePageOption(pageOptions: number[], pageIndex: number, pageCount: number){

    if(pageIndex === 0){
        return pageOptions.slice( 0, pageIndex + 3 );
    }

    if(pageIndex === pageCount){
        return pageOptions.slice( pageIndex - 2, pageIndex + 1 );
    }

    return pageOptions.slice( pageIndex - 1, pageIndex + 2 );
}