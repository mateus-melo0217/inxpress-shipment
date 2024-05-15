import React, { useEffect, useRef } from 'react';
import {Controller, useFormContext} from "react-hook-form";
import Select from 'react-select';
import {get, has, isFunction, isNil} from "lodash";
import {ValidationType} from "./Types";

export interface PropTypes {
    id: string;
    label?: string;
    options: any;
    className?: string;
    exCls?: string;
    placeholder?: string;
    validation?: ValidationType;
    isMulti?: boolean;
    resetFilter?: boolean;
    setResetFilter?: any;
    isOptionDisabled?: any;
    onChange?:Function;
}

export default function Dropdown({id, label, options, className, exCls, placeholder, validation, isMulti = false, resetFilter = false, setResetFilter, isOptionDisabled, onChange}: PropTypes) {
    const {control, formState: {errors}} = useFormContext();

    const selectInputRef: any = useRef();
    const styleDefault = {
        multiValueLabel: (base: any) => ({
            ...base,
            borderBottom: '1px solid #167979',
            borderTop: '1px solid #167979',
            borderLeft: '1px solid #167979',
            backgroundColor: 'white',
            borderBottomRightRadius: '0px',
            borderTopRightRadius: '0px',
            // color: '#167979'
        }),
        multiValueRemove: (base: any) => ({
            ...base,
            backgroundColor: 'white',
            borderBottom: '1px solid #167979',
            borderTop: '1px solid #167979',
            borderRight: '1px solid #167979',
            borderTopLeftRadius: '0px',
            borderBottomLeftRadius: '0px',
        }),
    }

    const styleError = {
        control: (base: any) => ({
            ...base,
            border: '1px red solid',
        }),
        placeholder: (base: any) => ({
            ...base,
            color: 'red',
            opacity: '0.4',
        }),
    }

    useEffect(() => {
        if (resetFilter) {
            selectInputRef.current.clearValue();
            setResetFilter(false)
        }
    }, [resetFilter, setResetFilter])

    return (
        <div className={className}>
            {label && <label className={`text-sbase block w-full mt-8 ${exCls}`}>{label}</label>}
            <div>
                <Controller
                    name={id}
                    control={control}
                    rules={validation}
                    render={({field}) =>
                        <Select {...field}
                                name={field.name}
                                ref={selectInputRef}
                                styles={has(errors, id) ? styleError : styleDefault}
                                placeholder={placeholder}
                                options={options}
                                isMulti={isMulti}
                                isOptionDisabled={isOptionDisabled}
                                className='h-[auto] text-sbase'
                                value={field.value}
                                onChange={(e)=>{
                                    field.onChange(e);
                                    if(isFunction(onChange)) {
                                        if(isNil(e)){
                                            onChange(e);
                                        }
                                        else{
                                            onChange(field.value)
                                        }
                                    }
                                }}
                        />
                    }
                />
            </div>
            {errors && <span className={'text-red-1 text-xl mt-2'}>{get(errors, id)?.message}</span>}
        </div>
    );
}