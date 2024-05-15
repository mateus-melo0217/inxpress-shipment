import React from 'react';
import {useFormContext, useWatch} from "react-hook-form";
import ToggleButton from "components/forms/ToggleButton";
import {filter, unionBy} from "lodash";

type PropTypes = {
    index: number;
}

export default function ToggleHazmat({index} : PropTypes) {
    const {control, getValues, setValue } = useFormContext();

    const loadInformation = useWatch({
        control,
        name: "load_item",
    });

    // assign hazmat option to accessorial dropdown
    const setHazmatAccessorial = () => {
        setValue('accessorial',
            unionBy( getValues('accessorial'),
                [{value: 'HAZMAT', label: 'Hazmat'}], 'value'
            )
        );
    }

    // un-assign hazmat option to accessorial dropdown
    const unSetHazmatAccessorial = () => {
        if(loadInformation.findIndex((item:any) => item.is_hazmat === true) >= 0){
            return null;
        }
        setValue('accessorial',
            filter(getValues('accessorial'), function(item:any) {
                return item.value !== 'HAZMAT';
            })
        );
    }

    const toggle = (index: number) => {
        const isLoadHazmat = getValues(`load_item.${index}.is_hazmat`)
        if (isLoadHazmat) {
            setHazmatAccessorial();
        } else {
            unSetHazmatAccessorial();
        }
    }

    return (
        <ToggleButton
            id={`load_item.${index}.is_hazmat`}
            label='Hazmat'
            onChange={() => toggle(index)}
            className='ml-6'
        />
    );
}