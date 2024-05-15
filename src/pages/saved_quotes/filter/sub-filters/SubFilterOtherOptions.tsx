import { ImBook } from "react-icons/im"
import { SavedQuotesFilterItem } from "../SavedQuotesFilterItem"

export const SubFilterOtherOptions = () => {
    return (
        <>
            <div className="flex items-center w-full bg-lightest-gray uppercase font-extrabold py-6 text-blue-1 pl-10 space-x-4 mb-6">
                <ImBook size='1.5em' color="#0c214c"/>
                <div>other options</div>
            </div>
            <div className="flex flex-row flex-wrap pl-10 pb-8 space-x-4">
                <SavedQuotesFilterItem label="Display Insured Shipments" activated={true} />
                <SavedQuotesFilterItem label="Inspected Shipments" />
                <SavedQuotesFilterItem label="Hot Shipments" />
            </div>
        </>
    )
}