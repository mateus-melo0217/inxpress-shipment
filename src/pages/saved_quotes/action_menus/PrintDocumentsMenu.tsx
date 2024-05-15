import React from "react";
import {AiFillPrinter} from "react-icons/ai";
import { printDocument } from "../SavedQuotesQueries";

interface PropTypes {
    row: any;
    options: { label: string, is_active: boolean };
}

export const PrintDocumentsMenu = ({row, options}: PropTypes) => {
    const internalQuoteId = row.original.id;

    return (
        <div
            className={`border-b border-dashed border-light-gray flex items-center text-blue-1 px-3 py-5 font-medium text-sbase transition-all duration-200 border-r ${options.is_active ? 'hover:text-green-1 cursor-pointer' : 'opacity-20 cursor-default'}`} onClick={()=>printDocument(internalQuoteId)}
        >
            <AiFillPrinter size='1.3em' className="mr-3"/>
            {options.label}
        </div>
    );
};