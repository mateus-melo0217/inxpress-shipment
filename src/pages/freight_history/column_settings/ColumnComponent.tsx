import {BolNumberColumn} from "../columns/BolNumberColumn";
import {ProNumberColumn} from "../columns/ProNumberColumn";
import {StatusColumn} from "../columns/StatusColumn";
import {NoteColumn} from "../columns/NoteColumn";
import {ServiceTypeColumn} from "../columns/ServiceTypeColumn";
import {QuoteAmountColumn} from "../columns/QuoteAmountColumn";
import {WeightColumn} from "../columns/WeightColumn";
import {ShipDateColumn} from "../columns/ShipDateColumn";
import {UnitTypeColumn} from "../columns/UnitTypeColumn";
import {HandlingUnitsColumn} from "../columns/HandlingUnitsColumn";
import {CarrierColumn} from "../columns/CarrierColumn";
import {InsuredAmountColumn} from "../columns/InsuredAmountColumn";
import {DeliveryDateColumn} from "../columns/DeliveryDateColumn";
import {PickupDateColumn} from "../columns/PickupDateColumn";
import {SenderColumn} from "../columns/SenderColumn";
import {ReceiverColumn} from "../columns/ReceiverColumn";
import {TransactionDateColumn} from "../columns/TransactionDateColumn";
import {QuoteNumberColumn} from "../columns/QuoteNumberColumn";
import {QuoteIdColumn} from "../columns/QuoteIdColumn";
import {TransitTimeColumn} from "../columns/TransitTimeColumn";
import {AccessorialsColumn} from "../columns/AccessorialsColumn";

interface PropTypes {
    cellContext: any,
    name: string,
}

export const ColumnComponent = ({cellContext, name}: PropTypes) => {
    switch (name) {
        case 'quoteId':
            return <QuoteIdColumn cellContext={cellContext} />
        case 'quoteNumber':
            return <QuoteNumberColumn cellContext={cellContext} />
        case 'displayStatus':
            return <StatusColumn cellContext={cellContext} />
        case 'note':
            return <NoteColumn cellContext={cellContext} />
        case 'transactionDate':
            return <TransactionDateColumn cellContext={cellContext} />
        case 'serviceType':
            return <ServiceTypeColumn cellContext={cellContext} />
        case 'shipDate':
            return <ShipDateColumn cellContext={cellContext} />
        case 'senderName':
            return <SenderColumn cellContext={cellContext} />
        case 'receiverName':
            return <ReceiverColumn cellContext={cellContext} />
        case 'customerBoLNumber':
            return <BolNumberColumn cellContext={cellContext} />
        case 'unitType':
            return <UnitTypeColumn cellContext={cellContext} />
        case 'numberOfItems':
            return <HandlingUnitsColumn cellContext={cellContext} />
        case 'customerProNumber':
            return <ProNumberColumn cellContext={cellContext} />
        case 'transitTime':
            return <TransitTimeColumn cellContext={cellContext} />
        case 'pickupDateTime':
            return <PickupDateColumn cellContext={cellContext} />
        case 'carrierName':
            return <CarrierColumn cellContext={cellContext} />
        case 'displayInsuredAmount':
            return <InsuredAmountColumn cellContext={cellContext} />
        case 'deliveryDate':
            return <DeliveryDateColumn cellContext={cellContext} />
        case 'totalWeight':
            return <WeightColumn cellContext={cellContext} />
        case 'accessorials':
            return <AccessorialsColumn cellContext={cellContext} />
        case 'displayQuotedAmount':
            return <QuoteAmountColumn cellContext={cellContext} />
        default:
            return <></>
    }
}