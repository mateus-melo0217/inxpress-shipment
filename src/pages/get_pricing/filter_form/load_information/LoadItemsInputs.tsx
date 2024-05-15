import * as React from 'react';
import {useFieldArray, useFormContext, useWatch} from "react-hook-form";
import {GetClasses} from "utils/constants/DropdownOptions";
import Dropdown from "components/forms/Dropdown";
import InputNumber from "components/forms/InputNumber";
import InputCommodities from "pages/get_pricing/filter_form/inputs/InputCommodities";
import InputTextDimensions from "pages/get_pricing/filter_form/inputs/InputTextDimensions";
import InputTextWeight from "pages/get_pricing/filter_form/inputs/InputTextWeight";
import ToggleHazmat from "pages/get_pricing/filter_form/inputs/ToggleHazmat";
import ToggleStackable from "pages/get_pricing/filter_form/inputs/ToggleStackable";
import {LinkIconLabel} from "components/common/navigation/Links/LinkIconLabel/LinkIconLabel";
import {TiDeleteOutline} from "react-icons/ti";
import {LoadCalculations} from "./LoadCalculations";
import {cubicFeetCalc} from "utils/cubicFeetCalc";

type PropTypes = {
    commodities: { value: string, label: string }[];
    packageTypes: { value: string, label: string }[];
};


export function LoadItemsInputs({ commodities, packageTypes }: PropTypes) {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "load_item"
    });

    const loadItem = useWatch({
        control,
        name: "load_item",
    });

    const addNewItemCollection = () => {
        append({ type: {value: 'Pallets', label: 'Pallets'}, weight_unit: {value: 'Lbs', label: 'Lbs'}, is_stackable: true })
    }

    return (
        <>
            <div className="flex flex-col customLg:flex-row customLg:items-center">
                <h4 className="capitalize text-sxl text-medium-gray font-medium min-w-[140px]">
                    Load Items
                </h4>
                <LoadCalculations/>
            </div>
            <div>
                {fields.map((item, index) => {
                  const loadInfo = loadItem[index]
                  return (
                    <div key={item.id}
                         className={'w-full flex flex-col custom3Xl:flex-row'}
                    >
                        <InputTextDimensions {...{index}} />
                        <div className='flex flex-col justify-between w-full customLg:flex-row customLg:justify-start customLg:gap-[40px] custom3Xl:gap-[10px] custom4Xl:ml-[40px]'>
                            <InputTextWeight {...{index}} />
                            <InputCommodities {...{index, commodities}} />
                        </div>
                        <div className='flex flex-col items-start customMd:flex-row customMd:justify-start customMd:gap-[20px] custom3Xl:gap-[5px]'>
                            <div className='text-sbase ml-0 custom3Xl:ml-[20px] mt-[30px] h-[40px] min-w-[70px] flex text-center items-center'>
                                <label className="text-blue-1">PCF:&nbsp;</label>
                                <span className='text-green-1 ml-2'>{cubicFeetCalc(loadInfo?.dimension_length, loadInfo?.dimension_width, loadInfo?.dimension_height, loadInfo?.weight)}</span>
                            </div>
                            <Dropdown
                                id={`load_item.${index}.class`}
                                label="Class"
                                options={GetClasses()}
                                className={'w-[100px]'}
                                placeholder="class"
                                validation={{required:'Required Field'}}
                            />
                            <Dropdown
                                id={`load_item.${index}.type`}
                                label="Type"
                                options={packageTypes}
                                className={'w-60 customMd:ml-2 customXl:ml-6 custom3Xl:ml-0'}
                                placeholder="type"
                                validation={{required:'Required Field'}}
                            />
                            <InputNumber
                                id={`load_item.${index}.units`}
                                label={'Handling Unit(s)'}
                                placeholder="units"
                                className='customMd:ml-2 customXl:ml-6 custom3Xl:ml-0'
                                validation={{
                                    required: "required",
                                    min: {value: 1, message: "Min unit is 1"},
                                }}
                            />
                            <div className="flex flex-row items-center mt-[15px] customXXl:ml-10 custom3Xl:ml-20">
                                <ToggleStackable {...{index}}/>
                                <ToggleHazmat {...{index}}/>
                                <div className={'w-48 pt-[10px] ml-6'}>
                                    { index === 0
                                        ?
                                        <LinkIconLabel
                                            icon='FiPlusCircle'
                                            label="Add new line"
                                            onClick={() => addNewItemCollection()}
                                        />
                                        :
                                        <div
                                            className="flex items-center bg-transparent border-none right-0 top-2 text-red-1 cursor-pointer text-xl focus:outline-none"
                                            onClick={() => remove(index)}
                                        >
                                            <TiDeleteOutline color='#dc3848' size='2em'/>
                                            <span className="pl-2 text-xl">Delete</span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        
                    </div>
                )})}
            </div>
        </>
    );
}