import React from 'react';
import {FaSearchDollar} from "react-icons/fa";

type Props = {
    id: string,
    label: string,
    icon?: any,
    onClick?: Function
}

/**
 * Form Button
 * @param props
 * @returns {JSX.Element}
 */
export default function Button(props: Props) {
    return (
        <button
            className='bg-green-1 p-7 text-white rounded-md text-slg font-normal uppercase m-auto flex w-80 justify-center'
            type="submit"
            onClick={() => props.onClick?.()}
        >
            <span>{props.label}</span>
            {
                props.icon ? props.icon : <FaSearchDollar className='ml-3' color='#fff' size='1.5em'/>
            }
        </button>
    );
}