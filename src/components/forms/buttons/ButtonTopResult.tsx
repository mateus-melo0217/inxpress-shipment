import React from "react";
import {AiOutlineClockCircle} from "react-icons/ai";
import {FaLongArrowAltRight} from "react-icons/fa";
import {BsCurrencyDollar} from "react-icons/bs";
import {MdOutlineFilterAlt} from "react-icons/md";

type Props = {
    borderColor: string;
    bgColor: string;
    label: string;
    transitTime?: string;
    isSelected: boolean;
    balance?: string
    onClick?: React.MouseEventHandler
    className?: string;
}

export default function ButtonTopResult(props: Props) {
    const {borderColor, bgColor, label, transitTime = "", balance = "", isSelected, onClick, className} = props;
    return (
        <button onClick={onClick}
            style={{backgroundColor: bgColor, borderColor: borderColor}}
            className={`rounded-md flex justify-center items-center py-3 md:px-6 px-4 border border-solid ${className}`}>
            { isSelected && <MdOutlineFilterAlt size="1.8em" className="mx-2"/> }
            <span className="uppercase font-medium md:text-4xl text-1xl whitespace-nowrap">{label}:</span>
            <AiOutlineClockCircle size="1.2em" className="mx-2 hidden md:block"/>
            <span className="mr-2 hidden md:block">{transitTime} days</span>
            <FaLongArrowAltRight size="1.1em"  className="mx-2"/>
            <BsCurrencyDollar size="1.4em" className="mx-1"/>
            <span className="md:text-4xl text-1xl">{balance}</span>
        </button>
    )
}