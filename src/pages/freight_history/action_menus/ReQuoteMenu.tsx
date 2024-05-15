import React from "react";
import {useNavigate} from "react-router-dom";
import {ImLoop2} from "react-icons/im"

interface PropTypes {
    setHIndex: Function;
    row: any;
    options: { label: string, is_active: boolean };
}

export const ReQuoteMenu = ({setHIndex, row, options}: PropTypes) => {

    const navigate = useNavigate();

    const onClick = () => {
        navigate(`/get_pricing/shipment/${row.original.shipmentId}`);
        setHIndex(-1);
    }

    return (
        <div
            className={`border-b border-dashed border-light-gray flex items-center text-blue-1 p-3 font-medium text-sbase transition-all duration-200 border-r ${options.is_active ? 'hover:text-green-1 cursor-pointer' : 'opacity-20 cursor-default'}`}
            onClick={options.is_active ? onClick: ()=>{}}
        >
            <ImLoop2 size='1.3em' className="mr-3"/>
            {options.label}
        </div>
    );
};