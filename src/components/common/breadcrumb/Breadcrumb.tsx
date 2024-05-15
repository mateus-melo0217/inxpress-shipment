import React from "react";

type Props = {
    title: string
}

export const Breadcrumb = (props: Props) => {
    return (
        <div className="bg-blue-1 p-7">
            <h1 className="text-white uppercase font-black text-sxl m-0">{props.title}</h1>
        </div>
    )
}