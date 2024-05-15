import moment from "moment";
import React from "react";

interface PropTypes {
    cellContext: any,
}

export const ShipDateColumn = ({cellContext}: PropTypes) => {

    return (
        <>
            {cellContext.row.original.shipDate && !cellContext.row.original.shipDate.startsWith("0001")
                ? moment(cellContext.row.original.shipDate).format('YYYY/MM/DD') : ""}
        </>
    );
};