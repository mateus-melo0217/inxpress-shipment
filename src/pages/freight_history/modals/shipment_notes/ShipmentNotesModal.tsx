import React, {useState, useCallback, useEffect} from "react";
import { MdCancel } from "react-icons/md";
import { BsFillBellFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { useShipmentNotes } from "./ShipmentNoteQueries";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import {ShipmentNoteTableColumns} from "./ShipmentNoteTableColumns";
import ShipmentNoteTable from "./ShipmentNoteTable";
import { LoadingIndicator } from "components/common/LoadingIndicator";
import { useDispatch } from "react-redux";
import { CLOSE_SHIPMENT_NOTES_MODAL, OPEN_SHIPMENT_NOTES_ADD_NOTES_MODAL, OPEN_SHIPMENT_NOTES_SEND_EMAIL_MODAL } from "actions";
import {isEmpty, forEach, isNull} from 'lodash';
interface PropTypes {
    row: any;
    setDlgShipmentNote: Function,
    refetch: Function
}

export const ShipmentNotesModal = ({ row, setDlgShipmentNote, refetch }: PropTypes) => {
    const [isAttachment, setIsAttachment] = useState(false);
    const dispatch = useDispatch();
    const addNoteModalFun = useCallback(() => {
        dispatch({
            type: OPEN_SHIPMENT_NOTES_ADD_NOTES_MODAL,
            payload: {
                addNoteModal: true,
                row: row
            }
        })
    }, [dispatch, row])
    const onShipmentNotesModalClose = useCallback(() => {
        dispatch({
            type: CLOSE_SHIPMENT_NOTES_MODAL,
            payload: {
                isOpen: false,
            }
        })
        refetch();
    }, [dispatch, refetch])

    const { data: shipmentNotes } = useShipmentNotes(row?.original?.shipmentId)

    const shipmentNotesTable = useReactTable({
        data: shipmentNotes ?? [],
        columns: ShipmentNoteTableColumns(setDlgShipmentNote, addNoteModalFun),
        getCoreRowModel: getCoreRowModel()
    })

    const showEmailModal = useCallback(() => {
        dispatch({
            type: OPEN_SHIPMENT_NOTES_SEND_EMAIL_MODAL,
            payload: {
                sendDocumenetsModal: true,
                data: shipmentNotes.data
            }
        })
    }, [dispatch, shipmentNotes])

    useEffect(() => {
        if (!isEmpty(shipmentNotes)) {
            forEach(shipmentNotes, (note) => {
                if (!isNull(note.attachment)) {
                    setIsAttachment(true);
                    return false;
                }
                setIsAttachment(false);
            });
        }
    }, [shipmentNotes]);

    return (
        <div className="fixed overflow-hidden w-full h-full z-50 bg-gray-modal bottom-0 left-0">
            <div className="w-1/2 absolute overflow-y-auto h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl flex flex-col items-center">
                <div className="bg-green-1 flex items-center justify-between w-full p-4 rounded-t-xl">
                    <div className="uppercase text-white">notes and documents</div>
                    <MdCancel
                        onClick={onShipmentNotesModalClose}
                        size="1.2em"
                        className="text-white bg-green-1 text-5xl cursor-pointer"
                    />
                </div>
                <div className="bg-white flex-1 w-full flex flex-col items-center rounded-b-xl">
                    <div className="py-12 px-10 flex items-center justify-between w-full">
                        <div className="uppercase text-blue-1 font-medium text-3xl">
                            for bol#:
                            <span className="text-green-1 ml-2">{row?.original?.issuedBoLNumber}</span>
                        </div>
                        <div className="flex items-center">
                            <BsFillBellFill color="#167979" size={'2.4rem'} />
                            <div className="text-blue-1 text-sxsl uppercase ml-4 font-medium italic">new note</div>
                        </div>
                    </div>
                    <div className="flex justify-center w-full my-2 px-12">
                        <div
                            className="mb-8 border-[1.5px] border-dashed border-lighter-gray rounded-3xl w-full py-6 flex items-center justify-center cursor-pointer hover:bg-green-1 hover:text-lighter-gray transition-all duration-[800ms] ease-out"
                            onClick={() => {
                                addNoteModalFun();
                                setDlgShipmentNote();
                            }}
                        >
                            <FaPlus color="#e3e1e2" size={'1.8em'}/>
                            <div className="uppercase text-2xl ml-6 font-medium">add note</div>
                        </div>
                        <div
                            className={`mb-8 border-[1.5px] border-dashed border-lighter-gray rounded-3xl w-full py-6 flex items-center justify-center hover:bg-green-1 hover:text-lighter-gray transition-all duration-[800ms] ease-out ${isAttachment ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                            onClick={() => {
                                if(isAttachment){
                                    showEmailModal();
                                }
                            }}
                        >
                            <IoDocumentAttachOutline color="#e3e1e2" size={'1.8em'}/>
                            <div className="uppercase text-2xl ml-6 font-medium">send documents</div>
                        </div>
                    </div>
                    <div className="w-full overflow-auto h-[440px] relative">
                        <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
                            {!shipmentNotes && <LoadingIndicator isLoading={!shipmentNotes} />}
                        </div>
                        <ShipmentNoteTable table={shipmentNotesTable} />
                    </div>
                    <div
                        className="bg-blue-1 text-[rgba(255,255,255,.8)] uppercase px-14 py-6 cursor-pointer mb-10 rounded-lg flex items-center justify-center border-[1.5px] border-blue-1 hover:bg-transparent hover:text-blue-1 transition-all duration-[500ms] ease-out"
                        onClick={onShipmentNotesModalClose}
                    >
                        close
                    </div>
                </div>
            </div>
        </div>
    );
};