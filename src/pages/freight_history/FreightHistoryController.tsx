import {useState, useEffect} from "react";
import {tableColumns} from "./FreightHistoryTableColumns";
import {useShipments} from "./FreightHistoryQueries";
import {FreightHistoryTable} from "./FreightHistoryTable";
import {FreightHistoryPaginator} from "./FreightHistoryPaginator";
import {FreightHistoryTopOptions} from "./FreightHistoryTopOptions";
import {FreightHistoryFilter} from "./filter/FreightHistoryFilter";
import {getCoreRowModel, PaginationState, SortingState, useReactTable} from "@tanstack/react-table";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/globalstore";
import { UPDATE_SHIPPER_CONS_ADDRESS_INFO, UPDATE_SHIPMENT_ID } from "actions";
import { ShipmentNotesModal } from "./modals/shipment_notes/ShipmentNotesModal";
import { ViewShipmentModal } from "./modals/view_shipment/ViewShipmentModal";
import { ShipmentNoteFormModal } from "./modals/shipment_notes/ShipmentNoteFormModal";
import { Overlay } from "pages/bol_info/common/AddressBookDialog";
import { DispatchMenuWrapper } from "pages/bol_info/DispatchMenuWrapper";
import { ModifyPickUpDialog } from "pages/bol_info/common/ModifyPickUpDialog";
import { BOLDetails } from "pages/bol_info/BolDetails";
import { TrackingDialog } from "pages/bol_info/common/TrackingDialog";
import { CloseShipmentModal } from "./modals/CloseShipmentModal";
import { IShipmentNoteData } from "./modals/shipment_notes/ShipmentNoteTypes";
import { ShipmentNoteFormDefaultValues } from "./modals/shipment_notes/ShipmentNoteFormDefaultValues";
import { IFilterQuery } from './filter/FreightHistoryFilterTypes';
import { isEmpty } from "lodash";
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

