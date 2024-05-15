import React from 'react';
import {AccessorialOptions} from "pages/get_pricing/filter_form/extra_options/AccessorialOptions";
import ToggleStackable from "pages/get_pricing/filter_form/inputs/ToggleStackable";
import {useAccessorials} from "pages/get_pricing/filter_form/FilterFormQueries";
import { TextArea } from "components/bol_components/TextArea";

interface PropsType {
    defaultInstruction: string;
}

const DefaultSetting = ({defaultInstruction}:PropsType) => {
    const { data: accessorials } = useAccessorials();
    return (
        <React.Fragment>
            <AccessorialOptions accessorials={accessorials} exWrapperCls="ml-[0rem]" exContentCls="w-full" exLabelCls="font-bold text-sxl"/>
            <ToggleStackable index={-1} exWrapperCls="mt-12" exContentCls="mt-[0rem] w-[fit-content]" exLabelCls="font-bold text-sxl"/>
            <div className='mt-16'>
                <p className='font-bold text-sxl'>Special Instructions</p>    
                <TextArea
                    className=""
                    id="defaultSetting_specialInstruction"
                    label="Default Customisable Text"
                    name="defaultSetting_specialInstruction"
                    rows={4}
                    value={defaultInstruction}
                    isValidationTriggered={false}
                />
            </div>
        </React.Fragment>
    );
}
export default DefaultSetting;