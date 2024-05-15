import * as React from 'react';
import {useFormContext, useWatch} from "react-hook-form";
import {linearCalc} from "../../../../utils/linearCalc"
import {roundFn} from "../../../../utils/round"
import { formatNumber } from '../../../../utils/numberHelpers';

export function LoadCalculations() {
    const { control, setValue } = useFormContext();
    const loadInformation = useWatch({
        control,
        name: "load_item",
    });

    const totalCubic = loadInformation.reduce(
        (previousValue: any, currentValue: any) =>
            previousValue + (
                (
                    (
                        Number(currentValue.dimension_length) *
                        Number(currentValue.dimension_width) *
                        Number(currentValue.dimension_height)
                    )
                    / 1728
                )
                * Number(currentValue.units)
            )
        , 0
    );

    const totalWeight = loadInformation.reduce(
        (previousValue: any, currentValue: any) =>
            previousValue + (Number(currentValue.units) * Number(currentValue.weight))
        , 0
    );

    const totalUnit = loadInformation.reduce(
        (previousValue: any, currentValue: any) =>
            previousValue + Number(currentValue.units)
        , 0
    );

    const totalPCF = roundFn(totalWeight / roundFn(totalCubic));

    const totalLinear = loadInformation.reduce(
        (previousValue: any, currentValue: any) =>
            previousValue + (
                (
                    (Number(currentValue.units) / 2) * 
                    Number(currentValue.dimension_length)
                ) / 12
            )
        , 0
    );

    React.useEffect(()=>{
        // set values
        setValue("totalWeight", totalWeight);
        setValue("totalCubic", totalCubic);
        setValue("totalPCF", totalPCF);
        setValue("totalLinear", totalLinear);
        // calculate linear feet and set value
        const linearFt = linearCalc(loadInformation)
        setValue("linearFt", linearFt);
    },[totalWeight, totalCubic, totalPCF, totalLinear, loadInformation, setValue])

    if(!totalCubic || !totalWeight || !totalUnit){
        return null;
    }

    return (
        <div className='flex flex-col font-medium w-full customLg:flex-row'>
            <div className='text-sbase mb-2 customLg:mb-0'>
                <label className="text-blue-1">Total Cubic:</label>
                <span className='text-green-1 ml-2'>{formatNumber(totalCubic.toFixed(2))}</span>
            </div>
            <div className='text-sbase mb-2 customLg:mb-0 customLg:ml-8'>
                <label className="text-blue-1">Total PCF:</label>
                <span className='text-green-1 ml-2'>{formatNumber(Number(totalPCF.toFixed(2)))}</span>
            </div>
            <div className='text-sbase mb-2 customLg:mb-0 customLg:ml-8'>
                <label className="text-blue-1">Total Linear ft:</label>
                <span className='text-green-1 ml-2'>{formatNumber(totalLinear.toFixed(2))}</span>
            </div>
            <div className='text-sbase mb-2 customLg:mb-0 customLg:ml-8'>
                <label className="text-blue-1">Total Weight:</label>
                <span className='text-green-1 ml-2'>{formatNumber(totalWeight.toFixed(2))} lbs</span>
            </div>
            <div className='text-sbase mb-2 customLg:mb-0 customLg:ml-8'>
                <label className="text-blue-1">Total Handling Unit(s):</label>
                <span className='text-green-1 ml-2'>{totalUnit}</span>
            </div>
        </div>
    );
}