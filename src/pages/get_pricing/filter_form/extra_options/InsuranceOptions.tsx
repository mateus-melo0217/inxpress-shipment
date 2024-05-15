import { useEffect } from "react";
import InputTextNumber from "components/forms/InputTextNumber";
import {useCoverageOptions} from "../../filter_form/FilterFormQueries";
import {useFormContext} from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "store/globalstore";
import { isEmpty } from "lodash";

type PropTypes = {
    setIsInsuranceVal: Function;
}

export const InsuranceOptions = ({setIsInsuranceVal}: PropTypes ) => {
    const authInfo = useSelector(
        (state: RootState) => state.authReducer.authenticatedData
      );
    const { watch, setValue } = useFormContext();
    const commodityId = watch('insurance_commodity')?.value;
    const insurance = watch('insurance_amount')
    // const { data: insurance } = useInsuranceCommodities();
    // const { data: packageCategories } = usePackageCategories(commodityId);
    const { data: coverageOptions }: any = useCoverageOptions(commodityId);

    useEffect(()=> {
        setValue("insurance_coverage_option", coverageOptions?.coverageOptionName);
        setValue("insurance_coverage_client_code", coverageOptions?.clientCode);
    }, [coverageOptions, setValue])
    
    useEffect(()=> {
        setValue("insurance_package_category", '')
    }, [commodityId, setValue])
    
    useEffect(()=> { 
        if(insurance) {
            setIsInsuranceVal(true)
        }
        else{
            setIsInsuranceVal(false)
        }
    }, [insurance, setIsInsuranceVal])

    return (
        <div className={"flex flex-col ml-12 mt-12 customMd:mt-0 customLg:flex-row customLg:mt-[-15px]"}>
            <>
                {!isEmpty(authInfo) && authInfo?.thirdPartyInsuranceAgree && (
                    <InputTextNumber
                        id="insurance_amount"
                        label={'Shipping Protection'}
                        placeholder="value"
                        validation={{required: false}}
                    />
                )}
                {/* <Dropdown
                    id="insurance_commodity"
                    label={'Commodity'}
                    options={insurance}
                    className={'w-60 customLg:ml-4 customXl:ml-12'}
                    validation={{required:'Required Field'}}
                />
                <div className={'w-60'}>
                    <Dropdown
                        id="insurance_package_category"
                        label={'Package Categories'}
                        options={packageCategories}
                        className={'w-60 customLg:ml-4 customXl:ml-12'}
                        validation={{required:'Required Field'}}
                    />
                </div>
                <div>
                    <InputText
                        id="insurance_coverage_option"
                        label={'Coverage Option'}
                        placeholder="Coverage Option"
                        validation={{required:'Required Field'}}
                        readOnly={true}
                        className="customLg:ml-8 customXl:ml-24"
                    />
                </div> */}
            </>
        </div>
    )
}