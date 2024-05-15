
import { IShipmentNoteData } from "./ShipmentNoteTypes";
import {AddNotesModal} from "./AddNotesModal";
import {SendEmailModal} from "./SendEmailModal";
import { useShipmentNotes } from "./ShipmentNoteQueries";

import { useEffect, useState } from 'react';

interface PropTypes {
    dlgShipmentNote: IShipmentNoteData;
    bolNumber: number,
    shipmentId: number,
    isAddNote?: boolean,
    isSendEmail?: boolean
}

export const ShipmentNoteFormModal = ({ dlgShipmentNote, bolNumber, shipmentId, isAddNote, isSendEmail }: PropTypes) => {
    const { data: shipmentNotes } = useShipmentNotes(shipmentId)
    const [ids, setIds] = useState([]);
    const [attachments, setAttachments] = useState([]);

    useEffect(() => {
        if (shipmentNotes) {
          const noteIds = shipmentNotes
            .filter((note:any) => note.attachment)
            .map((note:any) => note.id);
          setIds(noteIds);
      
          const noteAttachments = shipmentNotes
            .filter((note:any) => note.attachment)
            .map((note:any) => note.attachment);
          setAttachments(noteAttachments);
        }
      }, [shipmentNotes]);
   
    return (
        <>
            {isAddNote && <AddNotesModal
                dlgShipmentNote={dlgShipmentNote}
                bolNumber={bolNumber}
                shipmentId={shipmentId}
            />}
            {isSendEmail && ids && <SendEmailModal
                attachments={attachments}
                ids={ids}
                shipmentId={shipmentId}
            />}
        </>
    );
};