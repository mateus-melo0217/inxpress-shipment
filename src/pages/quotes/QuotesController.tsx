import {useState} from "react";
import {tableColumns} from "./QuotesTableColumns";
import {useQuotes} from "./QuotesQueries";
import {QuotesTable} from "./QuotesTable";
import {QuotesPaginator} from "./QuotesPaginator";
import {QuotesTopOptions} from "./QuotesTopOptions";
import {QuotesFilter} from "./filter/QuotesFilter";
import {getCoreRowModel, PaginationState, SortingState, useReactTable} from "@tanstack/react-table";
import { useSelector } from "react-redux";
import { RootState } from "store/globalstore";
import { IFilterQuery } from './filter/QuotesFilterTypes';
import moment from "moment";
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

export const QuotesController = () => {
    const [sorting, setSorting] = useState<SortingState>([])
    const [pagination, setPagination] = useState<PaginationState>({pageIndex: 0, pageSize: 10 });
    const [filterQuery, setFilterQuery] = useState<IFilterQuery>({
        byBolNumber: true,
        byProNumber: false,
        bolNumber: null,
        proNumber: null,
        bolProNumber: null,
        quoteNumber: null,
        dateFrom: moment().subtract(30, 'day').format('YYYY-MM-DD'),
        dateTo: moment().add(10, 'day').format('YYYY-MM-DD'),
        carrierName: [],
        serviceName: [],
        statusName: [],
        accessorialsName: []
    })
    const dataQuery = useQuotes(sorting, pagination, filterQuery);
    const columnsSetting = useSelector((state: RootState) => state.quotesInfoReducer.columnsSetting);
    const table = useReactTable({
        data: dataQuery.data?.data ?? [],
        columns: tableColumns(columnsSetting),
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

    const [openFilter, setOpenFilter] = useState<Boolean>(false);
    // state for reset paginator
    const [resetPaginator, setResetPaginator] = useState<Boolean>(false);
    const [selectedPerPage, setSelectedPerPage] = useState<PageOptionType>(PAGE_OPTIONS[0]);
   
    return (
        <div className="mx-[35px]">
            <div className="grid place-items-center">
                <QuotesTopOptions
                    isFilterOpen={openFilter}
                    toggleFilter={(flag: Boolean) => setOpenFilter(flag)}
                    sorting={sorting}
                    table={table}
                    perPage={selectedPerPage}
                    setPerPage={setSelectedPerPage}
                />
                <div className="flex relative w-full">
                    <QuotesFilter
                        openFilter={openFilter}
                        setFilterQuery={setFilterQuery}
                        setResetPaginator={setResetPaginator}
                    />
                    <div className={ `${openFilter ? 'ml-[25.5%] w-3/4': 'w-full'} overflow-scroll`}>
                        <QuotesTable
                            table={table}
                            isTableLoading={dataQuery.isLoading || dataQuery.isFetching}
                        />
                    </div>
                </div>
                <div className="mt-[90px]"></div>
                <QuotesPaginator
                    table={table}
                    totalCount={dataQuery.data?.elementCount ?? 0}
                    resetPaginator={resetPaginator}
                    setResetPaginator={setResetPaginator}
                    selectedPerPage={selectedPerPage}
                    setSelectedPerPage={setSelectedPerPage}
                />
            </div>
        </div>
    )
}