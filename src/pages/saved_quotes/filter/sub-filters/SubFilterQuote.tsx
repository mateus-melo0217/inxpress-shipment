import { MdBookmarks } from "react-icons/md"

interface FilterByBolNumberProps {
    formMethods: any,
}

export const SubFilterQuote = ({formMethods}: FilterByBolNumberProps) => {
    return (
        <>
            <div className="flex items-center w-full bg-lightest-gray uppercase font-extrabold py-6 text-blue-1 pl-10 space-x-4">
                <MdBookmarks size='1.5em'/>
                <div>Quote Id / Quote Number</div>
            </div>
            <div className="flex justify-center px-10 py-10">
                <input type="string" className="border border-solid border-border-gray rounded-lg w-full py-7 pl-4" placeholder="Write the value" 
                {...formMethods.register('quoteNumber')}
                />
            </div>
        </>
    )
}