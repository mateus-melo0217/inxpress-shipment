import { MdBookmarks } from "react-icons/md"
import { FreightHistoryFilterItem } from "../FreightHistoryFilterItem"

interface FilterByBolNumberProps {
    formMethods: any,
    byBolNumber: boolean,
    setByBolNumber: any
}

export const SubFilterBolProNumber = ({formMethods, byBolNumber, setByBolNumber}: FilterByBolNumberProps) => {
    return (
        <>
            <div className="flex items-center w-full bg-lightest-gray uppercase font-extrabold py-6 text-blue-1 pl-10 space-x-4">
                <MdBookmarks size='1.5em'/>
                <div>bol#/pro#</div>
            </div>
            <div className="flex flex-wrap pt-5 pb-8 pl-10 space-x-4">
                    <FreightHistoryFilterItem
                        label="Bol #"
                        activated={byBolNumber}
                        setActive={()=>{setByBolNumber(true)}}
                    />
                    <FreightHistoryFilterItem
                        label="Pro #"
                        activated={!byBolNumber}
                        setActive={()=>{setByBolNumber(false)}}
                    />
                    <FreightHistoryFilterItem 
                        label="Original Or Edited"
                    />
            </div>
            <div className="flex justify-center px-10">
                <input type="text" className="border border-solid border-border-gray rounded-lg w-full py-7 pl-4 mb-10" placeholder="Write the number" 
                {...formMethods.register('bolProNumber')}
                />
            </div>
        </>
    )
}