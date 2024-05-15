import React from "react";
interface PropTypes {
    cellContext: any,
}

export const DestinationColumn = ({cellContext}: PropTypes) => {
    const quoteRequest = cellContext.row.original;
    return (
        <div className="text-ellipsis overflow-hidden break-all max-w-[70px] flex items-center justify-between">
            {quoteRequest?.destinationAddressCode} / {quoteRequest?.destinationState.toUpperCase()} / {quoteRequest?.destinationCity}
        </div>
    );
};