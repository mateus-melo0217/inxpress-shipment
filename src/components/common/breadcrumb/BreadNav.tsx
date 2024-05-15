import React from "react";
import { Link, useLocation } from "react-router-dom";

const routerMap: any = {
    '/freight_history': 'Freight History',
    '/saved_quotes' : 'Saved Quotes'
}

export const BreadNav = () => {
    const location = useLocation();
    const path = location.pathname;
    return (
        <div className="flex items-center space-x-2 mt-8 mb-2 ml-10">
            <Link to="/">
                <div className="uppercase blue-1 text-slg">Home /</div>
            </Link>
            <Link to={path}>
                <div className="text-slg text-dark-gray">{routerMap[path]}</div>
            </Link>
        </div>
    )
}