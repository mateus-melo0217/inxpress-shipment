import React from "react";
import {FaTruck} from 'react-icons/fa'
interface PropTypes {
    transitTime: any,
}

export const TransitTimeColumn = ({transitTime}: PropTypes) => {
    return (
        <div className="flex justify-center items-center w-[100%] break-all">
           <FaTruck /> <span className="ml-2">{transitTime}</span> day{transitTime === '1' ? null : 's'}
        </div>
    );
};