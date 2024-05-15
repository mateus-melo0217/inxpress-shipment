import React from 'react';
import InputText from "components/forms/InputText";
import CreatableDropdown from 'components/forms/CreatableDropdown';
import {useFormContext} from 'react-hook-form';
import Tippy from '@tippyjs/react';
import {GetClasses} from "utils/constants/DropdownOptions";
import {find} from "lodash";


type PropTypes = {
    index: number;
    commodities: any;
}

export default function InputCommodities({index, commodities}: PropTypes) {
    const [isCommodityChanged, setIsCommodityChanged] = React.useState(false);
    const formMethods = useFormContext();
    const commodityId = `load_item.${index}.commodity`;
    const nmfcId = `load_item.${index}.commodity_nmfc`;
    const nmfcVal = formMethods.watch(commodityId)?.nmfc;
    const sub_nmfc = formMethods.watch(commodityId)?.sub_nmfc;
    const commodity = formMethods.watch(commodityId);

    const onChangeCommodity = (val: any) => {
        if (val && val["commodityClass"]) {
            formMethods.setValue(`load_item.${index}.class`, find(GetClasses(), {value: val["commodityClass"]}));
        } else {
            formMethods.setValue(`load_item.${index}.class`, null);
        }
        setIsCommodityChanged(true);
    }

    React.useEffect(() => {
        if (isCommodityChanged) {
            if (nmfcVal && sub_nmfc) {
                formMethods.setValue(nmfcId, `${nmfcVal}-${sub_nmfc}`);
            } else {
                formMethods.setValue(nmfcId, nmfcVal);
            }
            formMethods.clearErrors(commodityId);
            setIsCommodityChanged(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCommodityChanged])

    return (
        <div
            className="flex flex-col customMd:flex-row customMd:gap-[30px] mt-8 customMd:w-[48%] custom3Xl:gap-[5px] customXXl:w-full">
            <div className=''>
                <label className="text-sbase block">
                    Commodities
                </label>
                <CreatableDropdown
                    id={commodityId}
                    options={commodities}
                    initialValue={commodity}
                    placeholder='Commodities'
                    validation={{required: 'Required Field'}}
                    className='w-[277px]'
                    noOptionsMessage='Enter Commodity description'
                    onChange={(val: any) => onChangeCommodity(val)}
                />
            </div>
            <Tippy content={formMethods.getValues(`load_item.${index}.commodity_nmfc`)} theme="light"
                   disabled={!formMethods.getValues(`load_item.${index}.commodity_nmfc`) || formMethods.getValues(`load_item.${index}.commodity_nmfc`)?.toString().length < 21}
                   placement="top">
                <div className="flex flex-col">
                    <label className="text-sbase block invisible">
                        NMFC
                    </label>
                    <InputText
                        id={`load_item.${index}.commodity_nmfc`}
                        placeholder="NMFC"
                        validation={{required: false}}
                        className='h-[40px] w-[167px]'
                    />
                </div>
            </Tippy>
        </div>
    );
}



