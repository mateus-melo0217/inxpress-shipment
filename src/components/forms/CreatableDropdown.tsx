import React, {useState} from 'react';
import {Controller, ControllerRenderProps, useFormContext} from "react-hook-form";
import {get, has} from "lodash";
import {ValidationType} from "./Types";
import CreatableSelect from 'react-select/creatable';
import Tippy from '@tippyjs/react';

export interface PropTypes {
    id: string;
    label?: string;
    options: any;
    initialValue?: any;
    className?: string;
    placeholder?: string;
    validation?: ValidationType;
    isMulti?: boolean;
    noOptionsMessage: string;
    onChange?: Function;
}

export default function CreatableDropdown({
    id, label, options, initialValue, className, placeholder, validation, isMulti = false, noOptionsMessage, onChange}: PropTypes) {
    const {control, formState: {errors}, getValues} = useFormContext();
    const isInputPreviouslyBlurred = React.useRef(false);
    const [value, setValue] = useState(initialValue);
    const [inputValue, setInputValue] = useState(initialValue?.label || "");

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

    const onValueChange = (field: ControllerRenderProps, val: any) => {
        setInputValue("")
        setValue(val);
        field.onChange(val);
        if (onChange) onChange(val);
    }

    const onMenuClose = (field: ControllerRenderProps) => {
        if (!isInputPreviouslyBlurred.current) {
            onBlur(field)
        }
        isInputPreviouslyBlurred.current = false;
    };

    const onBlur = (field: ControllerRenderProps) => {
        isInputPreviouslyBlurred.current = true;
        if (inputValue) {
            const val = options.find((elem: {
                label: string;
            }) => elem.label === inputValue) || {
                "label": inputValue,
                "value": inputValue,
                "nmfc": "",
                "sub_nmfc": ""
            }
            onValueChange(field, val);
        } else {
            onValueChange(field, undefined);
        }
    }

    return (
        <Tippy content={getValues(id)?.label} theme="light"
               disabled={!getValues(id) || (getValues(id)?.label.length < 31)} placement="top">
            <div className={className}>
                {label && <label className="text-sbase block w-full mt-8">{label}</label>}
                <div>
                    <Controller
                        name={id}
                        control={control}
                        rules={validation}
                        render={({field}) =>
                            <CreatableSelect
                                {...field}
                                key={value}
                                value={value}
                                inputValue={inputValue}
                                styles={has(errors, id) ? styleError : {}}
                                placeholder={placeholder}
                                options={options}
                                noOptionsMessage={() => noOptionsMessage}
                                isMulti={isMulti}
                                className={"h-[40px]"}
                                formatCreateLabel={(val) => `Use ${val}`}
                                onChange={(val) => onValueChange(field, val)}
                                onInputChange={setInputValue}
                                onBlur={() => onBlur(field)}
                                onMenuOpen={() => setInputValue(value?.label || "")}
                                onMenuClose={() => onMenuClose(field)}
                                onFocus={() => {
                                    if (value) setInputValue(value["label"])
                                }}
                            />
                        }
                    />
                </div>
                {errors && <span className={'text-red-1 text-xl mt-2'}>{get(errors, id)?.message}</span>}
            </div>
        </Tippy>
    );
}