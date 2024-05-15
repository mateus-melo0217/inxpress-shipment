import React from "react";

interface PropTypes {
    cellContext: any,
}

interface CellTypes {
    code: any,
    providerCode: any,
    name: string,
    description: string
}

export const AccessorialColumn = ({cellContext}: PropTypes) => {
  
    return (
        <ul className="max-w-[200px] text-center">
            {cellContext.row.original.accessorialCodes?.length ? cellContext.row.original.accessorialCodes.map((item:CellTypes, index:number)=><li className="list-none block" key={index}>{item.name}</li>) : "No accessorials"}
        </ul>
    );
};