import React from "react";
import {HiClock} from "react-icons/hi";
import {IoMdCloseCircle} from "react-icons/io";
import {FaQuestionCircle} from "react-icons/fa"
import {IoCheckmarkCircleSharp, IoNavigateCircleSharp} from "react-icons/io5";

interface PropTypes {
    cellContext: any,
}

export const StatusColumn = ({cellContext}: PropTypes) => {

    let iconComponent = null;

    switch (cellContext.getValue()) {
        case "Dispatched":
            iconComponent = <IoCheckmarkCircleSharp size="1.3em" color={'#167979'}/>
            break;
        case "Void":
            iconComponent = <IoMdCloseCircle size="1.3em" color={'#d23f37'}/>
            break;
        case "In Transit":
            iconComponent = <IoNavigateCircleSharp size="1.3em" color={'#89bff4'}/>
            break;
        case "Expired":
            iconComponent = <HiClock size="1.3em" color={'gray'}/>
            break;
        case "Unknown":
            iconComponent = <FaQuestionCircle size="1.3em" color={'gray'}/>
            break;
        default:
            iconComponent = <IoCheckmarkCircleSharp size="1.3em" color={'#167979'}/>
    }

    return (
        <div className="flex items-center space-x-1">
            {iconComponent} {cellContext.getValue()}
        </div>
    );
};