import {DateColumn} from "../columns/DateColumn";
import {QuoteIdColumn} from "../columns/QuoteIdColumn"
import {OriginColumn} from "../columns/OriginColumn"
import {DestinationColumn} from "../columns/DestinationColumn"
import {DimsColumn} from "../columns/DimsColumn"
import {WeightColumn} from "../columns/WeightColumn";
import {AccessorialColumn} from "../columns/AccessorialColumn"
interface PropTypes {
    cellContext: any,
    name: string,
}

export const ColumnComponent = ({cellContext, name}: PropTypes) => {
    switch (name) {
        case 'quoteId':
            return <QuoteIdColumn cellContext={cellContext} />
        case 'origin':
            return <OriginColumn cellContext={cellContext} />
        case 'destination':
            return <DestinationColumn cellContext={cellContext} />
        case 'dims':
            return <DimsColumn cellContext={cellContext} />
        case 'weight':
            return <WeightColumn cellContext={cellContext} />
        case 'accessorial':
            return <AccessorialColumn cellContext={cellContext} />
        case 'date':
            return <DateColumn cellContext={cellContext} />
        default:
            return <></>
    }
}