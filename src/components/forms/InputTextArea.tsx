import React from 'react';
import {get, has} from 'lodash';
import {ValidationType} from "./Types";
import {useFormContext} from "react-hook-form";

interface PropTypes {
    id: string;
    label?: string;
    rows?: number;
    cols?: number;
    className?: string;
    placeholder: string;
    validation: ValidationType;
}

export default function InputTextArea({id, label, rows, cols, className, placeholder, validation}: PropTypes) {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className={className}>
            {label && <label className="text-sbase block w-full mt-8">{label}</label>}
            <div className={''}>
                <textarea
                    {...register(id, validation)}
                    placeholder={placeholder}
                    className={"cursor-pointer w-full md:rounded-[0.4rem] py-3 px-5 border border-solid border-light-gray" + (has(errors,id) ? " border-red-1 placeholder:text-red-1 placeholder:opacity-40" : "") }
                    rows={rows}
                    cols={cols}
                />
                {errors && <span className={'text-red-1 text-xl mt-2'}>{get(errors, id)?.message}</span>}
            </div>
        </div>
    );
};