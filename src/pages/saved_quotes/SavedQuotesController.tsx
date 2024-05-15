import {useState, useEffect} from "react";
import {tableColumns} from "./SavedQuotesTableColumns";
import {useSavedQuotes} from "./SavedQuotesQueries";
import {SavedQuotesTable} from "./SavedQuotesTable";
import {SavedQuotesPaginator} from "./SavedQuotesPaginator";
import {SavedQuotesTopOptions} from "./SavedQuotesTopOptions";
import {SavedQuotesFilter} from "./filter/SavedQuotesFilter";
import {getCoreRowModel, PaginationState, SortingState, useReactTable} from "@tanstack/react-table";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_SELECTED_QUOTE, INIT_ADDITIONAL_INFO } from 'actions';
import { RootState } from "store/globalstore";
import { IFilterQuery } from './filter/SavedQuotesFilterTypes';
import moment from "moment";
import { DeleteQuoteModal } from "./modals/DeleteQuoteModal";
import "./scrollbar.css"

export type PageOptionType = {
    value: string;
    label: string;
}

export const PAGE_OPTIONS:PageOptionType[] = [
    {value: '10', label: '10'},
    {value: '20', label: '20'},
    {value: '50', label: '50'},
    {value: '100', label: '100'},
    {value: '200', label: '200'},
    {value: '500', label: '500'}
];

export const SavedQuotesController = () => {
    const dispatch = useDispatch();
    const [hIndex, setHIndex] = useState(-1);
    const [sorting, setSorting] = useState<SortingState>([])
    const [pagination, setPagination] = useState<PaginationState>({pageIndex: 0, pageSize: 10 });
    const [filterQuery, setFilterQuery] = useState<IFilterQuery>({
        quoteNumber: null,
        dateFrom: moment().subtract(30, 'day').format('YYYY-MM-DD'),
        dateTo: moment().add(10, 'day').format('YYYY-MM-DD'),
        carrierName: [],
        serviceName: [],
        statusName: []
    })
    const dataQuery = useSavedQuotes(sorting, pagination, filterQuery);
    const columnsSettingSQ = useSelector((state: RootState) => state.savedQuotesReducer.columnsSettingSQ);
    const authInfo = useSelector(
        (state: RootState) => state.authReducer.authenticatedData
      );
    columnsSettingSQ.forEach((item: any)  => {
        if(item.column==="providerQuoteId" && !authInfo?.isAdmin){
            item.is_active = false;
        }
      });
    const [loading, setLoading] = useState(false);
    const table = useReactTable({
        data: dataQuery.data?.data ?? [],
        columns: tableColumns(hIndex, setHIndex, columnsSettingSQ, setLoading, dataQuery.refetch),
        pageCount: dataQuery.data?.pageCount ?? -1,
        state: {
            sorting,
            pagination,
        },
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        manualSorting: true,
        manualPagination: true,
        debugTable: true,
    });

    // state for delete Quote Modal
    const {isDeleteQuoteOpen, row: deleteSavedQuoteRow} = useSelector((state: RootState) => state.savedQuotesReducer.actionModal.deleteQuoteModal);

    const [openFilter, setOpenFilter] = useState<Boolean>(false);
    // state for reset paginator
    const [resetPaginator, setResetPaginator] = useState<Boolean>(false);
    const [selectedPerPage, setSelectedPerPage] = useState<PageOptionType>(PAGE_OPTIONS[0]);
    
    // save the quotes for Saved_Quotes operation
    useEffect(()=>{
        if(!dataQuery.isLoading){
            dispatch({
                type: UPDATE_SELECTED_QUOTE,
                payload: {
                    quotes: dataQuery.data?.data  
                }
              })
        }
    },[dataQuery, dispatch])

    // clean addtional information cache
    useEffect(()=>{
        dispatch({
            type: INIT_ADDITIONAL_INFO
          })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="mx-[35px]">
            <div className="grid place-items-center">
                <SavedQuotesTopOptions
                    isFilterOpen={openFilter}
                    toggleFilter={(flag: Boolean) => setOpenFilter(flag)}
                    sorting={sorting}
                    table={table}
                    perPage={selectedPerPage}
                    setPerPage={setSelectedPerPage}
                />
                <div className="flex relative w-full">
                    <SavedQuotesFilter
                        openFilter={openFilter}
                        setFilterQuery={setFilterQuery}
                        setResetPaginator={setResetPaginator}
                    />
                    <div className={ `${openFilter ? 'ml-[25.5%] w-3/4': 'w-full'} overflow-scroll`}>
                        <SavedQuotesTable
                            table={table}
                            isTableLoading={dataQuery.isLoading || dataQuery.isFetching || loading}
                        />
                    </div>
                </div>
                <div className="mt-[90px]"></div>
                <SavedQuotesPaginator
                    table={table}
                    totalCount={dataQuery.data?.elementCount ?? 0}
                    resetPaginator={resetPaginator}
                    setResetPaginator={setResetPaginator}
                    selectedPerPage={selectedPerPage}
                    setSelectedPerPage={setSelectedPerPage}
                />
            </div>

            {/* Delete Quote Modal */}
            { isDeleteQuoteOpen && <DeleteQuoteModal row={deleteSavedQuoteRow} setHIndex={setHIndex} /> }

        </div>
    )
}