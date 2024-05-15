import React from "react";

interface PropTypes {
    quoteNumber: null | string
}

export const QuoteNumberColumn = ({quoteNumber}: PropTypes) => {

    return (
        <div className="flex justify-center w-[100%] break-all">
            {quoteNumber}
        </div>
    );
};