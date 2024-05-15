import React from "react"
import { ImBook } from "react-icons/im"
import ToggleButton from "components/forms/ToggleButton";
import InputText from "components/forms/InputText";

interface FilterSave {
    setChecked : Function,
    checked : boolean
  }

export const SubFilterSave = ({setChecked, checked}: FilterSave) => {

    const onCheck = () => {
      setChecked(!checked);
    }
    
    return (
        <>
            <div className="flex items-center w-full bg-lightest-gray uppercase font-extrabold py-6 text-blue-1 pl-10 space-x-4 mb-6">
                <ImBook size='1.5em' color="#0c214c"/>
                <div>save search</div>
            </div>
            <div className="pl-10 pb-8">
                <div className="flex justify-between items-center mr-24">
                    <div className="font-bold text-3xl"> I want to save the current search. </div>
                    <ToggleButton id='has_insurance' label='' onChange={onCheck} className=" customLg:mt-[0px] customLg:mr-4 customXl:mr-12"/>
                </div>
                {checked&&(
                <div className='flex justify-center px-10 py-10'>
                    <InputText
                    id="saveName"
                    className='border border-solid border-border-gray rounded-lg w-full outline-0 border-0'
                    placeholder='Search filter name'
                    validation={{required:'Required Field'}}
                    />
                </div>
                )}
            </div>
            
        </>
    )
}