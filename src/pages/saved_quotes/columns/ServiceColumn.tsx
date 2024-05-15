import React from "react";

interface PropTypes {
    serviceType: any,
}

export const ServiceColumn = ({serviceType}: PropTypes) => {
    return (
        <div className="flex justify-center w-[100%] break-all">
            {serviceType}
        </div>
    );
};