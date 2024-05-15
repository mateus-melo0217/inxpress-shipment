interface PropTypes {
    cellContext: any,
    type: string
}

export const FileNameColumn = ({cellContext, type}: PropTypes) => {
    return (
        <p className="underline text-center">{type === 'input' ? cellContext.row.original.importFileLink : cellContext.row.original.outputFileLink}</p>
    );
};