import Dropdown from "components/forms/Dropdown";

type PropTypes = {
    accessorials: { value: string, label: string }[];
    exWrapperCls?: string;
    exContentCls?: string;
    exLabelCls?: string;
}

export const AccessorialOptions = ({accessorials, exWrapperCls, exContentCls, exLabelCls} : PropTypes) => {
    
    return (
        <div className={`flex flex-col mt-12 customMd:mt-0 customLg:flex-row customLg:mt-[-15px] ${exWrapperCls}`}>
            <Dropdown
                id="accessorial"
                label="Accessorials"
                isMulti={true}
                options={accessorials}
                placeholder={'Select Accessorial(s)'}
                validation={{required: false}}
                className={exContentCls ? exContentCls : `w-[460px]`}
                exCls={exLabelCls}
            />
        </div>
    )
}