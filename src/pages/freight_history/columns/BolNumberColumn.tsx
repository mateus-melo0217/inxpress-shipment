import React from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";
interface PropTypes {
    cellContext: any,
}

export const BolNumberColumn = ({cellContext}: PropTypes) => {

    return (
        <div className="flex text-green-1">
            <span className="">{cellContext.row.original.hotShipment &&
                <BsFillLightningChargeFill size="1em"/>}</span>
            <span>{cellContext.getValue()}</span>
        </div>
    );
};