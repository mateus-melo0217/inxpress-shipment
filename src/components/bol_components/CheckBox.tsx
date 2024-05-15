import React from 'react';

interface Props {
    label?: string;
    id?: string;
    checked?: boolean;
    onChange?: Function;
    disabled?: boolean;
}

 export const CheckBox = (props: Props) => {

    return (
    <div className={`flex mt-2 ${props.disabled ? '' : 'cursor-pointer'}`}>
        <label className={`flex items-center ${props.disabled ? '' : 'cursor-pointer'}`}>
            <input type="checkbox"
            disabled={props?.disabled}
                checked={props.checked}
                    className={`w-6 h-6 rounded-sm mt-2 box-borde
                     text-green-1 ${props.disabled ? '' : 'cursor-pointer'}`}
                    id={props.id}
                    onChange={(e) => props.onChange?.(e.target.checked)}
            />
                <span className={`ml-2 ${props.disabled ? '' : 'cursor-pointer'}`}>
                    <label className="text-lg">{props.label}</label>
                </span>
                <span/>
        </label>
    </div>    
    )
 }
