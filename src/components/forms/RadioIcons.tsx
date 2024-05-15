import React from "react";
import {FaBoxes, FaTruckMoving} from "react-icons/fa";
import {ValidationType} from "./Types";
import "./RadioIcons.scss"
import {get, without, xor} from "lodash";
import {useFormContext} from "react-hook-form";

type PropTypes = {
    id: string,
    label: string,
    validation: ValidationType;
    setIsAccept: Function;
    setIsCancel: Function;
    setIsConfirm: Function;
    setIsReject: Function;
}

export default function RadioIcons({id, label, validation, setIsAccept, setIsCancel, setIsConfirm, setIsReject}: PropTypes) {
    // access the form context
    const { register, setValue, getValues, formState: { errors }} = useFormContext();

    const onChange = (event: any ,type: string) => {
        const currentValues = getValues(id);
        // reset the current status when freight type is chaged by user interaction.
        setIsAccept(false);
        setIsCancel(false);
        setIsConfirm(false);
        setIsReject(false);

        switch (type) {
            case 'LTL':
                setValue(id, without(xor(currentValues, ['LTL'])), {shouldDirty: true}); // set option to remove unexpeced value from react-hook-form context
                break;
            case 'VOLUME':
                setValue(id, without(xor(currentValues, ['VOLUME'])), {shouldDirty: true}); // set option to remove unexpeced value from react-hook-form context
                break;
        }
    }

    return (
        <div className='mt-[35px] mx-[80px]'>
            <small className="text-sbase">
                {label}
            </small>
            <div className="flex justify-between">
                <div className="flex flex-col items-center">
                    <div className="flex h-[50px]">
                        <input
                            {...register(id, validation)}
                            type="checkbox"
                            value="LTL"
                            className='green-check mr-4 mt-2'
                            onClick={(e) => onChange(e,"LTL")}
                        />
                        <FaTruckMoving size='3em' title="Volume"/>
                    </div>
                    <label htmlFor="ltl">
                        <span className='uppercase'>ltl</span>
                    </label>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex h-[50px]">
                        <input
                            readOnly
                            type="checkbox"
                            {...register(id, validation)}
                            value="VOLUME"
                            className='green-check mr-4 mt-2'
                            onClick={(e) => onChange(e,"VOLUME")}
                        />
                        <FaBoxes size='3em' title="Volume"/>
                    </div>
                    <label htmlFor="volume">
                        <span className='uppercase'>volume</span>
                    </label>
                </div>
            </div>
            {errors && <span className={'text-red-1 text-xl mt-2'}>{get(errors, id)?.message}</span>}
        </div>
    );
}