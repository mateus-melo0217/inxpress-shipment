import React from 'react';
import { get, has } from 'lodash';
import {ValidationType} from "./Types";
import {HiMinusSm, HiPlusSm} from "react-icons/hi";
import {useFormContext} from "react-hook-form";

type PropTypes = {
    id: string;
    label?: string;
    className?: string;
    placeholder: string;
    validation: ValidationType;
}

export default function InputNumber({id, label, className, placeholder, validation}: PropTypes) {
    const { register, setValue, getValues, formState: { errors } } = useFormContext();

    //increase counter
    const increase = () => {
        const currentValue = Number(getValues(id));
        setValue(
            id,
            Number(currentValue + 1),
            { shouldValidate: true }
        );
    };

    //decrease counter
    const decrease = () => {
        const currentValue = Number(getValues(id));
        if(currentValue <= 1 ){
            return null;
        }
        setValue(
            id,
            Number(currentValue - 1)
        );
    };

    return (
        <div className={className}>
            <label className="text-sbase block w-full mt-7">
                {label}
            </label>
            <div>
                <div className="flex">
                    <input
                        {...register(id, validation)}
                        type="number"
                        min={0}
                        placeholder={placeholder}
                        className={"cursor-pointer !w-32 h-s19 rounded-[0.4rem] py-3 pl-8 border border-solid border-light-gray focus:outline-0 " + (has(errors, id) ? " border-red-1 placeholder:text-red-1 placeholder:opacity-40" : "")}
                    />
                    <div className="flex flex-col right-0">
                        <div
                            className="bg-blue-1 w-12 h-10 border border-solid border-light-gray cursor-pointer flex items-center justify-center transition-transform duration-100 scale-100 active:scale-90 rounded-tr-md"
                            onClick={increase}
                        >
                            <HiPlusSm size={'3rem'} color={'#fff'}/>
                        </div>
                        <div
                            className="bg-blue-1 w-12 h-10 border border-solid border-light-gray cursor-pointer flex items-center justify-center transition-transform duration-100 scale-100 active:scale-90 rounded-br-md"
                            onClick={decrease}
                        >
                            <HiMinusSm size={'3rem'} color={'#fff'}/>
                        </div>
                    </div>
                </div>
                {errors && <span className={'text-red-1 text-xl mt-2'}>{get(errors, id)?.message}</span>}
            </div>
        </div>
    );
}