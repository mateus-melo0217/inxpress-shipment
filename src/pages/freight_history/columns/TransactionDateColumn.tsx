import React from "react";
import moment from "moment";

interface PropTypes {
    cellContext: any,
}

export const TransactionDateColumn = ({cellContext}: PropTypes) => {    
  const transactionTime = cellContext.row.original.transactionTime ? moment(cellContext.row.original.transactionTime).format('MM/DD/YYYY hh:mm:ss') : "";

    return (
        <div className="flex justify-center text-center">
            {transactionTime}
        </div>
    );
};