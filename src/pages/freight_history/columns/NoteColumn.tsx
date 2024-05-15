import React from "react";
import {MdStickyNote2} from "react-icons/md";
import { useDispatch } from "react-redux";
import { OPEN_SHIPMENT_NOTES_MODAL } from "actions";
interface PropTypes {
    cellContext: any,
}

export const NoteColumn = ({cellContext}: PropTypes) => {
    const unreadNoteCount = cellContext.row.original.unreadNoteCount;
    const dispatch = useDispatch()
    const openShipmentNoteModal = React.useCallback(() => {
        dispatch({
            type: OPEN_SHIPMENT_NOTES_MODAL,
            payload: {
                isOpen: true,
                row: cellContext.row
            }
        })
    }, [dispatch, cellContext.row])

    return (
        <div className="text-center cursor-pointer" onClick={openShipmentNoteModal}> 
            <div className="inline-flex justify-center relative">
                <MdStickyNote2 size="2.5em" color={'#167979'}/>
                { unreadNoteCount ? <div className="absolute right-1 w-[15px] h-[15px] rounded-full bg-[#167979] text-white text-lg border-[1.5px] border-white text-center">{unreadNoteCount}</div> : null }
            </div>
        </div>
    );
};