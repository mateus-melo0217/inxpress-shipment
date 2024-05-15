import React from 'react';
import {useFormContext} from "react-hook-form";

type PropTypes = {
    id: string,
    options: { value: string, label: string }[];
}

export default function RadioButtons({id, options}: PropTypes) {
    const { register } = useFormContext();

    return (
        <>
            {options.map((item, i) =>
                <div key={i} className="flex items-center space-x-2">
                    <input
                        {...register(id)}
                        type="radio"
                        value={item.value}
                        className="cursor-pointer accent-blue-1"
                    />
                    <label>{item.label}</label>
                </div>
            )}
        </>
    );
}