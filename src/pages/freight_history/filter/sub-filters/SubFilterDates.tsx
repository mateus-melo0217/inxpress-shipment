import { Datepicker } from "components/bol_components/DatePicker"
import { IoMdCalendar } from "react-icons/io"

export const SubFilterDates = ({tempDateVal, setTempDateVal}: any) => {
    const dateToString = (date: Date) => {
        const dd = String(date.getDate()).padStart(2, "0");
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const yyyy = date.getFullYear();
        return `${yyyy}/${mm}/${dd}`;
    };

    return (
        <>
            <div className="flex items-center w-full bg-lightest-gray uppercase font-extrabold py-6 text-blue-1 pl-10 space-x-4">
                <IoMdCalendar size='1.7em'/>
                <div>date range</div>
            </div>
            <div className="flex justify-between rounded-lg w-full px-10 my-10 relative">
                <Datepicker
                    selectedDate={tempDateVal.dateFrom.replace(/-/g, '/')}
                    onChange={(date: string) => {
                        setTempDateVal((prev: any) => ({
                        ...prev,
                        dateFrom: date,
                      }))}}
                    isValidationTriggered={false}
                    minDate={false}
                    dateFormat="yyyy/mm/dd"
                    dateToString={dateToString}
                />
                <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-2px]">
                    <div className="w-10 text-center border-t-[4px] border-solid"></div>
                </div>
                <Datepicker
                    selectedDate={tempDateVal.dateTo.replace(/-/g, '/')}
                    onChange={(date: string) => {
                        setTempDateVal((prev: any) => ({
                        ...prev,
                        dateTo: date,
                      }))}}
                    isValidationTriggered={false}
                    minDate={false}
                    dateFormat="yyyy/mm/dd"
                    dateToString={dateToString}
                />
            </div>
        </>
    )
}