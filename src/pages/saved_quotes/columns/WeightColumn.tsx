import React from "react";
import {isNil} from "lodash";

interface PropTypes {
    cellContext: any,
}

export const WeightColumn = ({cellContext}: PropTypes) => {
    const items = cellContext.row.original?.freightItems;

    if (isNil(items)){
        return null;
    }

    return (
        <div className="flex justify-center">
            {items && items.map((item: any) => item.weight * item.numberOfUnits).reduce((w1: number, w2: number) => w1 + w2, 0)} lbs
        </div>
    );
};