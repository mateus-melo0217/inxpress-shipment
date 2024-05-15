interface PropTypes {
    cellContext: any
}

export const QuoteIdColumn = ({cellContext}: PropTypes) => {
    const {providerQuoteId} = cellContext.row.original;

    return (
        <div className="flex justify-center">
            {providerQuoteId}
        </div>
    )
}