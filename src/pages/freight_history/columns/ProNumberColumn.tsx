import React, { useState } from "react";
import { FaPencilAlt,FaCheck } from "react-icons/fa";
import { isEmpty } from "lodash";
import apiClient from "utils/apiClient";

interface PropTypes {
    cellContext: any;
}

export const ProNumberColumn = ({ cellContext }: PropTypes) => {
    const [isEditable, setIsEditable] = useState(false);
    const [hasSaved, setHasSaved] = useState(false);
    const [originValue, setOriginValue] = useState(isEmpty(cellContext.getValue()) ? "" : cellContext.row.original.issuedProNumber);
    const [currentValue, setCurrentValue] = useState(isEmpty(cellContext.getValue()) ? "" : cellContext.row.original.customerProNumber);
    const [inputValue, setInputValue] = useState(isEmpty(cellContext.getValue()) ? "" : cellContext.row.original.customerProNumber);
    const [msg, setMessage] = useState("");
    
    const onClickCheck = () => {

        if(!cellContext.row.original.shipmentId || !inputValue) {
            setMessage("Put the valid data!")
            return
        }

        apiClient.post(`freight-shipment/${cellContext.row.original.shipmentId}/pronumber/${inputValue}`, {data:{}})
            .then((response: any) => {
                setIsEditable(false);
                setOriginValue(currentValue);
                setCurrentValue(inputValue);
            });
    }

    const onClickPencil = () => {
        setHasSaved(true);
        setIsEditable(true);
    }

    return (
        <div
            className="flex items-center justify-between space-x-2 pr-4"
        >
            {isEditable ? (
                <div>
                    <input
                        className={(!msg && currentValue) ?`underline text-blue-1 max-w-[110px]`:`underline text-blue-1 max-w-[110px] outline outline-offset-2 outline-2`}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    {msg && !currentValue && <p className="text-red-600 mt-[5px]">{msg}</p>}
                </div>
            ) : (hasSaved || currentValue !== originValue) ? (
                <div className="flex flex-col max-w-[110px]">
                    <span className="text-lighter-gray text-ssmall mb-1">Orig:{originValue}</span>
                    <span className="text-green-1 underline">{currentValue}</span>
                </div>
            ) : (
                <span className="text-green-1 underline max-w-[110px]">{currentValue}</span>
            )}
            <div className="p-3 cursor-pointer">
                {isEditable ? (
                    <FaCheck
                        onClick={onClickCheck}
                        color="#0c214c"
                        size="1.2em"
                    />
                ) : (
                    <FaPencilAlt
                        onClick={onClickPencil}
                        size="1.2em"
                        color={"#167979"}
                    />
                )}
            </div>
        </div>
    );
};