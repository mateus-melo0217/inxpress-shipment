import React from "react";

interface PropTypes {
    palletCount: any,
}

export const HandlingUnitsColumn = ({palletCount}: PropTypes) => {
    return (
        <div className="flex justify-center w-[100%] break-all">
            {palletCount}
        </div>
    );
};