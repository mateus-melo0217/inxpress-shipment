import { updHotShipment } from "pages/bol_info/api/bol_api";
import React from "react";
import {BsFillLightningChargeFill} from "react-icons/bs";

interface PropTypes {
    setHIndex: Function;
    row: any;
    options: { label: string, is_active: boolean };
}

export const HotShipmentMenu = ({setHIndex, row, options}: PropTypes) => {

    return (
        <div
            onClick={options.is_active ? () => {
                updHotShipment(row.original.shipmentId, !row.original.hotShipment);
                row.original.hotShipment = !row.original.hotShipment;
                setHIndex(-1);
            }: ()=>{}}
            className={`border-b border-dashed border-light-gray flex items-center text-blue-1 p-3 font-medium text-sbase transition-all duration-200 border-r ${options.is_active ? 'hover:text-green-1 cursor-pointer' : 'opacity-20 cursor-default'}`}
        >
            <BsFillLightningChargeFill size='1.3em' className="mr-3"/>
            {row.original.hotShipment ? "Unmark Hot Shipment" : options.label}
        </div>
    );
};


