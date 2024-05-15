import { AiOutlineGlobal } from "react-icons/ai"
import { FreightHistoryFilterItem } from "../FreightHistoryFilterItem"

export const SubFilterShipmentPlace = () => {
    return (
        <>
            <div className="flex items-center w-full bg-lightest-gray uppercase font-extrabold py-6 text-blue-1 pl-10 space-x-4">
                <AiOutlineGlobal size='1.5em' color="#0c214c"/>
                <div>shipment place</div>
            </div>
            <div className="flex flex-wrap pt-6 pb-4 pl-10 space-x-4">
                    <FreightHistoryFilterItem 
                        label="Domestic"
                        activated={true}
                    />
                    <FreightHistoryFilterItem 
                        label="International"
                    />
            </div>
        </>
    )
}