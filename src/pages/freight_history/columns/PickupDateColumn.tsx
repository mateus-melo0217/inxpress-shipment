import moment from "moment";

interface PropTypes {
    cellContext: any,
}

export const PickupDateColumn = ({cellContext}: PropTypes) => {
    const readyTime = cellContext.row.original.readyTime;
    const closingTime = cellContext.row.original.closingTime;
    const pickupDateTime = cellContext.row.original.pickupDateTime && !cellContext.row.original.pickupDateTime.startsWith("0001")
        ? moment(cellContext.row.original.pickupDateTime).format('MM/DD/YYYY') : "";
    const pickupNumber = cellContext.row.original.pickupNumber;
    const pickupText = (pickupNumber !== null) ?`P/U#:${pickupNumber}`: null;
    return (
        <div className="flex items-center justify-center space-x-1">
            {pickupDateTime && <div>{pickupDateTime} {readyTime} {closingTime} {pickupText}</div>}
        </div>
    );
};