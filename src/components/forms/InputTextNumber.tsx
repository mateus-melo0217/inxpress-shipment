import React from 'react';
import {get, has} from 'lodash';
import {ValidationType} from "./Types";
import {useFormContext} from "react-hook-form";

interface PropTypes {
    id: string;
    label?: string;
    className?: string;
    placeholder: string;
    validation: ValidationType;
    readOnly?: boolean;
}

export default function InputTextNumber({id, label, className, placeholder, validation, ...others}: PropTypes) {
    const { register, formState: { errors } } = useFormContext();

    const preventE = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'e') {
          event.preventDefault();
        }
      }

    return (
        <div className={className}>
            {label && <label className="text-sbase block w-full mt-8">{label}</label>}
            <div>
                <input
                    {...register(id, validation)}
                    placeholder={placeholder}
                    type="number"
                    onKeyDown={(e)=>preventE(e)}
                    className={"h-[38px] cursor-pointer w-full rounded-[0.4rem] py-3 px-5 border border-solid border-light-gray" + (has(errors,id) ? " border-red-1 placeholder:text-red-1 placeholder:opacity-40" : "") }
                    {...others}
                />
                {errors && <span className={'text-red-1 text-xl mt-2'}>{get(errors, id)?.message}</span>}
            </div>
        </div>
    );
};