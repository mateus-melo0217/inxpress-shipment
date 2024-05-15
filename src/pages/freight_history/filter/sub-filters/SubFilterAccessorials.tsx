import Dropdown from "components/forms/Dropdown"
import { SiStatuspage } from "react-icons/si"

export const SubFilterAccessorials = ({accessorials, formMethods, resetFilter, setResetFilter}: any) => {
    const { watch } = formMethods;
    const selectedAccessorials = watch('accessorialsName');
    const options:any = [];
    accessorials?.forEach((item: any)=> {
        options.push({
            label: item.name,
            value: item.code
        })
    })
    return (
        <>
            <div className="flex items-center justify-between w-full bg-lightest-gray uppercase font-extrabold py-6 text-blue-1 px-10">
                <div className="flex items-center space-x-4">
                    <SiStatuspage size='1.5em' color="#0c214c"/>
                    <div>accessorials</div>
                </div>
                {selectedAccessorials?.length > 0 && <span className="text-green-1">{selectedAccessorials.length} selected</span>}
            </div>
            <div className="flex justify-center px-10 py-10">
                <Dropdown
                    placeholder="Select accessorials display"
                    className="rounded-lg w-full"
                    id="accessorialsName"
                    options={options}
                    isMulti={true}
                    resetFilter={resetFilter}
                    setResetFilter={setResetFilter}
                />
            </div>
        </>
    )
}