import React from "react";

interface PropTypes {
    cellContext: any,
}

export const UnitTypeColumn = ({cellContext}: PropTypes) => {

    return (
        <>
            {cellContext.renderValue()}
        </>
    );
};