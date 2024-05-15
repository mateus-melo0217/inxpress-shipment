interface PropTypes {
    cellContext: any,
}

export const QuoteAmountColumn = ({cellContext}: PropTypes) => {
    const price = cellContext.row.original.displayQuotedAmount;
    return (
        <div className="flex justify-center">
            ${price}
        </div>
    );
};