import React from "react";

interface PropTypes {
    cellContext: any,
}

export const ServiceTypeColumn = ({cellContext}: PropTypes) => {

    return (
        <div className="w-full text-center">
            {cellContext.getValue()}
        </div>
    );
};