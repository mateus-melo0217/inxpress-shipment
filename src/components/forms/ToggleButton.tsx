// @ts-nocheck
import React from 'react';
import {isFunction} from "lodash";
import {useFormContext} from "react-hook-form";
import "./ToggleButton.scss"

type PropTypes = {
    id: string,
    label: string,
    className?:string
    exContentCls?: string,
    exLabelCls?: string,
    onChange?: Function,
}

/**
 * ToggleButton for react hook form
 * @param id
 * @param label
 * @param className
 * @param onChange
 * @constructor
 */
export default function ToggleButton({id, label, className, exContentCls, exLabelCls, onChange}: PropTypes) {
    const { register, watch, setValue, getValues } = useFormContext();
    const isChecked = watch(id);

    const toggle = () => {
        setValue(id, !getValues(id));
        if (isFunction(onChange)) {
            onChange();
        }
    }

    return (
        <div className={className}>
            <span className={`quote__label ${exLabelCls}`}>
                {label}
            </span>
            <div className={`toggleBtn mt-[1rem] ${exContentCls}`} onClick={toggle}>
                <input
                    {...register(id)}
                    type="checkbox"
                    className='toggleOption'
                />
                <label className={`labelToggle ${isChecked ? 'toggleOptionActive' : ''}`} />
            </div>
        </div>
    );
}