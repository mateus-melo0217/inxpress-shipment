import {FileNameColumn} from "../columns/FileNameColumn";
import {CustomerColumn} from "../columns/CustomerColumn";
import {DateColumn} from "../columns/DateColumn";
interface PropTypes {
    cellContext: any,
    name: string,
}

export const ColumnComponent = ({cellContext, name}: PropTypes) => {
    switch (name) {
        case 'date':
            return <DateColumn cellContext={cellContext} type="create"/>
        case 'inputFileName':
            return <FileNameColumn cellContext={cellContext} type="input"/>
        case 'customer':
            return <CustomerColumn cellContext={cellContext} />
        case 'startDateAndTime':
            return <DateColumn cellContext={cellContext} type="start"/>
        case 'endDateAndTime':
            return <DateColumn cellContext={cellContext} type="end"/>
        case 'outputFileName':
            return <FileNameColumn cellContext={cellContext} type="output"/>
        default:
            return <></>
    }
}