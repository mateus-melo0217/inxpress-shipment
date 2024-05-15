import React from "react";
import {MdOutlineAdd} from "react-icons/md";

interface PropTypes {
    setHIndex: Function;
    row: any;
}

export const AddTagNameMenu = ({setHIndex, row}: PropTypes) => {
    return (
        <div
            className="w-full py-5 rounded-t-md bg-green-1 flex items-center justify-center uppercase text-white space-x-4 text-slg cursor-pointer">
            <div className="rounded-full bg-white w-8 h-8 flex items-center justify-center">
                <MdOutlineAdd className="text-green-1"/>
            </div>
            <div>add tag name</div>
        </div>
    );
};