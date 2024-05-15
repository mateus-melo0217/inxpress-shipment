import {InsuranceOptions} from "./InsuranceOptions";
import {AccessorialOptions} from "./AccessorialOptions";

type PropTypes = {
    accessorials: { value: string, label: string }[];
    setIsInsuranceVal: Function;
}

export const ExtraOptions = ({accessorials, setIsInsuranceVal} : PropTypes) => {

    return (
        <div className='flex flex-col mt-[15px] customMs:flex-row customMd:mt-0 customMd:ml-6 customLg:flex-col customXXl:flex-row' id="accessorialPicker">
            <InsuranceOptions setIsInsuranceVal={setIsInsuranceVal}/>
            <div className="ml-12">
                <AccessorialOptions accessorials={accessorials} />
            </div>
        </div>
    )
}