import React from "react";

interface PropTypes {
    carrierName: string
}

export const CarrierColumn = ({carrierName}: PropTypes) => {
    
    return (
        <div className="flex justify-center w-[100%] break-all">
            {carrierName}
        </div>
    );
};