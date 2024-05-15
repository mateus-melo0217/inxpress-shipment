import { createColumnHelper} from '@tanstack/react-table'
import {QuoteTypes} from "./QuotesTypes";
import {ActionColumn} from "./columns/ActionColumn";
import { ColumnComponent } from "./column_settings/ColumnComponent";

const columnHelper = createColumnHelper<QuoteTypes>()

export const tableColumns = (columnsSetting: any) => {

    const columnItems:any = [];

    columnsSetting.forEach((colSet: any) => {
        if (!colSet.is_active) {
            return;
        }

        colSet.column === 'actions' ? 
            columnItems.push(
                columnHelper.display(
                    {
                        id: 'actions',
                        header: () => 'Action',
                        cell: (props) => <ActionColumn row={props.row} />
                    }
                )    
            ) : columnItems.push(
                    columnHelper.accessor(colSet.column, {
                        header: ()=> <span>{colSet.label}</span>,
                        cell: (props) => <ColumnComponent cellContext={props} name={colSet.column}/>,
                        enableSorting: colSet.column !== 'note'
                    })
            )
        
    })

    return columnItems;
}