import React from "react";

interface PropTypes {
    providerQuoteId: null | string
}

export const ProviderQuoteIdColumn = ({providerQuoteId}: PropTypes) => {

    return (
        <div className="flex justify-center w-[100%] break-all">
            {providerQuoteId}
        </div>
    );
};