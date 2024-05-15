
interface PropTypes {
    cellContext: any,
}

interface CellTypes {
    code: any,
    providerCode: any,
    name: string,
    description: string
}

export const AccessorialsColumn = ({cellContext}: PropTypes) => {

    return (
        <div className="flex justify-center">
            <ul>
                {cellContext.row.original.accessorials.length ? cellContext.row.original.accessorials.map((item:CellTypes, index:number)=><li key={index}>{item.name}</li>) : "No accessorials"}
            </ul>
        </div>
    );
};