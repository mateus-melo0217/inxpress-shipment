import Dropdown from "components/forms/Dropdown"
import { SiStatuspage } from "react-icons/si"

export const SubFilterStatus = ({status, formMethods, resetFilter, setResetFilter}: any) => {
    const { watch } = formMethods;
    const selectedStatus = watch('statusName');
    const options:any = [];
    status?.forEach((item: any)=> {
        options.push({
            label: item.displayName,
            value: item.enumName
        })
    })
    return (
        <>
            <div className="flex items-center justify-between w-full bg-lightest-gray uppercase font-extrabold py-6 text-blue-1 px-10">
                <div className="flex items-center space-x-4">
                    <SiStatuspage size='1.5em' color="#0c214c"/>
                    <div>status</div>
                </div>
                {selectedStatus?.length > 0 && <span className="text-green-1">{selectedStatus.length} selected</span>}
            </div>
            <div className="flex justify-center px-10 py-10">
                <Dropdown
                    placeholder="Select status display"
                    className="rounded-lg w-full"
                    id="statusName"
                    options={options}
                    isMulti={true}
                    resetFilter={resetFilter}
                    setResetFilter={setResetFilter}
                />
            </div>
        </>
    )
}