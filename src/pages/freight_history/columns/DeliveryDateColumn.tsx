import React from "react";
import moment from "moment";

interface PropTypes {
    cellContext: any,
}

export const DeliveryDateColumn = ({cellContext}: PropTypes) => {    
  const pickupDateTime = cellContext.row.original.pickupDateTime && !cellContext.row.original.pickupDateTime.startsWith("0001")
    ? moment(cellContext.row.original.pickupDateTime, 'YYYY/MM/DD') : "";
  const deliveryDateFromRequest = cellContext.row.original.deliveryDate;
  const deliveryDateAsString = deliveryDateFromRequest ? moment(deliveryDateFromRequest).format('YYYY/MM/DD') : "";
  const deliveryDate = pickupDateTime ? deliveryDateAsString : "";

    return (
        <>
            {deliveryDate}
        </>
    );
};