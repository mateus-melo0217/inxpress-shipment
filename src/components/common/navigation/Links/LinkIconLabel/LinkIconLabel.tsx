import React from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {RiContactsBook2Fill} from "react-icons/ri";
import {FiPlusCircle} from "react-icons/fi";

type PropTypes = {
    icon: string
    label: string
    onClick?: React.MouseEventHandler
}

export const LinkIconLabel = ({icon, label, onClick = () => {}} : PropTypes) => {

    const IconMap : {[index: string]:any} = {
        "FaEye": FaEye,
        "FaEyeSlash": FaEyeSlash,
        "RiContactsBook2Fill": RiContactsBook2Fill,
        "FiPlusCircle": FiPlusCircle
    }

    const IconComponent = IconMap[icon];

    return (
        <div className="flex items-center bg-transparent border-none right-0 top-2 text-green-1 cursor-pointer text-xl focus:outline-none" onClick={onClick}>
            <IconComponent color='#167979' size='1.5em'/>
            <span className="pl-2">{label}</span>
        </div>
    )
}