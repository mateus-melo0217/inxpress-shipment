import React, { useState } from "react";
import { TbFileExport } from "react-icons/tb";
import { AiFillSetting } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdCancel } from 'react-icons/md'
import Button from "components/forms/buttons/Button";
import {ColumnShowSettingMenu} from "./column_settings/ColumnShowSettingMenu";
import { exportShipmentSummaries } from "pages/bol_info/api/bol_api";
import { SortingState, Table } from "@tanstack/react-table";
import {QuoteTypes} from "./QuotesTypes";
import { PAGE_OPTIONS, PageOptionType } from "./QuotesController";

type PropTypes = {
    isFilterOpen: Boolean;
    toggleFilter:Function
    sorting: SortingState;
    table: Table<QuoteTypes>;
    perPage: PageOptionType;
    setPerPage: Function;
}

export const QuotesTopOptions = ({isFilterOpen, toggleFilter, sorting, table, perPage, setPerPage}: PropTypes) => {
    const [pageMenuOpen, setPageMenuOpen] = useState(false);
    const [isSettingMenuOpen, setSettingMenuOpen] = useState(false);
    return (
        <>
            <div className="flex justify-end w-full relative p-5">
                <div className="flex items-center space-x-6">
                    <Button
                        id="export"
                        label="EXPORT AS CSV"
                        icon={<TbFileExport className="ml-2" size="1.3em" />}
                        onClick={() => {
                            exportShipmentSummaries(sorting);
                        }}
                    />
                    <div className="flex items-center cursor-pointer" onClick={() => {setSettingMenuOpen(!isSettingMenuOpen)}}>
                        <AiFillSetting size="1.2em" />
                        <div className="text-md">Column settings</div>
                    </div>
                </div>
                {
                    isSettingMenuOpen && <ColumnShowSettingMenu setIsOpen={setSettingMenuOpen} />
                }
            </div>
            <div className="flex items-center w-full mb-4">
                {
                    isFilterOpen?
                        <MdCancel size="1.5em" className="cursor-pointer" onClick={() => toggleFilter(!isFilterOpen)}/>
                        :
                        <GiHamburgerMenu size="1.5em" className="cursor-pointer" onClick={() => toggleFilter(!isFilterOpen)}/>
                }
                <div
                    className="relative min-w-[56px] ml-8"
                >
                    <div className="flex items-center justify-between w-full px-4 py-1 cursor-pointer border border-solid border-disabled-gray-2 rounded" onClick={()=> setPageMenuOpen(!pageMenuOpen)}>
                        <div>{perPage.label}</div>
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
                    {pageMenuOpen && (
                        <div className="bg-white min-h-[100px] absolute left-0 z-30 min-w-[56px] shadow-sxl">
                            {PAGE_OPTIONS.length &&
                                PAGE_OPTIONS.map((item, index) => {
                                    return (
                                        <div
                                            key={`option_${index}`}
                                            className={`flex items-center p-2 cursor-pointer hover:bg-light-gray2 
                                    ${true ? " bg-light-gray2" : ""}`}
                                            onClick={() =>{
                                                setPageMenuOpen(false)
                                                setPerPage(item)
                                                table.setPageSize(Number(item.value))
                                            }}
                                        >
                                            {item.label}
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                </div>
                <div className="text-sbase ml-4">entries</div>
            </div>
        </>
    );
};