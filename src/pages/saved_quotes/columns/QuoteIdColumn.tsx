import React from "react";

interface PropTypes {
    cellContext: any,
}

export const QuoteIdColumn = ({cellContext}: PropTypes) => {
    const quoteId = cellContext.row.original?.uuid
    return (
        <div className="flex justify-center">
            {quoteId}
        </div>
    );
};