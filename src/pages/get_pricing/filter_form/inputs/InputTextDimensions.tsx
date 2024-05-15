import React from 'react';
import InputTextNumber from "components/forms/InputTextNumber";

type PropTypes = {
    index: number;
}

export default function InputTextDimensions({index} : PropTypes) {

    return (
        <div className="custom3Xl:mr-[5px]">
            <label className="text-sbase block w-full mt-8">Dimensions</label>
            <div className="flex justify-between">
                <InputTextNumber id={`load_item.${index}.dimension_length`} placeholder="length" validation={{required:'Required Field'}} className='w-full custom3Xl:w-[85px]'/>
                <InputTextNumber id={`load_item.${index}.dimension_width`} placeholder="width" validation={{required:'Required Field'}} className='w-full custom3Xl:w-[85px] ml-2'/>
                <InputTextNumber id={`load_item.${index}.dimension_height`} placeholder="height"  validation={{required:'Required Field'}} className='w-full custom3Xl:w-[85px] ml-2'/>
            </div>
        </div>
    );
}



