import Dropdown from "components/forms/Dropdown"
import { FaTruckMoving } from "react-icons/fa"

export const SubFilterCarrier = ({carriers, formMethods, resetFilter, setResetFilter}: any) => {
    const { watch } = formMethods;
    const selectedCarriers = watch('carrierName');
    const options:any = [];
    carriers?.forEach((item: string)=> {
        options.push({
            label: item,
            value: item
        })
    })
    return (
        <>
            <div className="flex items-center justify-between w-full bg-lightest-gray uppercase font-extrabold py-6 text-blue-1 px-10">
                <div className="flex items-center space-x-4">
                    <FaTruckMoving size='1.5em' color="#0c214c"/>
                    <div>carrier</div>
                </div>
                {selectedCarriers?.length > 0 && <span className="text-green-1">{selectedCarriers.length} selected</span>}
            </div>
            <div className="flex justify-center px-10 py-10">
                <Dropdown
                    placeholder="Select carrier name"
                    className="rounded-lg w-full"
                    id="carrierName"
                    options={options}
                    isMulti={true}
                    resetFilter={resetFilter}
                    setResetFilter={setResetFilter}
                />
            </div>
        </>
    )
}