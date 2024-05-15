import moment from "moment";
import {BsCalendarEvent} from "react-icons/bs";
import {AiFillClockCircle} from "react-icons/ai";
interface PropTypes {
    cellContext: any,
}

export const DateColumn = ({cellContext}: PropTypes) => {
    const deliveryDate = cellContext.row.original.createdTime;
    return (
        <div className="flex justify-center items-center w-[175px]">
            <BsCalendarEvent size="1.2em" className="mx-2"/>
            {moment(deliveryDate).format("MM/DD/yyyy")}
            <AiFillClockCircle size="1.2em" className="mx-2"/>
            {moment(deliveryDate).format("hh:mm A")}
        </div>
    );
};