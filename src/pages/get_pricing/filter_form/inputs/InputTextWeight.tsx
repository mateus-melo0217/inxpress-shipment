import React from 'react';
import InputTextNumber from "components/forms/InputTextNumber";
import Dropdown from "components/forms/Dropdown";

type PropTypes = {
    index: number;
}

const options = [
    { value: 'Lbs', label: 'Lbs' },
    { value: 'Kgs', label: 'Kgs', disabled: true },
]

export default function InputTextWeight({index} : PropTypes) {

    return (
        <div className='customXXl:w-full'>
            <label className="text-sbase block w-full mt-8">
                Weight
            </label>
            <div className="flex justify-between gap-[20px] customMs:justify-start customXXl:justify-start w-full custom3Xl:gap-0">
                <InputTextNumber
                    id={`load_item.${index}.weight`}
                    placeholder="weight"
                    validation={{required:'Required Field'}}
                    className='w-[150px] customMd:w-[200px] customXXl:w-[150px]'
                />
                <div className="">
                    <Dropdown
                        id={`load_item.${index}.weight_unit`}
                        options={options}
                        className={'ml-2 w-full'}
                        validation={{required:'Required Field'}}
                        isOptionDisabled={(option: any) => option?.disabled}
                    />
                </div>
            </div>
        </div>
    );
}