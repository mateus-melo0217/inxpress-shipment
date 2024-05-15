import React from "react";
import {NavLink} from "react-router-dom";

type PropTypes = {
    children: string
    to: string;
}

export const HeaderNavLink = (props: PropTypes) => {
    return (
        <li className="no-underline font-bold text-sxl capitalize whitespace-nowrap relative hover:text-green-1">
            <NavLink
                to={props.to}
                className={( { isActive }) =>(
                    isActive
                        ? "text-green-1 pb-2 border-b-2 border-solid border-green-1"
                        : "no-underline font-bold text-sxl capitalize whitespace-nowrap relative"
                )}
            >
                {props.children}
            </NavLink>
        </li>
    )
}