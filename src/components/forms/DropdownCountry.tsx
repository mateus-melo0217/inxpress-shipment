import React from 'react';
import {Controller, useFormContext} from "react-hook-form";
import Select, {components} from 'react-select';
import {get, has} from "lodash";
import {ValidationType} from "./Types";

export interface PropTypes {
    id: string;
    label: string;
    options: any;
    className?: string;
    placeholder: string;
    validation: ValidationType;
    setIsOriCountryChanged: Function;
    isOriCountryChanged: boolean;
    setIsDesCountryChanged: Function;
    isDesCountryChanged: boolean;
}

export default function DropdownCountry({id, label, options, className, placeholder, validation, setIsOriCountryChanged, isOriCountryChanged, setIsDesCountryChanged, isDesCountryChanged} : PropTypes) {
    const { control, formState: { errors } } = useFormContext();
    const { Option, SingleValue } = components;

    const OptionContent = (props: any ) => (
        <div className={'flex items-center justify-between'}>
            <span >{props.data.label}</span>
            <img alt={''} className={''} src={`images/flags/24/${props.data.code}.png`} />
        </div>
    );

    const IconOption = (props: any) => (
        <Option {...props}>
            <OptionContent {...props} />
        </Option>
    );

    const SelectedValueOption = (props: any) => (
        <SingleValue {...props}>
            <OptionContent {...props} />
        </SingleValue>
    );

    const style = {
        control: (base:any) => ({
            ...base,
            border: '1px red solid',
        }),
        placeholder: (base:any) => ({
            ...base,
            color: 'red',
            opacity: '0.4',
        }),
    }

    return (
        <div className={className}>
            {label && <label className="text-sbase block w-full mt-8">{label}</label>}
            <div>
                <Controller
                    name={id}
                    control={control}
                    rules={validation}
                    render={({ field }) =>
                        <Select {...field}
                                styles={ has(errors,id) ? style : undefined}
                                placeholder={placeholder}
                                options={options}
                                components={{
                                    Option: IconOption,
                                    SingleValue: SelectedValueOption
                                }}
                                onChange={(selectedOption) => {
                                    if(id === "origin_country") setIsOriCountryChanged(!isOriCountryChanged);
                                    else if(id === "destination_country") setIsDesCountryChanged(!isDesCountryChanged);
                                    field.onChange(selectedOption);
                                }}
                        />
                    }
                />
            </div>
            {errors && <span className={'text-red-1 text-xl mt-2'}>{get(errors, id)?.message}</span>}
        </div>
    );
}