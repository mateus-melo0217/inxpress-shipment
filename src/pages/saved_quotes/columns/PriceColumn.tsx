import React from "react";

interface PropTypes {
    price: any,
}

export const PriceColumn = ({price}: PropTypes) => {
    return (
        <div className="flex justify-center w-[100%] break-all">
            ${price}
        </div>
    );
};