export const FreightHistoryController = () => {
    const dispatch = useDispatch();
    const [hIndex, setHIndex] = useState(-1);
    const [sorting, setSorting] = useState<SortingState>([])
    const [pagination, setPagination] = useState<PaginationState>({pageIndex: 0, pageSize: 10 });
    const [isLoading, setIsLoading] = useState(false);
    const [isSavedHistory, setIsSavedHistory] = useState(false);
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
    const [lastItem, setLastItem] = useState<any>({});
    const [isFetchedBolData, setFetchedBolData] = useState<boolean>(false);
    const dataQuery = useShipments(sorting, pagination, filterQuery);
    const shipmentObj = useSelector((state: RootState) => state.bolInfoReducer.shipmentObj);
    const columnsSetting = useSelector((state: RootState) => state.freightHistoryInfoReducer.columnsSetting);
    const forwardStatus = useSelector((state: RootState) => state.freightHistoryInfoReducer.forwardStatus);
    const table = useReactTable({
        data: dataQuery.data?.data ?? [],
        columns: tableColumns(hIndex, setHIndex, columnsSetting),
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

    // state for dispatchMenuDialog
    const {showDispatchMenuDialog, row: dispatchMenuRow} = useSelector((state: RootState) => state.freightHistoryInfoReducer.actionModal.dispatchMenuDialog);

    // state for ModifyPickUpDialog
    const {showShedulePickupDialog, row: modifyPickUpRow} = useSelector((state: RootState) => state.freightHistoryInfoReducer.actionModal.modifyPickUpDialog);

    // state for bolDetailModal
    const {showInfoBol, isEditable, row: bolDetailRow} = useSelector((state: RootState) => state.freightHistoryInfoReducer.actionModal.bolDetailModal);

    // state for trackingShipmentModal
    const {showTrackingDialog, row: trackingShipmentRow} = useSelector((state: RootState) => state.freightHistoryInfoReducer.actionModal.trackingShipmentModal);

    // state for shipmentNotes
    const {isOpen, row, addNoteModal, sendDocumenetsModal} = useSelector((state: RootState) => state.freightHistoryInfoReducer.actionModal.shipmentNotesModal);

    // state for viewShipment Modal
    const {isOpen:showViewShipmentDialog, row:viewShipmentRow} = useSelector((state: RootState) => state.freightHistoryInfoReducer.actionModal.viewShipmentModal);

    // state for void Shipment Modal
    const {isCancelShipmentOpen, row: voidShipmentRow} = useSelector((state: RootState) => state.freightHistoryInfoReducer.actionModal.voidShipmentModal);

    const [dlgShipmentNote, setDlgShipmentNote] = useState<IShipmentNoteData>(
        ShipmentNoteFormDefaultValues(row)
    );

    const [openFilter, setOpenFilter] = useState<Boolean>(false);
    // state for reset paginator
    const [resetPaginator, setResetPaginator] = useState<Boolean>(false);
    const [selectedPerPage, setSelectedPerPage] = useState<PageOptionType>(PAGE_OPTIONS[0]);
   
    useEffect(()=>{
        if(dataQuery.data?.data?.length && forwardStatus){
            setIsSavedHistory(true)
        }
        if(!forwardStatus) {
            setIsSavedHistory(false)
        }
      },[dataQuery, forwardStatus])
    
    // clear the redux store when the user navigates to the freight history page.
    useEffect(()=>{
        if(isSavedHistory){
            const shipmentKey = ["companyName","email", "address1","address2","contactName","phone"]

            const shipperDispatch = () =>{
            for(let key of shipmentKey){
                dispatch({
                type: UPDATE_SHIPPER_CONS_ADDRESS_INFO,
                payload: {
                shipperConsKey: "shipperAddress",
                updKey: key,
                updValue: "",
                },
                });
            }
            }

            const consigneeDispatch = () =>{
            for(let key of shipmentKey){
                dispatch({
                type: UPDATE_SHIPPER_CONS_ADDRESS_INFO,
                payload: {
                shipperConsKey: "consigneeAddress",
                updKey: key,
                updValue: "",
                },
                });
            }
            }
            consigneeDispatch();
            shipperDispatch();
        }
    },[isSavedHistory, dispatch]);

    useEffect(()=>{
        if(shipmentObj.shipmentId !== dataQuery.data?.data[0]["shipmentId"]){
            dispatch({
                type: UPDATE_SHIPMENT_ID,
                payload: {
                    shipmentId:dataQuery.data?.data[0]["shipmentId"]
                }});
            setLastItem(dataQuery.data?.data[0])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataQuery.data?.data[0]["shipmentId"], shipmentObj.shipmentId])

    return (
        <div className="mx-[35px]">
            <div className="grid place-items-center">
                <FreightHistoryTopOptions
                    isFilterOpen={openFilter}
                    toggleFilter={(flag: Boolean) => setOpenFilter(flag)}
                    sorting={sorting}
                    table={table}
                    perPage={selectedPerPage}
                    setPerPage={setSelectedPerPage}
                />
                <div className="flex relative w-full">
                    <FreightHistoryFilter
                        openFilter={openFilter}
                        setFilterQuery={setFilterQuery}
                        setResetPaginator={setResetPaginator}
                    />
                    <div className={ `${openFilter ? 'ml-[25.5%] w-3/4': 'w-full'} overflow-scroll`}>
                        <FreightHistoryTable
                            table={table}
                            isTableLoading={dataQuery.isLoading || dataQuery.isFetching || isLoading}
                        />
                    </div>
                </div>
                <div className="mt-[90px]"></div>
                <FreightHistoryPaginator
                    table={table}
                    totalCount={dataQuery.data?.elementCount ?? 0}
                    resetPaginator={resetPaginator}
                    setResetPaginator={setResetPaginator}
                    selectedPerPage={selectedPerPage}
                    setSelectedPerPage={setSelectedPerPage}
                />
            </div>

            {/* View Shipment Modal */}
            {showViewShipmentDialog && (<ViewShipmentModal row={viewShipmentRow.original}/>)}

            {/* Dispatch Menu */}
            {showDispatchMenuDialog && !forwardStatus && (
                <>
                    <Overlay />
                    <DispatchMenuWrapper
                        shipmentId={dispatchMenuRow.original.shipmentId}
                        bolNumber={dispatchMenuRow.original.customerBoLNumber}
                        proNumber={dispatchMenuRow.original.customerProNumber}
                        refetch={dataQuery.refetch}
                    />
                </>
            )}

            {/* Schedule Pickup Modal */}
            {showShedulePickupDialog && (
                <>
                    <Overlay />
                    <ModifyPickUpDialog row={modifyPickUpRow} refetch={dataQuery.refetch}/>
                </>
            )}

            {/* BOL Detail Modal */}
            {showInfoBol && (
                <>
                    <Overlay/>
                    <BOLDetails
                        shipmentId={bolDetailRow.original.shipmentId}
                        bolNumber={bolDetailRow.original.customerBoLNumber}
                        proNumber={bolDetailRow.original.customerProNumber}
                        isEditable={isEditable}
                        refetch={dataQuery.refetch}
                        status={bolDetailRow.original.displayStatus}
                    />
                </>
            )}

            { isSavedHistory && !isEmpty(lastItem) && (
                <>
                    <Overlay />
                    <DispatchMenuWrapper
                        shipmentId={lastItem["shipmentId"]}
                        bolNumber={lastItem["customerBoLNumber"]}
                        proNumber={lastItem["customerProNumber"]}
                        refetch={dataQuery.refetch}
                        isFetchedBolData={isFetchedBolData}
                        setFetchedBolData={setFetchedBolData}
                    />
                </>
            )}

            {showTrackingDialog && 
                <>          
                    <Overlay />
                    <TrackingDialog row={trackingShipmentRow} />
                </>
            }

            {/* Shipment Notes Modal */}
            { isOpen && <ShipmentNotesModal row={row} setDlgShipmentNote={setDlgShipmentNote} refetch={dataQuery.refetch}/>}

            {/* Add Notes Modal or Send Documents Modal */}
            { (addNoteModal || sendDocumenetsModal) && <ShipmentNoteFormModal
                bolNumber={row.original.issuedBoLNumber}
                dlgShipmentNote={dlgShipmentNote}
                shipmentId={row.original.shipmentId}
                isAddNote={addNoteModal}
                isSendEmail={sendDocumenetsModal}
            />}

            {/* Void Shipment Modal */}
            { isCancelShipmentOpen && <CloseShipmentModal row={voidShipmentRow} setHIndex={setHIndex} refetch={dataQuery.refetch} setIsLoading={setIsLoading}/> }
        </div>
    )
}