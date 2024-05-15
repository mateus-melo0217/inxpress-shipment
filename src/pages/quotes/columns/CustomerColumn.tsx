interface PropTypes {
    cellContext: any,
}

export const CustomerColumn = ({cellContext}: PropTypes) => {
    return (
        <p className="text-center">{cellContext.row.original.customerCode}</p>
    );
};