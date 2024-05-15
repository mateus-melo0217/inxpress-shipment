import { BsCalendarEvent } from "react-icons/bs";
import { FaClock } from "react-icons/fa";
import moment from "moment";

interface PropTypes {
    cellContext: any,
    type: string
}

export const DateColumn = ({cellContext, type}: PropTypes) => {
    const dateType = type === "create" ? "dateCreated" : type === "start" ? "startTime" : "endTime";
    const formattedDate = cellContext.row.original[dateType] && !cellContext.row.original[dateType].startsWith("0001")
    ? moment(cellContext.row.original[dateType]).format('YYYY/MM/DD') : "";
    const date = cellContext.row.original[dateType] ? new Date(cellContext.row.original[dateType]) : null;
    const formattedTime = date ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '-';

    return (
        <div className="flex items-center justify-center">
            <div className="flex items-center">
                <BsCalendarEvent size='1.1em'/> <p className="px-1"> {formattedDate}</p>
            </div>
            <div className="flex items-center">
                <FaClock /> <p className="px-1"> {formattedTime}</p>
            </div>
        </div>
    );
};